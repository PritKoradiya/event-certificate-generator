import { ATTENDANCE_PAGE, ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../config/attendanceSheetLayout.js";
import { fitSvgAttendanceText } from "./attendanceTextLayout.js";

export const validateAttendanceSheetLayout = (sheetData) => {
  const errors = [];

  // 1. Check layout constants sanity
  const totalColWidth =
    ATTENDANCE_LAYOUT.columns.serial +
    ATTENDANCE_LAYOUT.columns.enrollment +
    ATTENDANCE_LAYOUT.columns.name +
    ATTENDANCE_LAYOUT.columns.sign;

  if (totalColWidth !== ATTENDANCE_LAYOUT.tableWidth) {
    errors.push(`Table column width sum (${totalColWidth}mm) does not match tableWidth (${ATTENDANCE_LAYOUT.tableWidth}mm).`);
  }

  if (ATTENDANCE_LAYOUT.tableX + ATTENDANCE_LAYOUT.tableWidth > ATTENDANCE_PAGE.width) {
    errors.push(`Table extends beyond A4 page width (${ATTENDANCE_PAGE.width}mm).`);
  }

  const maxFullPageTableBottomY = ATTENDANCE_LAYOUT.studentRowsY + ATTENDANCE_LAYOUT.rowsPerPage * ATTENDANCE_LAYOUT.rowHeight;
  if (maxFullPageTableBottomY + ATTENDANCE_LAYOUT.coordinatorGap > ATTENDANCE_PAGE.height) {
    errors.push(`Table with 39 rows plus coordinator exceeds page height (${ATTENDANCE_PAGE.height}mm).`);
  }

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
      const enroll = (student.enrollmentNo || "").trim();
      const name = (student.studentName || "").trim();

      if (!enroll) {
        errors.push(`Student at row ${idx + 1} is missing Enrollment Number.`);
      }
      if (!name) {
        errors.push(`Student at row ${idx + 1} is missing Student Name.`);
      }

      // Check name fitting at minimum size
      const minNamePt = fitSvgAttendanceText({
        text: name,
        preferredSize: ATTENDANCE_TYPOGRAPHY.studentName.size,
        minimumSize: ATTENDANCE_TYPOGRAPHY.studentName.minimumSize,
        maxWidth: ATTENDANCE_LAYOUT.columns.name - 4,
        fontFamily: ATTENDANCE_TYPOGRAPHY.svgFontFamily
      });

      if (minNamePt <= ATTENDANCE_TYPOGRAPHY.studentName.minimumSize) {
        // Double check if text length is dangerously long
        if (name.length > 65) {
          errors.push(`Student name is too long for the fixed attendance format: [${name}].`);
        }
      }

      if (student.sign !== undefined && student.sign !== null && student.sign !== "") {
        errors.push(`Student at row ${idx + 1} has non-empty signature cell.`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

export default validateAttendanceSheetLayout;
