import mongoose from "mongoose";
import AttendanceStudent from "../models/AttendanceStudent.js";

const isDatabaseConnected = () => mongoose.connection.readyState === 1;

const databaseUnavailableResponse = (res) => {
  return res.status(503).json({
    success: false,
    message: "Database is not connected. Please set MONGO_URI and restart the server."
  });
};

const isMissingRequiredValue = (value) => {
  return value === undefined || value === null || (
    typeof value === "string" && !value.trim()
  );
};

const normalizeStudentData = ({
  enrollmentNo,
  studentName,
  department,
  className,
  isActive
}) => {
  const normalizedData = {
    enrollmentNo: String(enrollmentNo).trim().toUpperCase(),
    studentName: String(studentName).trim().toUpperCase(),
    department: String(department).trim(),
    className: String(className).trim().toUpperCase()
  };

  if (typeof isActive === "boolean") {
    normalizedData.isActive = isActive;
  }

  return normalizedData;
};

const duplicateStudentResponse = (res) => {
  return res.status(409).json({
    success: false,
    message: "This enrollment number already exists in the selected department and class."
  });
};

const validationErrorResponse = (res, error, fallbackMessage) => {
  if (error?.code === 11000) {
    return duplicateStudentResponse(res);
  }

  if (error?.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  return res.status(500).json({
    success: false,
    message: fallbackMessage
  });
};

export const createStudent = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const requiredFields = ["enrollmentNo", "studentName", "department", "className"];
    const missingFields = requiredFields.filter((field) => isMissingRequiredValue(req.body[field]));

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`
      });
    }

    const student = await AttendanceStudent.create(normalizeStudentData(req.body));

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student
    });
  } catch (error) {
    return validationErrorResponse(res, error, "Failed to create student");
  }
};

export const bulkCreateStudents = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const { department, className, students } = req.body;

    if (isMissingRequiredValue(department) || isMissingRequiredValue(className)) {
      return res.status(400).json({
        success: false,
        message: "Department and className are required."
      });
    }

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Students must be a non-empty array."
      });
    }

    const invalidRows = students.reduce((rows, student, index) => {
      if (
        !student
        || typeof student !== "object"
        || isMissingRequiredValue(student.enrollmentNo)
        || isMissingRequiredValue(student.studentName)
      ) {
        rows.push(index + 1);
      }

      return rows;
    }, []);

    if (invalidRows.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Every student requires enrollmentNo and studentName. Invalid rows: ${invalidRows.join(", ")}`
      });
    }

    const normalizedDepartment = String(department).trim();
    const normalizedClassName = String(className).trim().toUpperCase();
    const normalizedStudents = students.map((student) => normalizeStudentData({
      ...student,
      department: normalizedDepartment,
      className: normalizedClassName
    }));
    const uniqueStudentsByEnrollment = new Map();
    const duplicateEnrollmentNumbers = [];

    normalizedStudents.forEach((student) => {
      if (uniqueStudentsByEnrollment.has(student.enrollmentNo)) {
        duplicateEnrollmentNumbers.push(student.enrollmentNo);
        return;
      }

      uniqueStudentsByEnrollment.set(student.enrollmentNo, student);
    });

    const uniqueStudents = [...uniqueStudentsByEnrollment.values()];
    const existingStudents = await AttendanceStudent.find({
      department: normalizedDepartment,
      className: normalizedClassName,
      enrollmentNo: {
        $in: uniqueStudents.map((student) => student.enrollmentNo)
      }
    }).select("enrollmentNo");
    const existingEnrollmentNumbers = existingStudents.map((student) => student.enrollmentNo);
    const existingEnrollmentNumberSet = new Set(existingEnrollmentNumbers);
    const studentsToInsert = uniqueStudents.filter((student) => {
      return !existingEnrollmentNumberSet.has(student.enrollmentNo);
    });
    const operations = studentsToInsert.map((student) => ({
      updateOne: {
        filter: {
          department: student.department,
          className: student.className,
          enrollmentNo: student.enrollmentNo
        },
        update: {
          $setOnInsert: student
        },
        upsert: true
      }
    }));
    const result = operations.length > 0
      ? await AttendanceStudent.bulkWrite(operations, { ordered: false })
      : { upsertedIds: {} };
    const insertedIds = Object.values(result.upsertedIds || {});
    const insertedRecords = insertedIds.length > 0
      ? await AttendanceStudent.find({ _id: { $in: insertedIds } }).sort({
        enrollmentNo: 1,
        studentName: 1
      })
      : [];
    const skippedCount = students.length - insertedRecords.length;

    return res.status(201).json({
      success: true,
      message: "Student bulk insertion completed",
      data: {
        insertedCount: insertedRecords.length,
        skippedCount,
        insertedRecords,
        duplicateEnrollmentNumbers: [
          ...new Set([...duplicateEnrollmentNumbers, ...existingEnrollmentNumbers])
        ]
      }
    });
  } catch (error) {
    return validationErrorResponse(res, error, "Failed to create students");
  }
};

export const getStudents = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const filters = {};

    if (typeof req.query.department === "string" && req.query.department.trim()) {
      filters.department = req.query.department.trim();
    }

    if (typeof req.query.className === "string" && req.query.className.trim()) {
      filters.className = req.query.className.trim().toUpperCase();
    }

    const students = await AttendanceStudent.find(filters).sort({
      enrollmentNo: 1,
      studentName: 1
    });

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch students"
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const student = await AttendanceStudent.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const editableFields = ["enrollmentNo", "studentName", "department", "className"];
    const providedFields = editableFields.filter((field) => req.body[field] !== undefined);
    const emptyFields = providedFields.filter((field) => isMissingRequiredValue(req.body[field]));

    if (emptyFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Fields cannot be empty: ${emptyFields.join(", ")}`
      });
    }

    const currentValues = {
      enrollmentNo: student.enrollmentNo,
      studentName: student.studentName,
      department: student.department,
      className: student.className,
      isActive: student.isActive
    };
    const normalizedData = normalizeStudentData({
      ...currentValues,
      ...Object.fromEntries(providedFields.map((field) => [field, req.body[field]])),
      isActive: typeof req.body.isActive === "boolean" ? req.body.isActive : student.isActive
    });

    student.set(normalizedData);
    await student.save();

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student
    });
  } catch (error) {
    return validationErrorResponse(res, error, "Failed to update student");
  }
};

export const deleteStudent = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const student = await AttendanceStudent.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete student"
    });
  }
};

export const deleteStudentsByClass = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return databaseUnavailableResponse(res);
    }

    const { department, className } = req.body;

    if (isMissingRequiredValue(department) || isMissingRequiredValue(className)) {
      return res.status(400).json({
        success: false,
        message: "Department and className are required before deleting a class."
      });
    }

    const result = await AttendanceStudent.deleteMany({
      department: String(department).trim(),
      className: String(className).trim().toUpperCase()
    });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} student(s) deleted successfully`,
      data: {
        deletedCount: result.deletedCount
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete students"
    });
  }
};
