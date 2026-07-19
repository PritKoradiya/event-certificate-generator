import { useState } from "react";
import EventReportPreview from "../components/EventReportPreview.jsx";
import { createEventReport, saveDraftEventReport } from "../services/eventReportApi.js";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100";

const textareaClass =
  "w-full rounded-xl border border-slate-200 bg-white p-4 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100 min-h-32 resize-y";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the form?")) {
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

  const handleSaveDraft = async () => {
    try {
      setIsSavingDraft(true);
      const result = await saveDraftEventReport(formData);
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
      const result = await createEventReport(formData);
      setGeneratedReport(result.data);
      alert(result.message || "Event report generated and saved successfully.");
    } catch (error) {
      alert(error.message || "Unable to generate event report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="page-transition space-y-7">
      {/* Page Header */}
      <div className="fade-in rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-7 shadow-soft lg:p-9">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Report Builder</p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Create Event Report</h2>
        <p className="mt-2 max-w-4xl text-lg leading-8 text-slate-600">
          Enter event details to generate a structured event report preview.
        </p>
      </div>

      {/* Form Container */}
      <form
        className="slide-up rounded-3xl border border-blue-100 bg-white p-6 shadow-xl lg:p-8 space-y-8"
        onSubmit={(event) => event.preventDefault()}
      >
        {/* Section 1: Basic Details */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Step 1</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">Basic Details</h3>
          <p className="mt-1 text-base leading-7 text-slate-600">
            Fill in the primary administrative information for the event.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Report Date *
              <input
                className={inputClass}
                type="date"
                name="reportDate"
                value={formData.reportDate}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Date of Event *
              <input
                className={inputClass}
                type="date"
                name="dateOfEvent"
                value={formData.dateOfEvent}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Time *
              <input
                className={inputClass}
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g., 10:00 AM to 1:00 PM"
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Resource Person *
              <input
                className={inputClass}
                type="text"
                name="resourcePerson"
                value={formData.resourcePerson}
                onChange={handleChange}
                placeholder="Name, Designation, Organization"
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700 md:col-span-2 xl:col-span-1">
              Name of the Event *
              <input
                className={inputClass}
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                placeholder="e.g., Seminar on AI Tools"
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              No. of Participants *
              <input
                className={inputClass}
                type="number"
                name="noOfParticipants"
                value={formData.noOfParticipants}
                onChange={handleChange}
                placeholder="e.g., 50"
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Attendee *
              <input
                className={inputClass}
                type="text"
                name="attendee"
                value={formData.attendee}
                onChange={handleChange}
                placeholder="e.g., B.Tech Students"
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Venue *
              <input
                className={inputClass}
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="e.g., Seminar Hall, SOE"
              />
            </label>
          </div>
        </div>

        {/* Section 2: Report Content */}
        <div className="border-t border-slate-100 pt-8">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Step 2</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">Report Content</h3>
          <p className="mt-1 text-base leading-7 text-slate-600">
            Provide the descriptive outlines, objectives, and outcomes. Use new lines to create lists.
          </p>

          <div className="mt-6 grid gap-5 grid-cols-1">
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Event Outline *
              <textarea
                className={textareaClass}
                name="eventOutline"
                value={formData.eventOutline}
                onChange={handleChange}
                placeholder="Enter event outline and summary..."
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Objectives of the Event * (one objective per line)
              <textarea
                className={textareaClass}
                name="objectives"
                value={formData.objectives}
                onChange={handleChange}
                placeholder="Enter event objectives (one per line)..."
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Outcomes of the Event * (one outcome per line)
              <textarea
                className={textareaClass}
                name="outcomes"
                value={formData.outcomes}
                onChange={handleChange}
                placeholder="Enter event outcomes (one per line)..."
              />
            </label>
          </div>
        </div>

        {/* Section 3: Photos */}
        <div className="border-t border-slate-100 pt-8">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Step 3</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">Photos & Caption</h3>
          <p className="mt-1 text-base leading-7 text-slate-600">
            Add a description caption for event photographs.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Photo Caption
              <input
                className={inputClass}
                type="text"
                name="photoCaption"
                value={formData.photoCaption}
                onChange={handleChange}
                placeholder="e.g., Students attending the hands-on session"
              />
            </label>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
              <label className="block text-sm font-bold text-slate-700 mb-2">Photo Upload (Placeholder)</label>
              <input
                type="file"
                disabled
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-100/50 px-4 py-2 text-base cursor-not-allowed mb-2"
              />
              <p className="text-sm font-semibold text-blue-600 flex items-center gap-1.5">
                <span>ℹ️</span> Photo upload and PDF export will be added in next step.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Signatures */}
        <div className="border-t border-slate-100 pt-8">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Step 4</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">Signatures</h3>
          <p className="mt-1 text-base leading-7 text-slate-600">
            Define names of the authority figures for the report.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-base font-bold text-slate-700">
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

            <label className="grid gap-2 text-base font-bold text-slate-700">
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

        {/* Form Action Buttons */}
        <div className="mt-7 pt-6 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="button-press soft-hover w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Reset Form
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSavingDraft || isGenerating}
            className="button-press soft-hover w-full rounded-xl border border-primary-200 bg-primary-50 px-5 py-3 text-base font-bold text-primary-700 transition hover:bg-primary-100 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSavingDraft ? "Saving Draft..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={handleGenerateReport}
            disabled={isSavingDraft || isGenerating}
            className="button-press soft-hover w-full rounded-xl bg-primary-600 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-500 disabled:opacity-70 sm:w-auto"
          >
            {isGenerating ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </form>

      {/* Live Preview Container (Full Width below form, not side-by-side) */}
      <section className="slide-up delay-100 rounded-3xl border border-blue-100 bg-slate-50 p-6 shadow-xl">
        <div className="mb-5">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Event Report Preview</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950 font-sans">Live Document View</h3>
          <p className="mt-1 text-base leading-7 text-slate-600 font-sans">
            Scroll down to review the live draft output.
          </p>
        </div>

        <div className="mx-auto w-full flex justify-center">
          <EventReportPreview data={formData} />
        </div>
      </section>
    </section>
  );
}

export default CreateEventReport;
