import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventReportPreview from "../components/EventReportPreview.jsx";
import { getEventReports, deleteEventReport } from "../services/eventReportApi.js";
import { downloadEventReportPdf } from "../utils/downloadEventReportPdf.js";

function EventReports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const result = await getEventReports();
      const reportsList = result.data || [];
      setReports(reportsList);
      if (reportsList.length > 0) {
        setSelectedReport(reportsList[0]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.message || "Unable to fetch event reports. Please check if the server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleView = (report) => {
    setSelectedReport(report);
    // Smooth scroll to the preview section
    const previewEl = document.getElementById("report-preview-section");
    if (previewEl) {
      previewEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEdit = (report) => {
    alert("Edit functionality will be added in next step.");
  };

  const handleDownloadPdf = (report) => {
    const reportId = report.reportId || report._id || report.id;
    const fileName = `Event_Report_${report.eventName}_${reportId}.pdf`;
    
    // If this report is already selected, it is rendered in the DOM, so download it immediately
    if (selectedReport && (selectedReport._id === report._id || selectedReport.id === report.id)) {
      downloadEventReportPdf(fileName);
    } else {
      // If it's not selected, select it first so it mounts/updates, then download
      setSelectedReport(report);
      setTimeout(() => {
        downloadEventReportPdf(fileName);
      }, 500);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event report?")) {
      return;
    }

    try {
      await deleteEventReport(id);
      alert("Event report deleted successfully.");
      if (selectedReport && (selectedReport._id === id || selectedReport.id === id)) {
        setSelectedReport(null);
      }
      fetchReports();
    } catch (error) {
      alert(error.message || "Failed to delete event report. Please try again.");
    }
  };

  return (
    <section className="page-transition space-y-7">
      {/* Page Header */}
      <div className="fade-in rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-7 shadow-soft lg:p-9">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Report Explorer</p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950 font-sans">Event Reports</h2>
        <p className="mt-2 max-w-4xl text-lg leading-8 text-slate-600 font-sans">
          Browse, review, and manage saved event reports and drafts.
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5 text-sm font-bold text-rose-700">
          <p className="flex items-center gap-2">
            <span>⚠️</span> {errorMessage}
          </p>
          <button
            onClick={fetchReports}
            className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 transition"
          >
            Retry Fetching
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex h-60 items-center justify-center rounded-3xl border border-slate-100 bg-white shadow-soft">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600" />
            <p className="text-base font-bold text-slate-500">Loading event reports...</p>
          </div>
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-soft">
          <span className="text-5xl mb-4">📋</span>
          <h3 className="text-xl font-black text-slate-950 font-sans">No Event Reports Found</h3>
          <p className="mt-2 max-w-md text-base leading-6 text-slate-600 font-sans">
            You haven't generated any event reports yet. Head over to the Report Builder to create one!
          </p>
          <Link
            to="/create-event-report"
            className="mt-6 button-press soft-hover inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-primary-700"
          >
            Create Event Report
          </Link>
        </div>
      ) : (
        <div className="space-y-7">
          {/* Reports Table Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-950 font-sans">Saved Event Reports</h3>
              <p className="text-sm text-slate-500 font-sans">Select "View" to preview the full document below.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase tracking-wider text-slate-400">
                    <th className="p-4 sm:p-5">Event Name</th>
                    <th className="p-4 sm:p-5">Date of Event</th>
                    <th className="p-4 sm:p-5">Resource Person</th>
                    <th className="p-4 sm:p-5">Venue</th>
                    <th className="p-4 sm:p-5">Report ID</th>
                    <th className="p-4 sm:p-5">Status</th>
                    <th className="p-4 sm:p-5">Created Date</th>
                    <th className="p-4 sm:p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report) => {
                    const reportId = report.reportId || report._id || report.id;
                    const isSelected = selectedReport && (selectedReport._id === report._id || selectedReport.id === report.id);
                    return (
                      <tr
                        key={report._id || report.id}
                        className={`hover:bg-blue-50/20 transition ${
                          isSelected ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <td className="p-4 sm:p-5 font-bold text-slate-900 min-w-[200px]">
                          {report.eventName}
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600 whitespace-nowrap">
                          {report.dateOfEvent || report.eventDate}
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600 min-w-[150px]">
                          {report.resourcePerson}
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600 whitespace-nowrap">
                          {report.venue}
                        </td>
                        <td className="p-4 sm:p-5 text-slate-500 font-mono text-xs whitespace-nowrap">
                          {reportId}
                        </td>
                        <td className="p-4 sm:p-5 whitespace-nowrap">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                              report.status === "draft" || report.status === "Draft"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="p-4 sm:p-5 text-slate-500 whitespace-nowrap">
                          {new Date(report.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="p-4 sm:p-5 text-right whitespace-nowrap">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => handleView(report)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                isSelected
                                  ? "bg-primary-600 text-white"
                                  : "bg-blue-50 text-primary-700 hover:bg-blue-100"
                              }`}
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(report)}
                              className="px-3 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDownloadPdf(report)}
                              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition"
                            >
                              Download PDF
                            </button>
                            <button
                              onClick={() => handleDelete(report._id || report.id)}
                              className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Report Preview below the list */}
          {selectedReport && (
            <div id="report-preview-section" className="slide-up rounded-3xl border border-blue-100 bg-slate-50 p-6 shadow-xl">
              <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Event Report Preview</p>
                  <h3 className="mt-1 text-2xl font-black text-slate-950 font-sans">
                    Previewing: {selectedReport.eventName}
                  </h3>
                  <p className="mt-1 text-base leading-7 text-slate-600 font-sans">
                    Detailed layout display for the selected record.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <button
                    onClick={() => handleDownloadPdf(selectedReport)}
                    className="button-press soft-hover px-4 py-2 bg-emerald-600 hover:bg-emerald-750 text-white font-bold text-sm shadow-sm transition rounded-xl"
                  >
                    Download Report PDF
                  </button>
                  <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-primary-700">
                    Status: {selectedReport.status?.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="mx-auto w-full flex justify-center">
                <EventReportPreview data={selectedReport} />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default EventReports;
