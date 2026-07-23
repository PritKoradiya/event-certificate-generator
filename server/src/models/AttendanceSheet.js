import mongoose from "mongoose";

const isRequiredForGeneratedSheet = function () {
  return this.status !== "Draft";
};

const attendanceSheetStudentSchema = new mongoose.Schema(
  {
    serialNo: Number,
    enrollmentNo: String,
    studentName: String,
    signature: {
      type: String,
      default: ""
    }
  },
  {
    _id: false
  }
);

const attendanceSheetSchema = new mongoose.Schema(
  {
    sheetId: {
      type: String,
      required: true,
      unique: true
    },
    schoolName: {
      type: String,
      default: "School of Engineering, PPSU"
    },
    department: {
      type: String,
      required: isRequiredForGeneratedSheet,
      trim: true
    },
    heading: {
      type: String,
      required: isRequiredForGeneratedSheet,
      trim: true
    },
    className: {
      type: String,
      required: isRequiredForGeneratedSheet,
      trim: true,
      uppercase: true
    },
    attendanceDate: {
      type: String,
      required: isRequiredForGeneratedSheet,
      trim: true
    },
    eventCoordinatorName: {
      type: String,
      required: isRequiredForGeneratedSheet,
      trim: true
    },
    documentTitle: {
      type: String,
      default: "Attendance Sheet"
    },
    students: {
      type: [attendanceSheetStudentSchema],
      default: []
    },
    totalStudents: {
      type: Number,
      default: 0
    },
    rowsPerPage: {
      type: Number,
      default: 39
    },
    totalPages: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      enum: ["Draft", "Generated"],
      default: "Generated"
    }
  },
  {
    timestamps: true
  }
);

const AttendanceSheet = mongoose.model("AttendanceSheet", attendanceSheetSchema);

export default AttendanceSheet;
