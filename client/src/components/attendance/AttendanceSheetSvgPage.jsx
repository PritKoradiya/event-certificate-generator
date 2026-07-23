import React from "react";
import AttendanceSheetHeader from "./AttendanceSheetHeader.jsx";
import AttendanceSheetTable from "./AttendanceSheetTable.jsx";
import { ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../../config/attendanceSheetLayout.js";

const ptToMm = (pt) => (pt * 25.4) / 72;

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
  const { studentRowsY, rowHeight, coordinatorGap, tableX } = ATTENDANCE_LAYOUT;
  const fontFam = ATTENDANCE_TYPOGRAPHY.svgFontFamily;

  const tableBottomY = studentRowsY + studentsChunk.length * rowHeight;
  const coordinatorY = tableBottomY + coordinatorGap;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 210 297"
      width="210mm"
      height="297mm"
      preserveAspectRatio="xMidYMid meet"
      className="attendance-svg-page w-full h-auto bg-white shadow-2xl rounded-sm border border-slate-300"
      style={{ display: "block" }}
    >
      {/* Background Page Canvas */}
      <rect x="0" y="0" width="210" height="297" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />

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

      {/* Event Coordinator - ONLY rendered on the final page immediately below table */}
      {isLastPage && (
        <g className="event-coordinator-section">
          <text
            x={tableX}
            y={coordinatorY}
            fontFamily={fontFam}
            fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.coordinator.size)}
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
