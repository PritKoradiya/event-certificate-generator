import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import EventReportPreview, { getAssetUrl } from "../components/EventReportPreview.jsx";
import { getEventReports, deleteEventReport, updateEventReport } from "../services/eventReportApi.js";
import { downloadEventReportPdf } from "../utils/downloadEventReportPdf.js";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100";

const textareaClass =
  "w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100 min-h-24 resize-y";

function EventReports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editReport, setEditReport] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [removedPhotos, setRemovedPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]); // Array of { file, preview }

  const photosRef = useRef(newPhotos);
  useEffect(() => {
    photosRef.current = newPhotos;
  }, [newPhotos]);

  useEffect(() => {
    return () => {
      // Clean up object URLs
      photosRef.current.forEach((p) => {
        if (p.preview.startsWith("blob:")) {
          URL.revokeObjectURL(p.preview);
        }
      });
    };
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const result = await getEventReports();
      const reportsList = result.data || [];
      setReports(reportsList);
      
      // If we already had a selected report, find it in the refreshed list to update it
      if (selectedReport) {
        const updated = reportsList.find(
          (r) => r._id === selectedReport._id || r.id === selectedReport.id
        );
        if (updated) {
          setSelectedReport(updated);
        } else {
          setSelectedReport(reportsList[0] || null);
        }
      } else if (reportsList.length > 0) {
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

  // Edit Click Handler
  const handleEditClick = (report) => {
    setEditReport(report);
    setEditFormData({
      reportDate: report.reportDate || "",
      dateOfEvent: report.eventDate || report.dateOfEvent || "",
      time: report.eventTime || report.time || "",
      resourcePerson: report.resourcePerson || "",
      eventName: report.eventName || "",
      noOfParticipants: report.numberOfParticipants || report.noOfParticipants || "",
      attendee: report.attendee || "",
      venue: report.venue || "",
      eventOutline: report.eventOutline || "",
      objectives: Array.isArray(report.eventObjectives)
        ? report.eventObjectives.join("\n")
        : report.objectives || "",
      outcomes: Array.isArray(report.eventOutcomes)
        ? report.eventOutcomes.join("\n")
        : report.outcomes || "",
      photoCaption: report.photoCaption || "",
      eventCoordinator: report.eventCoordinatorName || report.eventCoordinator || "DR. JAYSHRI A. PATIL",
      deanName: report.deanName || "DR. NIRAJ SHAH",
      status: report.status || "Generated"
    });
    setExistingPhotos(report.photos || []);
    setRemovedPhotos([]);
    setNewPhotos([]);
    setIsEditing(true);
  };

  // Edit Photo Handlers
  const handleEditPhotoChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingOldCount = existingPhotos.length - removedPhotos.length;
    const currentTotal = remainingOldCount + newPhotos.length;

    if (currentTotal + files.length > 4) {
      alert("You can have a maximum of 4 photos in total.");
      return;
    }

    const added = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setNewPhotos((prev) => [...prev, ...added]);
    e.target.value = "";
  };

  const handleRemoveExistingPhoto = (photoPath) => {
    setRemovedPhotos((prev) => [...prev, photoPath]);
  };

  const handleRestoreExistingPhoto = (photoPath) => {
    setRemovedPhotos((prev) => prev.filter((p) => p !== photoPath));
  };

  const handleRemoveNewPhoto = (index) => {
    setNewPhotos((prev) => {
      const updated = [...prev];
      if (updated[index].preview.startsWith("blob:")) {
        URL.revokeObjectURL(updated[index].preview);
      }
      updated.splice(index, 1);
      return updated;
    });
  };

  // Save Edit Handler
  const handleSaveEdit = async () => {
    const requiredFields = [
      { key: "reportDate", label: "Report Date" },
      { key: "dateOfEvent", label: "Date of Event" },
      { key: "time", label: "Time" },
      { key: "resourcePerson", label: "Resource Person" },
      { key: "eventName", label: "Name of the Event" },
      { key: "noOfParticipants", label: "No. of Participants" },
      { key: "attendee", label: "Attendee" },
      { key: "venue", label: "Venue" },
      { key: "eventOutline", label: "Event Outline" },
      { key: "objectives", label: "Objectives" },
      { key: "outcomes", label: "Outcomes" },
      { key: "eventCoordinator", label: "Event Coordinator Name" },
      { key: "deanName", label: "Dean Name" }
    ];

    // Only validate required fields if the status is not Draft
    if (editFormData.status !== "Draft") {
      const missingFields = requiredFields
        .filter((field) => !editFormData[field.key] || !String(editFormData[field.key]).trim())
        .map((field) => field.label);

      if (missingFields.length > 0) {
        alert(`Please fill the following required fields:\n- ${missingFields.join("\n- ")}`);
        return;
      }
    }

    try {
      setIsSavingEdit(true);
      const data = new FormData();
      data.append("reportDate", editFormData.reportDate);
      data.append("eventDate", editFormData.dateOfEvent);
      data.append("eventTime", editFormData.time);
      data.append("resourcePerson", editFormData.resourcePerson);
      data.append("eventName", editFormData.eventName);
      data.append("numberOfParticipants", editFormData.noOfParticipants);
      data.append("attendee", editFormData.attendee);
      data.append("venue", editFormData.venue);
      data.append("eventOutline", editFormData.eventOutline);
      data.append("photoCaption", editFormData.photoCaption);
      data.append("eventCoordinatorName", editFormData.eventCoordinator);
      data.append("deanName", editFormData.deanName);
      data.append("status", editFormData.status);

      // Photos to remove
      data.append("removePhotos", JSON.stringify(removedPhotos));

      // Append new photo files
      newPhotos.forEach((photoObj) => {
        data.append("photos", photoObj.file);
      });

      // Split and append objectives
      const objectivesArray = String(editFormData.objectives)
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      objectivesArray.forEach((obj) => {
        data.append("eventObjectives", obj);
      });

      // Split and append outcomes
      const outcomesArray = String(editFormData.outcomes)
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      outcomesArray.forEach((out) => {
        data.append("eventOutcomes", out);
      });

      const response = await updateEventReport(editReport._id || editReport.id, data);
      alert(response.message || "Event report updated successfully.");

      // Clean up object URLs
      newPhotos.forEach((p) => {
        if (p.preview.startsWith("blob:")) {
          URL.revokeObjectURL(p.preview);
        }
      });

      setIsEditing(false);
      setEditReport(null);
      await fetchReports();
    } catch (error) {
      alert(error.message || "Unable to update event report. Please try again.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // PDF Export
  const handleDownloadPdf = (report) => {
    const reportId = report.reportId || report._id || report.id;
    const fileName = `Event_Report_${report.eventName}_${reportId}.pdf`;
    
    // If already rendered below, download instantly
    if (selectedReport && (selectedReport._id === report._id || selectedReport.id === report.id)) {
      downloadEventReportPdf(fileName);
    } else {
      setSelectedReport(report);
      setTimeout(() => {
        downloadEventReportPdf(fileName);
      }, 500);
    }
  };

  // Delete Action
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

  // Client-side filtering of reports
  const filteredReports = reports.filter((report) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      report.eventName?.toLowerCase().includes(query) ||
      report.resourcePerson?.toLowerCase().includes(query) ||
      report.venue?.toLowerCase().includes(query) ||
      (report.reportId || report._id || "").toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" ||
      report.status?.toLowerCase() === statusFilter.toLowerCase();

    const eventDateStr = report.eventDate || report.dateOfEvent || "";
    const matchesDate = !dateFilter || eventDateStr === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <section className="page-transition space-y-7">
      {/* Page Header */}
      <div className="fade-in rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-7 shadow-soft lg:p-9">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Report Explorer</p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950 font-sans">Event Report Records</h2>
        <p className="mt-2 max-w-4xl text-lg leading-8 text-slate-600 font-sans">
          View, edit, delete, and export structured event reports.
        </p>
      </div>

      {/* Error Alert */}
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

      {/* Filters Panel */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          Search Records
          <input
            type="text"
            placeholder="Search by event, speaker, venue, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
          />
        </label>
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          Status
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Generated">Generated</option>
            <option value="Draft">Draft</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:col-span-2 md:col-span-1">
          Event Date (Optional)
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="flex h-60 items-center justify-center rounded-3xl border border-slate-100 bg-white shadow-soft">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600" />
            <p className="text-base font-bold text-slate-500">Loading event reports...</p>
          </div>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-soft">
          <span className="text-5xl mb-4">📋</span>
          <h3 className="text-xl font-black text-slate-950 font-sans">No Records Found</h3>
          <p className="mt-2 max-w-md text-base leading-6 text-slate-600 font-sans">
            No event reports match your search query or status criteria.
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
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase tracking-wider text-slate-400">
                    <th className="p-4 sm:p-5">Event Name</th>
                    <th className="p-4 sm:p-5">Event Date</th>
                    <th className="p-4 sm:p-5">Resource Person</th>
                    <th className="p-4 sm:p-5">Venue</th>
                    <th className="p-4 sm:p-5">No. of Participants</th>
                    <th className="p-4 sm:p-5">Report ID</th>
                    <th className="p-4 sm:p-5">Status</th>
                    <th className="p-4 sm:p-5">Created Date</th>
                    <th className="p-4 sm:p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReports.map((report) => {
                    const reportId = report.reportId || report._id || report.id;
                    const isSelected = selectedReport && (selectedReport._id === report._id || selectedReport.id === report.id);
                    return (
                      <tr
                        key={report._id || report.id}
                        className={`hover:bg-blue-50/20 transition ${
                          isSelected ? "bg-blue-50/40 font-semibold" : ""
                        }`}
                      >
                        <td className="p-4 sm:p-5 font-bold text-slate-900 min-w-[180px]">
                          {report.eventName}
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600 whitespace-nowrap">
                          {report.eventDate || report.dateOfEvent}
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600 min-w-[150px]">
                          {report.resourcePerson}
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600 whitespace-nowrap">
                          {report.venue}
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600 text-center">
                          {report.numberOfParticipants || report.noOfParticipants}
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
                              onClick={() => handleEditClick(report)}
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

          {/* Selected Report Details Card & Live Preview Container */}
          {selectedReport && (
            <div id="report-preview-section" className="slide-up rounded-3xl border border-blue-100 bg-slate-50 p-6 shadow-xl space-y-6">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Event Report Details</p>
                  <h3 className="mt-1 text-2xl font-black text-slate-950 font-sans">
                    {selectedReport.eventName}
                  </h3>
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

              {/* View Details Card */}
              <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-soft grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Report Date</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.reportDate}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Date of Event</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.eventDate || selectedReport.dateOfEvent}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.eventTime || selectedReport.time}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Resource Person</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.resourcePerson}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Event Name</span>
                  <span className="text-sm font-bold text-primary-700">{selectedReport.eventName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">No. of Participants</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.numberOfParticipants || selectedReport.noOfParticipants}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Attendee</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.attendee}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Venue</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.venue}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Coordinator</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.eventCoordinatorName || selectedReport.eventCoordinator}</span>
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dean</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReport.deanName}</span>
                </div>
              </div>

              <div className="mx-auto w-full flex justify-center">
                <EventReportPreview data={selectedReport} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-950">Edit Event Report</h3>
                <p className="text-xs text-slate-500 font-medium">Modify report metadata and upload photos.</p>
              </div>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditReport(null);
                  newPhotos.forEach((p) => {
                    if (p.preview.startsWith("blob:")) {
                      URL.revokeObjectURL(p.preview);
                    }
                  });
                }}
                className="text-slate-400 hover:text-slate-600 transition text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Report Date *
                  <input
                    className={inputClass}
                    type="date"
                    value={editFormData.reportDate}
                    onChange={(e) => setEditFormData({ ...editFormData, reportDate: e.target.value })}
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Date of Event *
                  <input
                    className={inputClass}
                    type="date"
                    value={editFormData.dateOfEvent}
                    onChange={(e) => setEditFormData({ ...editFormData, dateOfEvent: e.target.value })}
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Time *
                  <input
                    className={inputClass}
                    type="text"
                    value={editFormData.time}
                    onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                    placeholder="e.g. 10:00 AM to 1:00 PM"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Resource Person *
                  <input
                    className={inputClass}
                    type="text"
                    value={editFormData.resourcePerson}
                    onChange={(e) => setEditFormData({ ...editFormData, resourcePerson: e.target.value })}
                    placeholder="Speaker details"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700 md:col-span-2 xl:col-span-1">
                  Name of the Event *
                  <input
                    className={inputClass}
                    type="text"
                    value={editFormData.eventName}
                    onChange={(e) => setEditFormData({ ...editFormData, eventName: e.target.value })}
                    placeholder="Event title"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  No. of Participants *
                  <input
                    className={inputClass}
                    type="number"
                    value={editFormData.noOfParticipants}
                    onChange={(e) => setEditFormData({ ...editFormData, noOfParticipants: e.target.value })}
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Attendee *
                  <input
                    className={inputClass}
                    type="text"
                    value={editFormData.attendee}
                    onChange={(e) => setEditFormData({ ...editFormData, attendee: e.target.value })}
                    placeholder="Target audience"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Venue *
                  <input
                    className={inputClass}
                    type="text"
                    value={editFormData.venue}
                    onChange={(e) => setEditFormData({ ...editFormData, venue: e.target.value })}
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Status *
                  <select
                    className={inputClass}
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  >
                    <option value="Generated">Generated</option>
                    <option value="Draft">Draft</option>
                  </select>
                </label>
              </div>

              {/* Textareas */}
              <div className="space-y-4">
                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Event Outline *
                  <textarea
                    className={textareaClass}
                    value={editFormData.eventOutline}
                    onChange={(e) => setEditFormData({ ...editFormData, eventOutline: e.target.value })}
                    placeholder="Enter outline summary..."
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Objectives of the Event * (one objective per line)
                  <textarea
                    className={textareaClass}
                    value={editFormData.objectives}
                    onChange={(e) => setEditFormData({ ...editFormData, objectives: e.target.value })}
                    placeholder="Enter objectives..."
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Outcomes of the Event * (one outcome per line)
                  <textarea
                    className={textareaClass}
                    value={editFormData.outcomes}
                    onChange={(e) => setEditFormData({ ...editFormData, outcomes: e.target.value })}
                    placeholder="Enter outcomes..."
                  />
                </label>
              </div>

              {/* Photo Upload and caption */}
              <div className="border-t border-slate-100 pt-5 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Manage Event Photos</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                    Photo Caption
                    <input
                      className={inputClass}
                      type="text"
                      value={editFormData.photoCaption}
                      onChange={(e) => setEditFormData({ ...editFormData, photoCaption: e.target.value })}
                      placeholder="Caption below photos"
                    />
                  </label>

                  <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 transition hover:bg-slate-50">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Add New Photos</label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer rounded-lg bg-primary-600 hover:bg-primary-700 px-3 py-1.5 text-xs font-bold text-white transition shadow-sm inline-block">
                        Choose files
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleEditPhotoChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-slate-500">
                        {(existingPhotos.length - removedPhotos.length) + newPhotos.length}/4 total photos selected
                      </span>
                    </div>
                  </div>
                </div>

                {/* Photo Thumbnails Display */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Saved photos */}
                  {existingPhotos.map((photoPath, index) => {
                    const isRemoved = removedPhotos.includes(photoPath);
                    return (
                      <div
                        key={`existing-${index}`}
                        className={`relative rounded-xl overflow-hidden border aspect-square bg-slate-100 shadow-soft transition duration-150 ${
                          isRemoved ? "opacity-35 border-rose-300" : "border-slate-200"
                        }`}
                      >
                        <img
                          src={getAssetUrl(photoPath)}
                          className="w-full h-full object-cover"
                          alt={`Existing ${index + 1}`}
                        />
                        {isRemoved ? (
                          <div className="absolute inset-0 bg-rose-50/10 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => handleRestoreExistingPhoto(photoPath)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow"
                            >
                              Keep Photo
                            </button>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/45 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveExistingPhoto(photoPath)}
                              className="rounded-full bg-rose-600 p-2 text-white hover:bg-rose-700 transition"
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded font-sans uppercase">
                          Saved
                        </span>
                      </div>
                    );
                  })}

                  {/* New uploaded photos */}
                  {newPhotos.map((photo, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative rounded-xl overflow-hidden border border-primary-200 aspect-square bg-slate-50 shadow-soft"
                    >
                      <img
                        src={photo.preview}
                        className="w-full h-full object-cover"
                        alt={`New ${index + 1}`}
                      />
                      <div className="absolute inset-0 bg-black/45 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveNewPhoto(index)}
                          className="rounded-full bg-rose-600 p-2 text-white hover:bg-rose-700 transition"
                        >
                          🗑️
                        </button>
                      </div>
                      <span className="absolute bottom-2 left-2 bg-primary-600 text-white text-[9px] font-bold px-2 py-0.5 rounded font-sans uppercase">
                        New
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signatures */}
              <div className="border-t border-slate-100 pt-5 grid gap-4 md:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Event Coordinator Name *
                  <input
                    className={inputClass}
                    type="text"
                    value={editFormData.eventCoordinator}
                    onChange={(e) => setEditFormData({ ...editFormData, eventCoordinator: e.target.value })}
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                  Dean Name *
                  <input
                    className={inputClass}
                    type="text"
                    value={editFormData.deanName}
                    onChange={(e) => setEditFormData({ ...editFormData, deanName: e.target.value })}
                  />
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditReport(null);
                  newPhotos.forEach((p) => {
                    if (p.preview.startsWith("blob:")) {
                      URL.revokeObjectURL(p.preview);
                    }
                  });
                }}
                className="button-press w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={isSavingEdit}
                className="button-press w-full rounded-xl bg-primary-600 hover:bg-primary-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition disabled:opacity-75 disabled:cursor-not-allowed sm:w-auto"
              >
                {isSavingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventReports;
