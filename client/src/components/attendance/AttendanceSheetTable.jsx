import React from "react";
import { ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../../config/attendanceSheetLayout.js";
import { ptToSvgUnit } from "../../utils/resolveAttendancePageMetrics.js";
import { fitSvgAttendanceText } from "../../utils/attendanceTextLayout.js";

function AttendanceSheetTable({ studentsChunk = [], startSrNo = 1, metrics }) {
  const tableX = metrics ? metrics.tableX : ATTENDANCE_LAYOUT.tableX;
  const tableWidth = metrics ? metrics.tableWidth : ATTENDANCE_LAYOUT.tableWidth;
  const columnHeaderY = metrics ? metrics.columnHeaderY : ATTENDANCE_LAYOUT.columnHeaderY;
  const studentRowsY = metrics ? metrics.studentRowsY : ATTENDANCE_LAYOUT.studentRowsY;
  const rowHeight = metrics ? metrics.rowHeight : ATTENDANCE_LAYOUT.rowHeight;

  const serialFontSize = metrics ? metrics.serialFontSize : ATTENDANCE_TYPOGRAPHY.serial.size;
  const enrollmentFontSize = metrics ? metrics.enrollmentFontSize : ATTENDANCE_TYPOGRAPHY.enrollment.size;
  const studentNameFontSize = metrics ? metrics.studentNameFontSize : ATTENDANCE_TYPOGRAPHY.studentName.size;
  const columnHeaderFontSize = metrics ? metrics.columnHeaderFontSize : ATTENDANCE_TYPOGRAPHY.columnHeader.size;

  const fontFam = ATTENDANCE_TYPOGRAPHY.svgFontFamily;

  const colSrW = ATTENDANCE_LAYOUT.columns.serial; // 15
  const colEnrollW = ATTENDANCE_LAYOUT.columns.enrollment; // 43
  const colNameW = ATTENDANCE_LAYOUT.columns.name; // 110
  const colSignW = ATTENDANCE_LAYOUT.columns.sign; // 18

  const xSr = tableX; // 12
  const xEnroll = xSr + colSrW; // 27
  const xName = xEnroll + colEnrollW; // 70
  const xSign = xName + colNameW; // 180
  const xEnd = tableX + tableWidth; // 198

  const columnHeaderHeight = 8;
  const totalTableHeight = columnHeaderHeight + studentsChunk.length * rowHeight;
  const headerBaselineY = columnHeaderY + 5.1;

  return (
    <g className="attendance-sheet-table">
      {/* Outer Border Frame (0.45mm solid black) */}
      <rect
        x={tableX}
        y={columnHeaderY}
        width={tableWidth}
        height={totalTableHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="0.45"
      />

      {/* Header Row Rect (0.28mm inner line) */}
      <rect
        x={tableX}
        y={columnHeaderY}
        width={tableWidth}
        height={columnHeaderHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="0.28"
      />

      {/* Header Vertical Lines */}
      <line x1={xEnroll} y1={columnHeaderY} x2={xEnroll} y2={columnHeaderY + columnHeaderHeight} stroke="#000000" strokeWidth="0.28" />
      <line x1={xName} y1={columnHeaderY} x2={xName} y2={columnHeaderY + columnHeaderHeight} stroke="#000000" strokeWidth="0.28" />
      <line x1={xSign} y1={columnHeaderY} x2={xSign} y2={columnHeaderY + columnHeaderHeight} stroke="#000000" strokeWidth="0.28" />

      {/* Header Titles */}
      <text
        x={xSr + colSrW / 2}
        y={headerBaselineY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(columnHeaderFontSize)}
        fontWeight="bold"
        fill="#000000"
      >
        Sr. No.
      </text>

      <text
        x={xEnroll + colEnrollW / 2}
        y={headerBaselineY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(columnHeaderFontSize)}
        fontWeight="bold"
        fill="#000000"
      >
        Enrollment No.
      </text>

      <text
        x={xName + colNameW / 2}
        y={headerBaselineY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(columnHeaderFontSize)}
        fontWeight="bold"
        fill="#000000"
      >
        Name
      </text>

      <text
        x={xSign + colSignW / 2}
        y={headerBaselineY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(columnHeaderFontSize)}
        fontWeight="bold"
        fill="#000000"
      >
        Sign
      </text>

      {/* Student Data Rows */}
      {studentsChunk.map((student, idx) => {
        const rowTopY = studentRowsY + idx * rowHeight;
        const baselineY = rowTopY + rowHeight * 0.64;
        const srNo = startSrNo + idx;
        const enrollNo = (student.enrollmentNo || "").toUpperCase();
        const studentName = (student.studentName || "").toUpperCase();

        // Dynamically fit student name text
        const namePt = fitSvgAttendanceText({
          text: studentName,
          preferredSize: studentNameFontSize,
          minimumSize: 7.4,
          maxWidth: colNameW - 3,
          fontFamily: fontFam,
          fontWeight: "normal"
        });

        // Dynamically fit enrollment text
        const enrollPt = fitSvgAttendanceText({
          text: enrollNo,
          preferredSize: enrollmentFontSize,
          minimumSize: 7.2,
          maxWidth: colEnrollW - 2,
          fontFamily: fontFam,
          fontWeight: "normal"
        });

        return (
          <g key={student.id || idx}>
            {/* Horizontal Line for Row Bottom */}
            <line
              x1={tableX}
              y1={rowTopY + rowHeight}
              x2={xEnd}
              y2={rowTopY + rowHeight}
              stroke="#000000"
              strokeWidth="0.28"
            />

            {/* Vertical Lines for Row */}
            <line x1={xEnroll} y1={rowTopY} x2={xEnroll} y2={rowTopY + rowHeight} stroke="#000000" strokeWidth="0.28" />
            <line x1={xName} y1={rowTopY} x2={xName} y2={rowTopY + rowHeight} stroke="#000000" strokeWidth="0.28" />
            <line x1={xSign} y1={rowTopY} x2={xSign} y2={rowTopY + rowHeight} stroke="#000000" strokeWidth="0.28" />

            {/* Sr. No. */}
            <text
              x={xSr + colSrW / 2}
              y={baselineY}
              textAnchor="middle"
              fontFamily={fontFam}
              fontSize={ptToSvgUnit(serialFontSize)}
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
              fontSize={ptToSvgUnit(enrollPt)}
              fill="#000000"
            >
              {enrollNo}
            </text>

            {/* Student Name with 1.5mm left padding */}
            <text
              x={xName + 1.5}
              y={baselineY}
              textAnchor="start"
              fontFamily={fontFam}
              fontSize={ptToSvgUnit(namePt)}
              fill="#000000"
            >
              {studentName}
            </text>

            {/* Sign Cell remains COMPLETELY BLANK */}
          </g>
        );
      })}
    </g>
  );
}

export default AttendanceSheetTable;
