import React from "react";
import AttendanceSheetSvgPage from "./AttendanceSheetSvgPage.jsx";

const ROWS_PER_PAGE = 39;

function AttendanceSheetSvgPreview({ sheetData = {} }) {
  const {
    department = "",
    heading = "",
    className = "",
    date = "",
    eventCoordinatorName = "",
    students = []
  } = sheetData;

  // Split students into chunks of 39
  const studentChunks = [];
  if (students.length === 0) {
    studentChunks.push([]);
  } else {
    for (let i = 0; i < students.length; i += ROWS_PER_PAGE) {
      studentChunks.push(students.slice(i, i + ROWS_PER_PAGE));
    }
  }

  const totalPages = studentChunks.length;

  return (
    <div className="w-full space-y-8 max-w-[880px] mx-auto">
      {/* Live Preview Header & Summary Info Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-teal-200/80 bg-teal-50/60 p-4 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-black text-slate-900 font-sans">
              Attendance Sheet Live Multipage Preview
            </h3>
          </div>
          <p className="text-xs font-medium text-slate-600 mt-0.5">
            The document automatically creates additional pages based on student count (39 students per full page).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-teal-800">
          <span className="rounded-lg bg-teal-100/80 px-2.5 py-1 border border-teal-200">
            {students.length} Students
          </span>
          <span className="rounded-lg bg-emerald-100/80 px-2.5 py-1 text-emerald-800 border border-emerald-200">
            {totalPages} {totalPages === 1 ? "Page" : "Pages"}
          </span>
          <span className="rounded-lg bg-cyan-100/80 px-2.5 py-1 text-cyan-800 border border-cyan-200">
            Class: {className || "—"}
          </span>
        </div>
      </div>

      {/* Pages Vertical List */}
      <div className="space-y-10">
        {studentChunks.map((chunk, pageIndex) => {
          const startSrNo = pageIndex * ROWS_PER_PAGE + 1;
          const isLastPage = pageIndex === totalPages - 1;

          return (
            <div key={pageIndex} className="relative group">
              {/* Page Indicator Tag outside document */}
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono">
                  Page {pageIndex + 1} of {totalPages}
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  Rows {startSrNo} – {startSrNo + chunk.length - 1 || startSrNo}
                </span>
              </div>

              {/* Document Page Canvas Box */}
              <div className="shadow-2xl rounded-lg overflow-hidden border border-slate-300 bg-white">
                <AttendanceSheetSvgPage
                  department={department}
                  heading={heading}
                  className={className}
                  date={date}
                  eventCoordinatorName={eventCoordinatorName}
                  studentsChunk={chunk}
                  startSrNo={startSrNo}
                  isLastPage={isLastPage}
                  pageIndex={pageIndex}
                  totalPages={totalPages}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttendanceSheetSvgPreview;
