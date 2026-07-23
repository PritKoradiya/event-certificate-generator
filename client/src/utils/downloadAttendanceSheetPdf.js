import { jsPDF } from "jspdf";
import { ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../config/attendanceSheetLayout.js";
import { fitPdfTextToWidth } from "./attendanceTextLayout.js";

/**
 * Direct Vector Multipage A4 Attendance PDF Generator using jsPDF drawing methods.
 * No canvas, no JPEG, no addImage, no html2canvas!
 */
export const downloadAttendanceSheetPdf = async ({ sheet, fileName = "Attendance_Sheet.pdf" }) => {
  if (!sheet) {
    throw new Error("Missing attendance sheet data for PDF export.");
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
  const {
    tableX,
    tableWidth,
    schoolY,
    departmentY,
    headingY,
    documentTitleY,
    classY,
    dateRowY,
    dateRowHeight,
    columnHeaderY,
    columnHeaderHeight,
    studentRowsY,
    rowHeight,
    rowsPerPage,
    coordinatorGap,
    columns
  } = ATTENDANCE_LAYOUT;

  const colSrW = columns.serial; // 16
  const colEnrollW = columns.enrollment; // 43
  const colNameW = columns.name; // 82
  const colSignW = columns.sign; // 19

  const xSr = tableX; // 25
  const xEnroll = xSr + colSrW; // 41
  const xName = xEnroll + colEnrollW; // 84
  const xSign = xName + colNameW; // 166
  const xEnd = tableX + tableWidth; // 185

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

    const startSrNo = pageIndex * rowsPerPage + 1;
    const isLastPage = pageIndex === totalPages - 1;

    // --- 1. DRAW REPEATED HEADER ---
    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.school.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.school.size);
    pdf.text(schoolName, 105, schoolY, { align: "center" });

    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.department.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.department.size);
    pdf.text(formattedDepartment, 105, departmentY, { align: "center" });

    // Fit heading text
    const headingPt = fitPdfTextToWidth({
      pdf,
      text: heading || "Event Heading",
      preferredSize: ATTENDANCE_TYPOGRAPHY.heading.size,
      minimumSize: 8.5,
      maxWidth: tableWidth - 10,
      fontStyle: ATTENDANCE_TYPOGRAPHY.heading.weight
    });
    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.heading.weight);
    pdf.setFontSize(headingPt);
    pdf.text(heading || "Event Heading", 105, headingY, { align: "center" });

    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.documentTitle.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.documentTitle.size);
    pdf.text("Attendance Sheet", 105, documentTitleY, { align: "center" });

    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.className.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.className.size);
    pdf.text(`Class- ${className || "—"}`, 105, classY, { align: "center" });

    // --- 2. DRAW BORDERED DATE ROW ---
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3);
    pdf.rect(tableX, dateRowY, tableWidth, dateRowHeight);

    pdf.setFont(fontFam, "bold");
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.dateLabel.size);
    pdf.text("Date : ", tableX + 3, dateRowY + 4.8);

    const dateLabelWidth = pdf.getTextWidth("Date : ");
    pdf.setFont(fontFam, "normal");
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.date.size);
    pdf.text(date || "—", tableX + 3 + dateLabelWidth, dateRowY + 4.8);

    // --- 3. DRAW TABLE HEADERS ---
    const totalTableHeight = columnHeaderHeight + chunk.length * rowHeight;

    // Outer table border
    pdf.setLineWidth(0.4);
    pdf.rect(tableX, columnHeaderY, tableWidth, totalTableHeight);

    // Column header box
    pdf.setLineWidth(0.3);
    pdf.rect(tableX, columnHeaderY, tableWidth, columnHeaderHeight);

    // Header vertical lines
    pdf.line(xEnroll, columnHeaderY, xEnroll, columnHeaderY + columnHeaderHeight);
    pdf.line(xName, columnHeaderY, xName, columnHeaderY + columnHeaderHeight);
    pdf.line(xSign, columnHeaderY, xSign, columnHeaderY + columnHeaderHeight);

    pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.columnHeader.weight);
    pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.columnHeader.size);

    pdf.text("Sr. No.", xSr + colSrW / 2, columnHeaderY + 4.8, { align: "center" });
    pdf.text("Enrollment No.", xEnroll + colEnrollW / 2, columnHeaderY + 4.8, { align: "center" });
    pdf.text("Name", xName + 2, columnHeaderY + 4.8, { align: "left" });
    pdf.text("Sign", xSign + colSignW / 2, columnHeaderY + 4.8, { align: "center" });

    // --- 4. DRAW STUDENT ROWS ---
    pdf.setFont(fontFam, "normal");
    pdf.setLineWidth(0.25);

    chunk.forEach((student, idx) => {
      const rowTopY = studentRowsY + idx * rowHeight;
      const baselineY = rowTopY + 3.57; // ~0.68 * 5.25mm
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
      pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.serial.size);
      pdf.text(srNo, xSr + colSrW / 2, baselineY, { align: "center" });

      // Enrollment No.
      const enrollPt = fitPdfTextToWidth({
        pdf,
        text: enrollNo,
        preferredSize: ATTENDANCE_TYPOGRAPHY.enrollment.size,
        minimumSize: ATTENDANCE_TYPOGRAPHY.enrollment.minimumSize,
        maxWidth: colEnrollW - 2,
        fontStyle: "normal"
      });
      pdf.setFontSize(enrollPt);
      pdf.text(enrollNo, xEnroll + colEnrollW / 2, baselineY, { align: "center" });

      // Student Name
      const namePt = fitPdfTextToWidth({
        pdf,
        text: studentName,
        preferredSize: ATTENDANCE_TYPOGRAPHY.studentName.size,
        minimumSize: ATTENDANCE_TYPOGRAPHY.studentName.minimumSize,
        maxWidth: colNameW - 4,
        fontStyle: "normal"
      });
      pdf.setFontSize(namePt);
      pdf.text(studentName, xName + 2, baselineY, { align: "left" });

      // Sign column remains COMPLETELY BLANK
    });

    // --- 5. DRAW EVENT COORDINATOR (FINAL PAGE ONLY) ---
    if (isLastPage) {
      const tableBottomY = studentRowsY + chunk.length * rowHeight;
      const coordinatorY = tableBottomY + coordinatorGap; // 9mm gap immediately below table

      pdf.setFont(fontFam, ATTENDANCE_TYPOGRAPHY.coordinator.weight);
      pdf.setFontSize(ATTENDANCE_TYPOGRAPHY.coordinator.size);

      pdf.text("Event Coordinator : ", tableX, coordinatorY);
      const coordLabelWidth = pdf.getTextWidth("Event Coordinator : ");
      pdf.text(eventCoordinatorName || "—", tableX + coordLabelWidth, coordinatorY);
    }
  });

  pdf.save(fileName);
};

export default downloadAttendanceSheetPdf;
