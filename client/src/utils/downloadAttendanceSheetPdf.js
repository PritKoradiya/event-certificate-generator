import { jsPDF } from "jspdf";
import { ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../config/attendanceSheetLayout.js";
import { resolveAttendancePageMetrics } from "./resolveAttendancePageMetrics.js";
import { fitPdfTextToWidth } from "./attendanceTextLayout.js";
import { validateAttendanceSheetLayout } from "./validateAttendanceSheetLayout.js";

/**
 * Direct Vector Multipage A4 Attendance PDF Generator using jsPDF drawing methods.
 * Uses exact single source of truth adaptive metrics from resolveAttendancePageMetrics.
 * No canvas, no JPEG, no addImage, no html2canvas!
 */
export const downloadAttendanceSheetPdf = async ({ sheet, fileName = "Attendance_Sheet.pdf" }) => {
  if (!sheet) {
    throw new Error("Missing attendance sheet data for PDF export.");
  }

  // Pre-validate layout before generating PDF (PART 20)
  const validation = validateAttendanceSheetLayout(sheet);
  if (!validation.valid) {
    throw new Error(`Cannot export PDF due to layout validation errors: ${validation.errors.join("; ")}`);
  }

  const {
    schoolName = "School of Engineering, PPSU",
    department = "",
    heading = "",
    className = "",
    date = "",
    eventCoordinatorName = "",
    students = []
  } = sheet;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });

  const fontFam = ATTENDANCE_TYPOGRAPHY.fontFamily; // "times"
  const rowsPerPage = ATTENDANCE_LAYOUT.rowsPerPage; // 39

  const formattedDepartment = department
    ? department.toLowerCase().includes("department")
      ? department
      : `${department} Department`
    : "Department";

  // Split students into chunks of 39
  const studentChunks = [];
  if (students.length === 0) {
    studentChunks.push([]);
  } else {
    for (let i = 0; i < students.length; i += rowsPerPage) {
      studentChunks.push(students.slice(i, i + rowsPerPage));
    }
  }

  const totalPages = studentChunks.length;

  studentChunks.forEach((chunk, pageIndex) => {
    if (pageIndex > 0) {
      pdf.addPage("a4", "portrait");
    }

    const isLastPage = pageIndex === totalPages - 1;
    const startSrNo = pageIndex * rowsPerPage + 1;

    // Resolve adaptive metrics for this specific page
    const metrics = resolveAttendancePageMetrics({
      rowsOnPage: chunk.length,
      isLastPage
    });

    const {
      tableX,
      tableWidth,
      dateRowY,
      columnHeaderY,
      studentRowsY,
      rowHeight,
      serialFontSize,
      enrollmentFontSize,
      studentNameFontSize,
      columnHeaderFontSize,
      coordinatorY
    } = metrics;

    const colSrW = ATTENDANCE_LAYOUT.columns.serial; // 15
    const colEnrollW = ATTENDANCE_LAYOUT.columns.enrollment; // 43
    const colNameW = ATTENDANCE_LAYOUT.columns.name; // 110
    const colSignW = ATTENDANCE_LAYOUT.columns.sign; // 18

    const xSr = tableX; // 12
    const xEnroll = xSr + colSrW; // 27
    const xName = xEnroll + colEnrollW; // 70
    const xSign = xName + colNameW; // 180
    const xEnd = tableX + tableWidth; // 198

    // --- 1. DRAW REPEATED HEADER ---
    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.school.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.school.size); // 15pt
    pdf.text(schoolName, 105, ATTENDANCE_LAYOUT.schoolY, { align: "center" });

    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.department.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.department.size); // 12pt
    pdf.text(formattedDepartment, 105, ATTENDANCE_LAYOUT.departmentY, { align: "center" });

    // Fit heading text if long
    const headingPt = fitPdfTextToWidth({
      pdf,
      text: heading || "Event Heading",
      preferredSize: ATTENDANCE_TYPOGRAPHY.heading.size, // 11.5pt
      minimumSize: 8.5,
      maxWidth: tableWidth - 10,
      fontStyle: ATTENDANCE_TYPOGRAPHY.heading.weight
    });
    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.heading.weight);
    pdf.setFontSize(headingPt);
    pdf.text(heading || "Event Heading", 105, ATTENDANCE_LAYOUT.headingY, { align: "center" });

    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.documentTitle.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.documentTitle.size); // 13pt
    pdf.text("Attendance Sheet", 105, ATTENDANCE_LAYOUT.documentTitleY, { align: "center" });

    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.className.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.className.size); // 11.5pt
    pdf.text(`Class- ${className || "—"}`, 105, ATTENDANCE_LAYOUT.classY, { align: "center" });

    // --- 2. DRAW BORDERED DATE ROW ---
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.45); // Strong outer border
    pdf.rect(tableX, dateRowY, tableWidth, 8); // 8mm height

    const dateBaselineY = dateRowY + 5.1;
    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.dateLabel.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.dateLabel.size); // 9.5pt
    pdf.text("Date : ", tableX + 3, dateBaselineY);

    const dateLabelWidth = pdf.getTextWidth("Date : ");
    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.date.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.date.size); // 9.5pt
    pdf.text(date || "—", tableX + 3 + dateLabelWidth, dateBaselineY);

    // --- 3. DRAW TABLE HEADERS ---
    const columnHeaderHeight = 8;
    const totalTableHeight = columnHeaderHeight + chunk.length * rowHeight;

    // Outer table border (0.45mm)
    pdf.setLineWidth(0.45);
    pdf.rect(tableX, columnHeaderY, tableWidth, totalTableHeight);

    // Column header box (0.28mm inner line)
    pdf.setLineWidth(0.28);
    pdf.rect(tableX, columnHeaderY, tableWidth, columnHeaderHeight);

    // Header vertical lines
    pdf.line(xEnroll, columnHeaderY, xEnroll, columnHeaderY + columnHeaderHeight);
    pdf.line(xName, columnHeaderY, xName, columnHeaderY + columnHeaderHeight);
    pdf.line(xSign, columnHeaderY, xSign, columnHeaderY + columnHeaderHeight);

    const headerBaselineY = columnHeaderY + 5.1;
    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.columnHeader.weight);
    pdf.setFontSize(columnHeaderFontSize); // 9.5pt up to 10pt on final page

    pdf.text("Sr. No.", xSr + colSrW / 2, headerBaselineY, { align: "center" });
    pdf.text("Enrollment No.", xEnroll + colEnrollW / 2, headerBaselineY, { align: "center" });
    pdf.text("Name", xName + colNameW / 2, headerBaselineY, { align: "center" });
    pdf.text("Sign", xSign + colSignW / 2, headerBaselineY, { align: "center" });

    // --- 4. DRAW STUDENT ROWS ---
    pdf.setFont(fontFam, "normal");
    pdf.setLineWidth(0.28);

    chunk.forEach((student, idx) => {
      const rowTopY = studentRowsY + idx * rowHeight;
      const baselineY = rowTopY + rowHeight * 0.64;
      const srNo = String(startSrNo + idx);
      const enrollNo = (student.enrollmentNo || "").toUpperCase();
      const studentName = (student.studentName || "").toUpperCase();

      // Horizontal line for row bottom
      pdf.line(tableX, rowTopY + rowHeight, xEnd, rowTopY + rowHeight);

      // Vertical lines for row
      pdf.line(xEnroll, rowTopY, xEnroll, rowTopY + rowHeight);
      pdf.line(xName, rowTopY, xName, rowTopY + rowHeight);
      pdf.line(xSign, rowTopY, xSign, rowTopY + rowHeight);

      // Sr. No.
      pdf.setFont(fontFam, "normal");
      pdf.setFontSize(serialFontSize);
      pdf.text(srNo, xSr + colSrW / 2, baselineY, { align: "center" });

      // Enrollment No.
      const enrollPt = fitPdfTextToWidth({
        pdf,
        text: enrollNo,
        preferredSize: enrollmentFontSize,
        minimumSize: 7.2,
        maxWidth: colEnrollW - 2,
        fontStyle: "normal"
      });
      pdf.setFontSize(enrollPt);
      pdf.text(enrollNo, xEnroll + colEnrollW / 2, baselineY, { align: "center" });

      // Student Name with 1.5mm left padding
      const namePt = fitPdfTextToWidth({
        pdf,
        text: studentName,
        preferredSize: studentNameFontSize,
        minimumSize: 7.4,
        maxWidth: colNameW - 3,
        fontStyle: "normal"
      });
      pdf.setFontSize(namePt);
      pdf.text(studentName, xName + 1.5, baselineY, { align: "left" });

      // Sign column remains COMPLETELY BLANK
    });

    // --- 5. DRAW EVENT COORDINATOR (FINAL PAGE ONLY) ---
    if (isLastPage) {
      pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.coordinator.weight);
      pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.coordinator.size); // 10.5pt

      pdf.text("Event Coordinator : ", tableX, coordinatorY);
      const coordLabelWidth = pdf.getTextWidth("Event Coordinator : ");
      pdf.text(eventCoordinatorName || "—", tableX + coordLabelWidth, coordinatorY);
    }
  });

  pdf.save(fileName);
};

export default downloadAttendanceSheetPdf;
