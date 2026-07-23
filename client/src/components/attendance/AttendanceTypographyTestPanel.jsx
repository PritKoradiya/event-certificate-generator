import React from "react";
import { ATTENDANCE_LAYOUT, ATTENDANCE_TYPOGRAPHY } from "../../config/attendanceSheetLayout.js";

const generateTestStudents = (count, nameOverride = null) => {
  return Array.from({ length: count }, (_, i) => {
    const num = (i + 1).toString().padStart(3, "0");
    return {
      id: `test_stud_${num}`,
      enrollmentNo: `24SE02CE${num}`,
      studentName:
        nameOverride ||
        `STUDENT FULL TEST NAME VERY LONG SURNAME ${num} SHAILESHBHAI`,
      department: "CE/IT",
      className: "CE4"
    };
  });
};

function AttendanceTypographyTestPanel({ onLoadTestScenario, onTriggerDirectPdf }) {
  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  const scenarios = [
    { label: "1 Student", count: 1 },
    { label: "39 Students (1 Full Pg)", count: 39 },
    { label: "40 Students (2 Pgs)", count: 40 },
    { label: "45 Students (Reference)", count: 45 },
    { label: "78 Students (2 Full Pgs)", count: 78 }
  ];

  const handleScenarioClick = (count) => {
    onLoadTestScenario({
      department: "CE/IT",
      className: "CE4",
      heading: "Expert Talk - Prompt Engineering & Generative AI",
      students: generateTestStudents(count)
    });
  };

  const handleLongNamesClick = () => {
    const longStudents = [
      {
        id: "l1",
        enrollmentNo: "24SE02CE001",
        studentName: "DELVADIYA RAVIKUMAR SHAILESHBHAI HARSHADBHAI PRAVINCHANDRA",
        department: "CE/IT",
        className: "CE4"
      },
      {
        id: "l2",
        enrollmentNo: "24SE02CE002",
        studentName: "BHATT CHANDRASHEKHAR KANAIYALAL PURUSHOTTAMBHAI GAURANG",
        department: "CE/IT",
        className: "CE4"
      },
      ...generateTestStudents(43)
    ];

    onLoadTestScenario({
      department: "CE/IT",
      className: "CE4",
      heading: "Expert Talk - Advanced Text Fitting Test",
      students: longStudents
    });
  };

  const handleLongHeadingClick = () => {
    onLoadTestScenario({
      department: "CE/IT",
      className: "CE4",
      heading: "International Workshop on Advanced Quantum Computing, Generative AI Models, and Autonomous Software Systems Architecture",
      students: generateTestStudents(45)
    });
  };

  const handleDownloadTestPdf = () => {
    const testSheet = {
      id: "TEST-VECTOR-PDF",
      schoolName: "School of Engineering, PPSU",
      department: "CE/IT",
      heading: "Expert Talk - Vector PDF Calibration Test",
      className: "CE4",
      date: "23/07/2026",
      eventCoordinatorName: "Dr. Jayshri Patil",
      students: generateTestStudents(45)
    };
    onTriggerDirectPdf(testSheet);
  };

  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 shadow-md max-w-5xl mx-auto space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-600 text-white font-black text-xs">
            🛠️
          </span>
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 font-sans">
            DEV ONLY: Attendance Calibration Test Panel
          </h4>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-amber-800">
          <span>Rows/Pg: <strong>{ATTENDANCE_LAYOUT.rowsPerPage}</strong></span>
          <span>RowHeight: <strong>{ATTENDANCE_LAYOUT.rowHeight}mm</strong></span>
          <span>TableWidth: <strong>{ATTENDANCE_LAYOUT.tableWidth}mm</strong></span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        {scenarios.map((sc) => (
          <button
            key={sc.label}
            type="button"
            onClick={() => handleScenarioClick(sc.count)}
            className="rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-amber-900 hover:bg-amber-100 transition shadow-sm"
          >
            {sc.label}
          </button>
        ))}

        <button
          type="button"
          onClick={handleLongNamesClick}
          className="rounded-xl border border-purple-300 bg-purple-100 text-purple-900 px-3 py-1.5 hover:bg-purple-200 transition shadow-sm"
        >
          Long Names
        </button>

        <button
          type="button"
          onClick={handleLongHeadingClick}
          className="rounded-xl border border-blue-300 bg-blue-100 text-blue-900 px-3 py-1.5 hover:bg-blue-200 transition shadow-sm"
        >
          Long Heading
        </button>

        <button
          type="button"
          onClick={handleDownloadTestPdf}
          className="ml-auto rounded-xl bg-amber-700 px-4 py-1.5 text-white font-black hover:bg-amber-800 transition shadow-md"
        >
          📥 Test Vector PDF
        </button>
      </div>
    </div>
  );
}

export default AttendanceTypographyTestPanel;
