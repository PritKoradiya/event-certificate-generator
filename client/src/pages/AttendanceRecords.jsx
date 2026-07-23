import { useEffect, useState } from "react";
import ModuleHeader from "../components/ui/ModuleHeader.jsx";
import AttendanceSheetSvgPreview from "../components/attendance/AttendanceSheetSvgPreview.jsx";
import {
  getAttendanceSheets,
  deleteAttendanceSheet
} from "../services/attendanceSheetApi.js";

const DEPARTMENTS = ["CE/IT", "CSE", "AIML", "ME", "EC", "CIVIL"];
const CLASSES = ["CE4", "CE6", "CSE2", "AIML1", "ME2", "EC2"];

function AttendanceRecords() {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterDept, setFilterDept] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // View modal state
  const [activeSheetModal, setActiveSheetModal] = useState(null);

  // Toast notice
  const [notice, setNotice] = useState("");

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 4000);
  };

  const loadSheets = async () => {
    setLoading(true);
    try {
      const res = await getAttendanceSheets();
      if (res && res.data) {
        setSheets(res.data);
      }
    } catch (e) {
      console.error("Failed to fetch attendance sheets", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSheets();
  }, []);

  const handleDelete = async (id, heading) => {
    if (window.confirm(`Are you sure you want to delete attendance record '${heading}'?`)) {
      try {
        await deleteAttendanceSheet(id);
        showNotice("Attendance sheet record deleted.");
        loadSheets();
      } catch (e) {
        showNotice("Failed to delete attendance sheet.");
      }
    }
  };

  const handleDownloadPdfNotice = () => {
    showNotice("Attendance PDF export will be added in the next step.");
  };

  const filteredSheets = sheets.filter((sheet) => {
    if (filterDept !== "All" && sheet.department.toLowerCase() !== filterDept.toLowerCase()) {
      return false;
    }
    if (filterClass !== "All" && sheet.className.toLowerCase() !== filterClass.toLowerCase()) {
      return false;
    }
    if (filterStatus !== "All" && sheet.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <section className="space-y-6 pb-12">
      {/* Top Header */}
      <ModuleHeader
        title="Attendance Records"
        subtitle="Search, filter, view, and manage saved class attendance sheets."
        theme="attendance"
        badge="Record Workspace"
        primaryAction={{
          label: "Create Attendance Sheet",
          to: "/create-attendance-sheet"
        }}
      />

      {/* Toast Notice */}
      {notice && (
        <div className="rounded-xl border border-teal-300 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800 shadow-md animate-hero-fade-in flex items-center gap-2">
          <span>ℹ️</span>
          <span>{notice}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
              Department
            </label>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-teal-500 focus:outline-none"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
              Class
            </label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-teal-500 focus:outline-none"
            >
              <option value="All">All Classes</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-teal-500 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Generated">Generated</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Total Saved Records: <strong className="text-teal-700">{filteredSheets.length}</strong>
        </div>
      </div>

      {/* Sheets Records Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 font-bold">
          Loading saved attendance records...
        </div>
      ) : filteredSheets.length === 0 ? (
        <div className="p-12 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
          <span className="text-4xl">📁</span>
          <h3 className="text-lg font-black text-slate-800">No attendance sheets found</h3>
          <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
            No saved attendance records match your filter. Create your first attendance sheet using the button below.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSheets.map((sheet) => (
            <div
              key={sheet.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    ID: {sheet.id}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                      sheet.status === "Generated"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {sheet.status}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-950 leading-snug line-clamp-2">
                  {sheet.heading || "Attendance Sheet"}
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Dept & Class</span>
                    <strong className="text-teal-700 font-bold">{sheet.department} - {sheet.className}</strong>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Date</span>
                    <strong className="text-slate-800 font-bold">{sheet.date || "—"}</strong>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Students</span>
                    <strong className="text-slate-800 font-bold">{sheet.studentCount || (sheet.students || []).length} Students</strong>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Pages</span>
                    <strong className="text-emerald-700 font-bold">{sheet.pageCount || Math.ceil((sheet.students || []).length / 39) || 1} Page(s)</strong>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-500 font-medium">
                  Coordinator: <strong className="text-slate-800">{sheet.eventCoordinatorName || "—"}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveSheetModal(sheet)}
                  className="flex-1 rounded-xl bg-teal-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition"
                >
                  View Preview
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdfNotice}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                  title="Download PDF"
                >
                  📥 PDF
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(sheet.id, sheet.heading)}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition"
                  title="Delete Record"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW ATTENDANCE PREVIEW MODAL */}
      {activeSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md overflow-y-auto animate-hero-fade-in">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-950 font-sans">
                  {activeSheetModal.heading || "Attendance Sheet"}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {activeSheetModal.department} • Class {activeSheetModal.className} • Date: {activeSheetModal.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdfNotice}
                  className="rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-teal-700 transition"
                >
                  Download PDF
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSheetModal(null)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Multipage SVG Preview */}
            <div className="py-2">
              <AttendanceSheetSvgPreview sheetData={activeSheetModal} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AttendanceRecords;
