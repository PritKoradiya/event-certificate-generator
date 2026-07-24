import React from "react";
import { ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../../config/attendanceSheetLayout.js";
import { ptToSvgUnit } from "../../utils/resolveAttendancePageMetrics.js";
import { fitSvgAttendanceText } from "../../utils/attendanceTextLayout.js";

function AttendanceSheetHeader({
  department = "",
  heading = "",
  className = "",
  date = "",
  metrics
}) {
  const tableX = metrics ? metrics.tableX : ATTENDANCE_LAYOUT.tableX;
  const tableWidth = metrics ? metrics.tableWidth : ATTENDANCE_LAYOUT.tableWidth;
  const dateRowY = metrics ? metrics.dateRowY : ATTENDANCE_LAYOUT.dateRowY;

  const fontFam = ATTENDANCE_TYPOGRAPHY.svgFontFamily;

  const formattedDepartment = department
    ? department.toLowerCase().includes("department")
      ? department
      : `${department} Department`
    : "Department";

  // Fit heading text if long
  const headingPt = fitSvgAttendanceText({
    text: heading || "Event Heading",
    preferredSize: ATTENDANCE_TYPOGRAPHY.heading.size,
    minimumSize: 8.5,
    maxWidth: tableWidth - 10,
    fontFamily: fontFam,
    fontWeight: "bold"
  });

  const dateBaselineY = dateRowY + 5.1;

  return (
    <g className="attendance-sheet-header">
      {/* Centered Black Serif Header Text */}
      <text
        x="105"
        y={ATTENDANCE_LAYOUT.schoolY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(ATTENDANCE_TYPOGRAPHY.school.size)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.school.weight}
        fill="#000000"
      >
        School of Engineering, PPSU
      </text>

      <text
        x="105"
        y={ATTENDANCE_LAYOUT.departmentY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(ATTENDANCE_TYPOGRAPHY.department.size)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.department.weight}
        fill="#000000"
      >
        {formattedDepartment}
      </text>

      <text
        x="105"
        y={ATTENDANCE_LAYOUT.headingY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(headingPt)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.heading.weight}
        fill="#000000"
      >
        {heading || "Event Heading"}
      </text>

      <text
        x="105"
        y={ATTENDANCE_LAYOUT.documentTitleY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(ATTENDANCE_TYPOGRAPHY.documentTitle.size)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.documentTitle.weight}
        fill="#000000"
      >
        Attendance Sheet
      </text>

      <text
        x="105"
        y={ATTENDANCE_LAYOUT.classY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(ATTENDANCE_TYPOGRAPHY.className.size)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.className.weight}
        fill="#000000"
      >
        Class- {className || "—"}
      </text>

      {/* Date Row Box */}
      <rect
        x={tableX}
        y={dateRowY}
        width={tableWidth}
        height={8}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="0.45"
      />
      <text
        x={tableX + 3}
        y={dateBaselineY}
        fontFamily={fontFam}
        fontSize={ptToSvgUnit(ATTENDANCE_TYPOGRAPHY.dateLabel.size)}
        fill="#000000"
      >
        <tspan fontWeight="bold">Date : </tspan>
        <tspan fontWeight="normal">{date || "—"}</tspan>
      </text>
    </g>
  );
}

export default AttendanceSheetHeader;
