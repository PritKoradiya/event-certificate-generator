import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EventReportPreview from "../components/EventReportPreview.jsx";
import { createEventReport, saveDraftEventReport } from "../services/eventReportApi.js";
import { downloadEventReportPdf } from "../utils/downloadEventReportPdf.js";

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-semibold outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100";

const textareaClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm font-semibold outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100 min-h-28 resize-y";

const initialFormData = {
  reportDate: "",
  dateOfEvent: "",
  time: "",
  resourcePerson: "",
  eventName: "",
  noOfParticipants: "",
  attendee: "",
  venue: "",
  eventOutline: "",
  objectives: "",
  outcomes: "",
  photoCaption: "",
  eventCoordinator: "DR. JAYSHRI A. PATIL",
  deanName: "DR. NIRAJ SHAH"
};

function CreateEventReport() {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedPhotos, setSelectedPhotos] = useState([]); // Array of { file, preview }
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  // Store photo references for unmount cleanup
  const photosRef = useRef(selectedPhotos);
  useEffect(() => {
    photosRef.current = selectedPhotos;
  }, [selectedPhotos]);

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => {
        if (photo.preview.startsWith("blob:")) {
          URL.revokeObjectURL(photo.preview);
        }
      });
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
    if (generatedReport) {
      setGeneratedReport(null);
    }
  };

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (selectedPhotos.length + files.length > 4) {
      alert("You can upload a maximum of 4 photos.");
      return;
    }

    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setSelectedPhotos((prev) => [...prev, ...newPhotos]);
    if (generatedReport) {
      setGeneratedReport(null);
    }

    event.target.value = "";
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos((prev) => {
      const updated = [...prev];
      if (updated[index].preview.startsWith("blob:")) {
        URL.revokeObjectURL(updated[index].preview);
      }
      updated.splice(index, 1);
      return updated;
    });
    if (generatedReport) {
      setGeneratedReport(null);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      selectedPhotos.forEach((photo) => {
        if (photo.preview.startsWith("blob:")) {
          URL.revokeObjectURL(photo.preview);
        }
      });
      setSelectedPhotos([]);
      setFormData(initialFormData);
      setGeneratedReport(null);
    }
  };

  const validateForm = () => {
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

    const missingFields = requiredFields
      .filter((field) => !formData[field.key] || !formData[field.key].trim())
      .map((field) => field.label);

    if (missingFields.length > 0) {
      alert(`Please fill the following required fields:\n- ${missingFields.join("\n- ")}`);
      return false;
    }

    return true;
  };

  const buildReportFormData = () => {
    const data = new FormData();
    data.append("reportDate", formData.reportDate);
    data.append("eventDate", formData.dateOfEvent);
    data.append("eventTime", formData.time);
    data.append("resourcePerson", formData.resourcePerson);
    data.append("eventName", formData.eventName);
    data.append("numberOfParticipants", formData.noOfParticipants);
    data.append("attendee", formData.attendee);
    data.append("venue", formData.venue);
    data.append("eventOutline", formData.eventOutline);
    data.append("photoCaption", formData.photoCaption);
    data.append("eventCoordinatorName", formData.eventCoordinator);
    data.append("deanName", formData.deanName);

    const objectivesArray = formData.objectives
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    objectivesArray.forEach((obj) => {
      data.append("eventObjectives", obj);
    });

    const outcomesArray = formData.outcomes
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    outcomesArray.forEach((out) => {
      data.append("eventOutcomes", out);
    });

    selectedPhotos.forEach((photoObj) => {
      data.append("photos", photoObj.file);
    });

    return data;
  };

  const handleSaveDraft = async () => {
    try {
      setIsSavingDraft(true);
      const data = buildReportFormData();
      const result = await saveDraftEventReport(data);
      alert(result.message || "Draft event report saved successfully.");
    } catch (error) {
      alert(error.message || "Unable to save draft. Please try again.");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsGenerating(true);
      const data = buildReportFormData();
      const result = await createEventReport(data);
      const report = result.data;
      setGeneratedReport(report);
      alert("Report generated successfully. PDF download will start automatically.");
      
      const fileName = `Event_Report_${report.eventName}_${report.reportId}.pdf`;
      setTimeout(() => downloadEventReportPdf(fileName), 500);
    } catch (error) {
      alert(error.message || "Unable to generate event report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualDownload = () => {
    if (generatedReport) {
      const fileName = `Event_Report_${generatedReport.eventName}_${generatedReport.reportId}.pdf`;
      downloadEventReportPdf(fileName);
    }
  };

  return (
    <section className="space-y-8 pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        <Link to="/report-dashboard" className="hover:text-purple-600 transition">
          Report Studio
        </Link>
        <span>/</span>
        <span className="text-slate-800">Create Event Report</span>
      </nav>

      {/* Page Hero */}
      <div className="rounded-3xl border border-purple-100/80 bg-gradient-to-br from-purple-50/60 via-white to-pink-50/40 p-7 shadow-xs lg:p-9 animate-hero-fade-in">
        <span className="text-xs font-black uppercase tracking-widest text-purple-600">
          REPORT DOCUMENT EDITOR
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-sans">
          Create Event Report
        </h1>
        <p className="mt-2 max-w-3xl text-base text-slate-600 font-medium leading-relaxed">
          Fill in event administration details, outline, objectives, learning outcomes, and attach photos to format an A4 academic report.
        </p>
      </div>

      {/* Editor Form Container */}
      <form
        className="rounded-3xl border border-slate-200/90 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-8"
        onSubmit={(event) => event.preventDefault()}
      >
        {/* Section 1: Basic Administrative Details */}
        <div>
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600 text-sm font-black">
              1
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-950 font-sans">Basic Administrative Details</h3>
              <p className="text-xs text-slate-500 font-semibold font-sans">Date, time, speaker, venue, and attendee numbers</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Report Date *
              <input
                className={inputClass}
                type="date"
                name="reportDate"
                value={formData.reportDate}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Date of Event *
              <input
                className={inputClass}
                type="date"
                name="dateOfEvent"
                value={formData.dateOfEvent}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Time *
              <input
                className={inputClass}
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g. 10:00 AM to 1:00 PM"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Resource Person / Speaker *
              <input
                className={inputClass}
                type="text"
                name="resourcePerson"
                value={formData.resourcePerson}
                onChange={handleChange}
                placeholder="Name, Designation, Company"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 md:col-span-2 xl:col-span-1">
              Name of the Event *
              <input
                className={inputClass}
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                placeholder="e.g. Seminar on AI & Machine Learning"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              No. of Participants *
              <input
                className={inputClass}
                type="number"
                name="noOfParticipants"
                value={formData.noOfParticipants}
                onChange={handleChange}
                placeholder="e.g. 50"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Attendee / Target Group *
              <input
                className={inputClass}
                type="text"
                name="attendee"
                value={formData.attendee}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Engineering Students"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 md:col-span-2 xl:col-span-2">
              Venue *
              <input
                className={inputClass}
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="e.g. Seminar Hall, SOE, PP Savani University"
              />
            </label>
          </div>
        </div>

        {/* Section 2: Report Content & Objectives */}
        <div>
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-600 text-sm font-black">
              2
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-950 font-sans">Report Narrative Content</h3>
              <p className="text-xs text-slate-500 font-semibold font-sans">Detailed outline, objectives, and outcomes (one per line)</p>
            </div>
          </div>

          <div className="grid gap-5">
            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Event Outline *
              <textarea
                className={textareaClass}
                name="eventOutline"
                value={formData.eventOutline}
                onChange={handleChange}
                placeholder="Enter a comprehensive summary and background outline of the event session..."
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Objectives of the Event * (enter one objective per line)
              <textarea
                className={textareaClass}
                name="objectives"
                value={formData.objectives}
                onChange={handleChange}
                placeholder={"1. To introduce students to core AI concepts.\n2. To demonstrate real-world industry tools."}
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Outcomes of the Event * (enter one outcome per line)
              <textarea
                className={textareaClass}
                name="outcomes"
                value={formData.outcomes}
                onChange={handleChange}
                placeholder={"1. Students learned practical workflow skills.\n2. Participants created working prototypes."}
              />
            </label>
          </div>
        </div>

        {/* Section 3: Event Photos & Caption */}
        <div>
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-50 text-pink-600 text-sm font-black">
              3
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-950 font-sans">Event Photos & Caption</h3>
              <p className="text-xs text-slate-500 font-semibold font-sans">Attach up to 4 photos to be included on Page 2</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Photo Caption
              <input
                className={inputClass}
                type="text"
                name="photoCaption"
                value={formData.photoCaption}
                onChange={handleChange}
                placeholder="e.g. Students participating during the expert talk"
              />
            </label>

            <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/20 p-5 hover:bg-purple-50/50 transition relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Upload Event Photos (Max 4)
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-2 text-xs font-bold text-white transition shadow-xs inline-block">
                  Browse Files
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    name="photos"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
                <span className="text-xs font-bold text-purple-700">
                  {selectedPhotos.length}/4 Photos Selected
                </span>
              </div>
            </div>
          </div>

          {/* Photo Thumbnails */}
          {selectedPhotos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100 shadow-xs"
                >
                  <img
                    src={photo.preview}
                    className="w-full h-full object-cover"
                    alt={`Event Photo ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-black text-white hover:bg-rose-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                  <span className="absolute bottom-1.5 left-1.5 bg-slate-950/70 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                    Photo {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4: Authorizing Signatures */}
        <div>
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-sm font-black">
              4
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-950 font-sans">Authorizing Signatures</h3>
              <p className="text-xs text-slate-500 font-semibold font-sans">Names appearing at the bottom of Page 2</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Event Coordinator Name *
              <input
                className={inputClass}
                type="text"
                name="eventCoordinator"
                value={formData.eventCoordinator}
                onChange={handleChange}
                placeholder="DR. JAYSHRI A. PATIL"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              Dean Name *
              <input
                className={inputClass}
                type="text"
                name="deanName"
                value={formData.deanName}
                onChange={handleChange}
                placeholder="DR. NIRAJ SHAH"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition active:scale-98"
          >
            Reset Form
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSavingDraft || isGenerating}
            className="rounded-xl border border-purple-200 bg-purple-50 px-5 py-3 text-sm font-bold text-purple-700 hover:bg-purple-100 transition disabled:opacity-60 active:scale-98"
          >
            {isSavingDraft ? "Saving Draft..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={handleGenerateReport}
            disabled={isSavingDraft || isGenerating}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-black text-white shadow-md hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-60 active:scale-98"
          >
            {isGenerating ? "Generating Report..." : "Generate Event Report"}
          </button>
          {generatedReport && (
            <button
              type="button"
              onClick={handleManualDownload}
              className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-black text-white shadow-md hover:from-emerald-700 hover:to-teal-700 transition active:scale-98"
            >
              Download Report PDF
            </button>
          )}
        </div>
      </form>

      {/* Live Academic Report Preview Canvas (Page 1 & Page 2) */}
      <section className="rounded-3xl border border-slate-200/90 bg-slate-100/70 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-600">Document Canvas</span>
            <h3 className="text-xl font-black text-slate-950 font-sans">Live Academic Report View</h3>
          </div>
          {generatedReport && (
            <button
              type="button"
              onClick={handleManualDownload}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 transition shadow-xs"
            >
              Export A4 PDF
            </button>
          )}
        </div>

        <div className="w-full flex justify-center overflow-x-auto py-2">
          <EventReportPreview
            data={
              generatedReport
                ? generatedReport
                : {
                    ...formData,
                    photos: selectedPhotos.map((p) => p.preview)
                  }
            }
          />
        </div>
      </section>
    </section>
  );
}

export default CreateEventReport;
