import React from "react";
import AttendanceSheetHeader from "./AttendanceSheetHeader.jsx";
import AttendanceSheetTable from "./AttendanceSheetTable.jsx";

function AttendanceSheetSvgPage({
  department = "",
  heading = "",
  className = "",
  date = "",
  eventCoordinatorName = "",
  studentsChunk = [],
  startSrNo = 1,
  isLastPage = false,
  pageIndex = 0,
  totalPages = 1
}) {
  const headerY = 292;
  const headerHeight = 34;
  const rowHeight = 29;
  const tableBottomY = headerY + headerHeight + studentsChunk.length * rowHeight;

  // Placement for Event Coordinator below table on last page
  // Keeps coordinator near the table if few students on last page
  const coordinatorY = Math.min(tableBottomY + 45, 1560);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1240 1754"
      width="1240"
      height="1754"
      className="attendance-svg-page w-full h-auto bg-white shadow-2xl rounded-sm border border-slate-300"
      style={{ display: "block" }}
    >
      {/* Background Page Canvas */}
      <rect x="0" y="0" width="1240" height="1754" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />

      {/* Repeated Document Header */}
      <AttendanceSheetHeader
        department={department}
        heading={heading}
        className={className}
        date={date}
      />

      {/* Attendance Table */}
      <AttendanceSheetTable
        studentsChunk={studentsChunk}
        startSrNo={startSrNo}
      />

      {/* Event Coordinator - ONLY rendered on the final page */}
      {isLastPage && (
        <g className="event-coordinator-section">
          <text
            x="100"
            y={coordinatorY}
            fontFamily="Times New Roman, Georgia, serif"
            fontSize="18"
            fill="#000000"
          >
            <tspan fontWeight="bold">Event Coordinator : </tspan>
            <tspan fontWeight="bold">{eventCoordinatorName || "—"}</tspan>
          </text>
        </g>
      )}
    </svg>
  );
}

export default AttendanceSheetSvgPage;
