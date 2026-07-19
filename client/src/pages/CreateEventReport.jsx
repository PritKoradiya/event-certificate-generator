import { useState, useEffect, useRef } from "react";
import EventReportPreview from "../components/EventReportPreview.jsx";
import { createEventReport, saveDraftEventReport } from "../services/eventReportApi.js";
import { downloadEventReportPdf } from "../utils/downloadEventReportPdf.js";

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
    // If they change any field, reset generatedReport so preview goes back to live
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

    // Reset input value to allow uploading the same file again
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

    // Objectives list
    const objectivesArray = formData.objectives
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    objectivesArray.forEach((obj) => {
      data.append("eventObjectives", obj);
    });

    // Outcomes list
    const outcomesArray = formData.outcomes
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    outcomesArray.forEach((out) => {
      data.append("eventOutcomes", out);
    });

    // Photos files
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
        {/* Basic Details Section */}
        <div>
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

        {/* Report Content Section */}
        <div className="border-t border-slate-100 pt-8">
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

        {/* Photos Section */}
        <div className="border-t border-slate-100 pt-8">
          <h3 className="mt-1 text-2xl font-black text-slate-950">Photos & Caption</h3>
          <p className="mt-1 text-base leading-7 text-slate-600">
            Add up to 4 photos for the event report and provide a caption.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
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

            <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/20 p-5 transition hover:bg-blue-50/45">
              <label className="block text-sm font-bold text-slate-700 mb-2">Upload Photos</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer rounded-xl bg-primary-600 hover:bg-primary-700 px-4 py-2.5 text-sm font-bold text-white transition shadow-sm inline-block">
                  Choose files
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    name="photos"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-slate-500">
                  {selectedPhotos.length}/4 selected
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Supported formats: JPG, PNG, WEBP. First two photos will appear prominently in the report PDF.
              </p>
            </div>
          </div>

          {/* Premium Thumbnails Display */}
          {selectedPhotos.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {selectedPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-50 shadow-soft"
                >
                  <img
                    src={photo.preview}
                    className="w-full h-full object-cover"
                    alt={`Preview ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="rounded-full bg-rose-600 p-2 text-white hover:bg-rose-750 transition transform scale-90 group-hover:scale-100 duration-150"
                      title="Remove Photo"
                    >
                      🗑️
                    </button>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded font-sans uppercase">
                    Photo {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Signatures Section */}
        <div className="border-t border-slate-100 pt-8">
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
          {generatedReport && (
            <button
              type="button"
              onClick={handleManualDownload}
              className="button-press soft-hover w-full rounded-xl bg-emerald-600 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
            >
              Download Report PDF
            </button>
          )}
        </div>
      </form>

      {/* Live Preview Container (Full Width below form, not side-by-side) */}
      <section className="slide-up delay-100 rounded-3xl border border-blue-100 bg-slate-50 p-6 shadow-xl">
        <div className="mb-5">
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Event Report Preview</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950 font-sans">Live Document View</h3>
          <p className="mt-1 text-base leading-7 text-slate-600 font-sans">
            Scroll down to review the live draft output. Report PDF follows the academic event report format provided by the mentor.
          </p>
        </div>

        <div className="mx-auto w-full flex justify-center">
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

