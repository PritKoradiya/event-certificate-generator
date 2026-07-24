import { ATTENDANCE_PAGE, ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../config/attendanceSheetLayout.js";
import { resolveAttendancePageMetrics } from "./resolveAttendancePageMetrics.js";
import { fitSvgAttendanceText } from "./attendanceTextLayout.js";

export const validateAttendanceSheetLayout = (sheetData) => {
  const errors = [];

  // 1. Check layout constants sanity
  const totalColWidth =
    ATTENDANCE_LAYOUT.columns.serial +
    ATTENDANCE_LAYOUT.columns.enrollment +
    ATTENDANCE_LAYOUT.columns.name +
    ATTENDANCE_LAYOUT.columns.sign;

  if (totalColWidth !== 186) {
    errors.push(`Table column width sum (${totalColWidth}mm) must be 186mm.`);
  }

  if (ATTENDANCE_LAYOUT.tableWidth !== 186) {
    errors.push(`Table width (${ATTENDANCE_LAYOUT.tableWidth}mm) must be 186mm.`);
  }

  if (ATTENDANCE_LAYOUT.columns.sign > 18) {
    errors.push(`Sign column width (${ATTENDANCE_LAYOUT.columns.sign}mm) must not exceed 18mm.`);
  }

  if (ATTENDANCE_LAYOUT.tableX + ATTENDANCE_LAYOUT.tableWidth > ATTENDANCE_PAGE.width) {
    errors.push(`Table extends beyond A4 page width (${ATTENDANCE_PAGE.width}mm).`);
  }

  // Check 39-row full page metrics
  const fullPageMetrics = resolveAttendancePageMetrics({ rowsOnPage: 39, isLastPage: true });
  if (fullPageMetrics.rowHeight < 5.35 || fullPageMetrics.rowHeight > 10.5) {
    errors.push(`Row height (${fullPageMetrics.rowHeight}mm) out of valid range [5.35, 10.5].`);
  }

  if (fullPageMetrics.coordinatorY > ATTENDANCE_PAGE.height - 5) {
    errors.push(`Full page coordinator position (${fullPageMetrics.coordinatorY}mm) exceeds page height.`);
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
    // Split into pages and validate metrics for each page
    const rowsPerPage = ATTENDANCE_LAYOUT.rowsPerPage;
    const pageCount = Math.ceil(students.length / rowsPerPage);

    for (let p = 0; p < pageCount; p++) {
      const isLastPage = p === pageCount - 1;
      const pageStudents = students.slice(p * rowsPerPage, (p + 1) * rowsPerPage);
      const metrics = resolveAttendancePageMetrics({
        rowsOnPage: pageStudents.length,
        isLastPage
      });

      if (metrics.rowHeight < 5.35 || metrics.rowHeight > 10.5) {
        errors.push(`Page ${p + 1} row height (${metrics.rowHeight}mm) out of valid range [5.35, 10.5].`);
      }

      if (isLastPage && metrics.coordinatorY > ATTENDANCE_PAGE.height - 5) {
        errors.push(`Final page coordinator position (${metrics.coordinatorY}mm) extends past page bottom.`);
      }
    }

    students.forEach((student, idx) => {
      const enroll = (student.enrollmentNo || "").trim();
      const name = (student.studentName || "").trim();

      if (!enroll) {
        errors.push(`Student at row ${idx + 1} is missing Enrollment Number.`);
      }
      if (!name) {
        errors.push(`Student at row ${idx + 1} is missing Student Name.`);
      }

      // Check name fitting at minimum size (7.4pt)
      const minNamePt = fitSvgAttendanceText({
        text: name,
        preferredSize: ATTENDANCE_TYPOGRAPHY.studentName.size,
        minimumSize: 7.4,
        maxWidth: ATTENDANCE_LAYOUT.columns.name - 3,
        fontFamily: ATTENDANCE_TYPOGRAPHY.svgFontFamily
      });

      if (minNamePt <= 7.4) {
        if (name.length > 75) {
          errors.push(`Student name is dangerously long for single line: [${name}].`);
        }
      }

      // Check enrollment fitting at minimum size (7.2pt)
      const minEnrollPt = fitSvgAttendanceText({
        text: enroll,
        preferredSize: ATTENDANCE_TYPOGRAPHY.enrollment.size,
        minimumSize: 7.2,
        maxWidth: ATTENDANCE_LAYOUT.columns.enrollment - 2,
        fontFamily: ATTENDANCE_TYPOGRAPHY.svgFontFamily
      });

      if (minEnrollPt < 7.2) {
        errors.push(`Enrollment number is too long for single line: [${enroll}].`);
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
