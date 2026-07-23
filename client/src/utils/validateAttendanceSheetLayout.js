export const validateAttendanceSheetLayout = (sheetData, pageElements = []) => {
  const errors = [];

  if (!sheetData) {
    return { valid: false, errors: ["Missing attendance sheet data."] };
  }

  const {
    schoolName = "School of Engineering, PPSU",
    department,
    heading,
    className,
    date,
    eventCoordinatorName,
    students = []
  } = sheetData;

  if (!schoolName || !schoolName.trim()) {
    errors.push("Missing School Name header.");
  }
  if (!department || !department.trim()) {
    errors.push("Missing Department name.");
  }
  if (!heading || !heading.trim()) {
    errors.push("Missing Event Heading.");
  }
  if (!className || !className.trim()) {
    errors.push("Missing Class name.");
  }
  if (!date || !date.trim()) {
    errors.push("Missing Date value.");
  }
  if (!eventCoordinatorName || !eventCoordinatorName.trim()) {
    errors.push("Missing Event Coordinator Name.");
  }

  if (!Array.isArray(students) || students.length === 0) {
    errors.push("No students present in attendance roster.");
  } else {
    students.forEach((student, idx) => {
      if (!student.enrollmentNo || !student.enrollmentNo.trim()) {
        errors.push(`Student at index ${idx + 1} is missing Enrollment Number.`);
      }
      if (!student.studentName || !student.studentName.trim()) {
        errors.push(`Student at index ${idx + 1} is missing Student Name.`);
      }
      if (student.sign !== undefined && student.sign !== null && student.sign !== "") {
        errors.push(`Student at index ${idx + 1} has non-empty signature cell.`);
      }
    });
  }

  const expectedPageCount = Math.ceil(students.length / 39) || 1;

  if (pageElements && pageElements.length > 0) {
    if (pageElements.length !== expectedPageCount) {
      errors.push(
        `Rendered page count (${pageElements.length}) does not match expected page count (${expectedPageCount}).`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

export default validateAttendanceSheetLayout;
