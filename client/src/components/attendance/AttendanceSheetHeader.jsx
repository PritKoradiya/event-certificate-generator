import React from "react";

function AttendanceSheetHeader({ department = "", heading = "", className = "", date = "" }) {
  // Format department cleanly
  const formattedDepartment = department
    ? department.toLowerCase().includes("department")
      ? department
      : `${department} Department`
    : "Department";

  return (
    <g className="attendance-sheet-header">
      {/* Centered Plain Black Serif Header Text */}
      <text
        x="620"
        y="78"
        textAnchor="middle"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="26"
        fontWeight="bold"
        fill="#000000"
      >
        School of Engineering, PPSU
      </text>

      <text
        x="620"
        y="116"
        textAnchor="middle"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="21"
        fontWeight="bold"
        fill="#000000"
      >
        {formattedDepartment}
      </text>

      <text
        x="620"
        y="152"
        textAnchor="middle"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="21"
        fontWeight="bold"
        fill="#000000"
      >
        {heading || "Event Heading"}
      </text>

      <text
        x="620"
        y="188"
        textAnchor="middle"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="23"
        fontWeight="bold"
        fill="#000000"
      >
        Attendance Sheet
      </text>

      <text
        x="620"
        y="222"
        textAnchor="middle"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="19"
        fontWeight="bold"
        fill="#000000"
      >
        Class- {className || "—"}
      </text>

      {/* Bordered Date Row Box */}
      <rect
        x="100"
        y="246"
        width="1040"
        height="38"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="1.5"
      />
      <text
        x="115"
        y="271"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="16"
        fontWeight="bold"
        fill="#000000"
      >
        Date : <tspan fontWeight="normal">{date || "—"}</tspan>
      </text>
    </g>
  );
}

export default AttendanceSheetHeader;
