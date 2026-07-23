import React from "react";

function AttendanceSheetTable({ studentsChunk = [], startSrNo = 1 }) {
  const tableX = 100;
  const tableWidth = 1040;
  const headerY = 285;
  const headerHeight = 34;
  const rowHeight = 31;
  const dataStartY = headerY + headerHeight;

  // Column boundaries
  const colSrW = 104; // 10%
  const colEnrollW = 260; // 25%
  const colNameW = 520; // 50%
  const colSignW = 156; // 15%

  const xSr = tableX;
  const xEnroll = xSr + colSrW; // 204
  const xName = xEnroll + colEnrollW; // 464
  const xSign = xName + colNameW; // 984
  const xEnd = tableX + tableWidth; // 1140

  const totalTableHeight = headerHeight + studentsChunk.length * rowHeight;

  return (
    <g className="attendance-sheet-table">
      {/* Table Outer Frame */}
      <rect
        x={tableX}
        y={headerY}
        width={tableWidth}
        height={totalTableHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="1.5"
      />

      {/* Table Header Background & Rect */}
      <rect
        x={tableX}
        y={headerY}
        width={tableWidth}
        height={headerHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="1.5"
      />

      {/* Header Vertical Column Lines */}
      <line x1={xEnroll} y1={headerY} x2={xEnroll} y2={headerY + headerHeight} stroke="#000000" strokeWidth="1.5" />
      <line x1={xName} y1={headerY} x2={xName} y2={headerY + headerHeight} stroke="#000000" strokeWidth="1.5" />
      <line x1={xSign} y1={headerY} x2={xSign} y2={headerY + headerHeight} stroke="#000000" strokeWidth="1.5" />

      {/* Header Column Titles */}
      <text
        x={xSr + colSrW / 2}
        y={headerY + 22}
        textAnchor="middle"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="15"
        fontWeight="bold"
        fill="#000000"
      >
        Sr. No.
      </text>

      <text
        x={xEnroll + colEnrollW / 2}
        y={headerY + 22}
        textAnchor="middle"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="15"
        fontWeight="bold"
        fill="#000000"
      >
        Enrollment No.
      </text>

      <text
        x={xName + 15}
        y={headerY + 22}
        textAnchor="start"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="15"
        fontWeight="bold"
        fill="#000000"
      >
        Name
      </text>

      <text
        x={xSign + colSignW / 2}
        y={headerY + 22}
        textAnchor="middle"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="15"
        fontWeight="bold"
        fill="#000000"
      >
        Sign
      </text>

      {/* Student Data Rows */}
      {studentsChunk.map((student, idx) => {
        const rowY = dataStartY + idx * rowHeight;
        const srNo = startSrNo + idx;
        const enrollNo = (student.enrollmentNo || "").toUpperCase();
        const studentName = (student.studentName || "").toUpperCase();

        return (
          <g key={student.id || idx}>
            {/* Horizontal Row Line */}
            <line
              x1={tableX}
              y1={rowY + rowHeight}
              x2={xEnd}
              y2={rowY + rowHeight}
              stroke="#000000"
              strokeWidth="1"
            />

            {/* Vertical Column Lines for Row */}
            <line x1={xEnroll} y1={rowY} x2={xEnroll} y2={rowY + rowHeight} stroke="#000000" strokeWidth="1" />
            <line x1={xName} y1={rowY} x2={xName} y2={rowY + rowHeight} stroke="#000000" strokeWidth="1" />
            <line x1={xSign} y1={rowY} x2={xSign} y2={rowY + rowHeight} stroke="#000000" strokeWidth="1" />

            {/* Sr. No. */}
            <text
              x={xSr + colSrW / 2}
              y={rowY + 20}
              textAnchor="middle"
              fontFamily="Times New Roman, Georgia, serif"
              fontSize="14"
              fill="#000000"
            >
              {srNo}
            </text>

            {/* Enrollment No. */}
            <text
              x={xEnroll + colEnrollW / 2}
              y={rowY + 20}
              textAnchor="middle"
              fontFamily="Times New Roman, Georgia, serif"
              fontSize="14"
              fill="#000000"
            >
              {enrollNo}
            </text>

            {/* Student Name */}
            <text
              x={xName + 15}
              y={rowY + 20}
              textAnchor="start"
              fontFamily="Times New Roman, Georgia, serif"
              fontSize="13.5"
              fill="#000000"
            >
              {studentName}
            </text>

            {/* Sign Column remains completely BLANK */}
          </g>
        );
      })}
    </g>
  );
}

export default AttendanceSheetTable;
