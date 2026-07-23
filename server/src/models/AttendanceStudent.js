import mongoose from "mongoose";

const attendanceStudentSchema = new mongoose.Schema(
  {
    enrollmentNo: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    className: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

attendanceStudentSchema.index(
  { department: 1, className: 1, enrollmentNo: 1 },
  { unique: true }
);

const AttendanceStudent = mongoose.model("AttendanceStudent", attendanceStudentSchema);

export default AttendanceStudent;
