import React from "react";
import { ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../../config/attendanceSheetLayout.js";
import { fitSvgAttendanceText } from "../../utils/attendanceTextLayout.js";

const ptToMm = (pt) => (pt * 25.4) / 72;

function AttendanceSheetHeader({ department = "", heading = "", className = "", date = "" }) {
  const { tableX, tableWidth, schoolY, departmentY, headingY, documentTitleY, classY, dateRowY, dateRowHeight } = ATTENDANCE_LAYOUT;
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

  return (
    <g className="attendance-sheet-header">
      {/* Centered Black Serif Header Text */}
      <text
        x="105"
        y={schoolY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.school.size)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.school.weight}
        fill="#000000"
      >
        School of Engineering, PPSU
      </text>

      <text
        x="105"
        y={departmentY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.department.size)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.department.weight}
        fill="#000000"
      >
        {formattedDepartment}
      </text>

      <text
        x="105"
        y={headingY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToMm(headingPt)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.heading.weight}
        fill="#000000"
      >
        {heading || "Event Heading"}
      </text>

      <text
        x="105"
        y={documentTitleY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.documentTitle.size)}
        fontWeight={ATTENDANCE_TYPOGRAPHY.documentTitle.weight}
        fill="#000000"
      >
        Attendance Sheet
      </text>

      <text
        x="105"
        y={classY}
        textAnchor="middle"
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.className.size)}
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
        height={dateRowHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="0.3"
      />
      <text
        x={tableX + 3}
        y={dateRowY + 4.8}
        fontFamily={fontFam}
        fontSize={ptToMm(ATTENDANCE_TYPOGRAPHY.date.size)}
        fill="#000000"
      >
        <tspan fontWeight="bold">Date : </tspan>
        <tspan fontWeight="normal">{date || "—"}</tspan>
      </text>
    </g>
  );
}

export default AttendanceSheetHeader;
