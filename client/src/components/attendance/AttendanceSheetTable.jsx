import React from "react";
import { ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../../config/attendanceSheetLayout.js";
import { fitSvgAttendanceText } from "../../utils/attendanceTextLayout.js";

const ptToMm = (pt) => (pt * 25.4) / 72;

function AttendanceSheetTable({ studentsChunk = [], startSrNo = 1 }) {
  const { tableX, tableWidth, columnHeaderY, columnHeaderHeight, studentRowsY, rowHeight, columns } = ATTENDANCE_LAYOUT;
  const fontFam = ATTENDANCE_TYPOGRAPHY.svgFontFamily;

  const colSrW = columns.serial; // 16
  const colEnrollW = columns.enrollment; // 43
  const colNameW = columns.name; // 82
  const colSignW = columns.sign; // 19

  const xSr = tableX; // 25
  const xEnroll = xSr + colSrW; // 41
  const xName = xEnroll + colEnrollW; // 84
  const xSign = xName + colNameW; // 166
  const xEnd = tableX + tableWidth; // 185

  const totalTableHeight = columnHeaderHeight + studentsChunk.length * rowHeight;

  return (
    <g className="attendance-sheet-table">
      {/* Outer Border Frame */}
      <rect
        x={tableX}
        y={columnHeaderY}
        width={tableWidth}
        height={totalTableHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="0.4"
      />

      {/* Header Row Rect */}
      <rect
        x={tableX}
        y={columnHeaderY}
        width={tableWidth}
        height={columnHeaderHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="0.3"
      />

      {/* Header Vertical Lines */}
      <line x1={xEnroll} y1={columnHeaderY} x2={xEnroll} y2={columnHeaderY + columnHeaderHeight} stroke="#000000" strokeWidth="0.3" />
      <line x1={xName} y1={columnHeaderY} x2={xName} y2={columnHeaderY + columnHeaderHeight} stroke="#000000" strokeWidth="0.3" />
      <line x1={xSign} y1={columnHeaderY} x2={xSign} y2={columnHeaderY + columnHeaderHeight} stroke="#000000" strokeWidth="0.3" />

      {/* Header Titles */}
      <text
        x={xSr + colSrW / 2}
        y={columnHeaderY + 4.8}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.columnHeader.size)}
        fontWeight="bold"
        fill="#000000"
      >
        Sr. No.
      </text>

      <text
        x={xEnroll + colEnrollW / 2}
        y={columnHeaderY + 4.8}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.columnHeader.size)}
        fontWeight="bold"
        fill="#000000"
      >
        Enrollment No.
      </text>

      <text
        x={xName + 2}
        y={columnHeaderY + 4.8}
        textAnchor="start"
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.columnHeader.size)}
        fontWeight="bold"
        fill="#000000"
      >
        Name
      </text>

      <text
        x={xSign + colSignW / 2}
        y={columnHeaderY + 4.8}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.columnHeader.size)}
        fontWeight="bold"
        fill="#000000"
      >
        Sign
      </text>

      {/* Student Data Rows (up to 39 per page) */}
      {studentsChunk.map((student, idx) => {
        const rowTopY = studentRowsY + idx * rowHeight;
        const baselineY = rowTopY + 3.57; // ~0.68 * 5.25mm
        const srNo = startSrNo + idx;
        const enrollNo = (student.enrollmentNo || "").toUpperCase();
        const studentName = (student.studentName || "").toUpperCase();

        // Dynamically fit student name text
        const namePt = fitSvgAttendanceText({
          text: studentName,
          preferredSize: ATTENDANCE_TYPOGRAPHY.studentName.size,
          minimumSize: ATTENDANCE_TYPOGRAPHY.studentName.minimumSize,
          maxWidth: colNameW - 4, // 78mm
          fontFamily: fontFam,
          fontWeight: "normal"
        });

        // Dynamically fit enrollment text if needed
        const enrollPt = fitSvgAttendanceText({
          text: enrollNo,
          preferredSize: ATTENDANCE_TYPOGRAPHY.enrollment.size,
          minimumSize: ATTENDANCE_TYPOGRAPHY.enrollment.minimumSize,
          maxWidth: colEnrollW - 2, // 41mm
          fontFamily: fontFam,
          fontWeight: "normal"
        });

        return (
          <g key={student.id || idx}>
            {/* Horizontal Line for Row */}
            <line
              x1={tableX}
              y1={rowTopY + rowHeight}
              x2={xEnd}
              y2={rowTopY + rowHeight}
              stroke="#000000"
              strokeWidth="0.25"
            />

            {/* Vertical Lines for Row */}
            <line x1={xEnroll} y1={rowTopY} x2={xEnroll} y2={rowTopY + rowHeight} stroke="#000000" strokeWidth="0.25" />
            <line x1={xName} y1={rowTopY} x2={xName} y2={rowTopY + rowHeight} stroke="#000000" strokeWidth="0.25" />
            <line x1={xSign} y1={rowTopY} x2={xSign} y2={rowTopY + rowHeight} stroke="#000000" strokeWidth="0.25" />

            {/* Sr. No. */}
            <text
              x={xSr + colSrW / 2}
              y={baselineY}
              textAnchor="middle"
              fontFamily={fontFam}
              fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.serial.size)}
              fill="#000000"
            >
              {srNo}
            </text>

            {/* Enrollment No. */}
            <text
              x={xEnroll + colEnrollW / 2}
              y={baselineY}
              textAnchor="middle"
              fontFamily={fontFam}
              fontSize={ptToMm(enrollPt)}
              fill="#000000"
            >
              {enrollNo}
            </text>

            {/* Student Name */}
            <text
              x={xName + 2}
              y={baselineY}
              textAnchor="start"
              fontFamily={fontFam}
              fontSize={ptToMm(namePt)}
              fill="#000000"
            >
              {studentName}
            </text>

            {/* Sign Cell remains completely BLANK */}
          </g>
        );
      })}
    </g>
  );
}

export default AttendanceSheetTable;
