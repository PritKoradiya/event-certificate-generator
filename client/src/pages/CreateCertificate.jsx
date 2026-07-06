import { useState } from "react";
import CertificatePreview from "../components/CertificatePreview.jsx";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100";

const initialFormData = {
  participantName: "",
  organizationName: "",
  eventName: "",
  category: "",
  certificateTitle: "",
  eventDate: "",
  description: "",
  templateStyle: ""
};

const certificateCategories = ["Seminar", "Conference", "FDP", "Expert Talk", "Workshop", "Webinar"];

const templateStyles = [
  "Classic Certificate",
  "Modern Blue Certificate",
  "Gold Achievement Certificate",
  "Seminar Certificate",
  "Conference Certificate",
  "FDP Certificate"
];

function CreateCertificate() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleSaveDraft = () => {
    alert("Save draft feature will be added in next step.");
  };

  const handleGenerateCertificate = () => {
    alert("Certificate generation will be added in next step.");
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Create Certificate</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Certificate details</h2>
        <p className="mt-2 text-slate-600">Fill in the event and participant information to preview the certificate instantly.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
        <form className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-soft" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Participant Name
              <input
                className={inputClass}
                type="text"
                name="participantName"
                value={formData.participantName}
                onChange={handleChange}
                placeholder="Enter participant name"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Organization Name
              <input
                className={inputClass}
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter organization name"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Event Name
              <input
                className={inputClass}
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                placeholder="Enter event name"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Certificate Category
              <select className={inputClass} name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select category</option>
                {certificateCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Certificate Title
              <input
                className={inputClass}
                type="text"
                name="certificateTitle"
                value={formData.certificateTitle}
                onChange={handleChange}
                placeholder="Certificate of Participation"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Event Date
              <input className={inputClass} type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Description / Details
            <textarea
              className={`${inputClass} min-h-32 resize-y`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter certificate description or event details"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Template Style
            <select className={inputClass} name="templateStyle" value={formData.templateStyle} onChange={handleChange}>
              <option value="">Select template style</option>
              {templateStyles.map((templateStyle) => (
                <option key={templateStyle} value={templateStyle}>
                  {templateStyle}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="rounded-md border border-primary-200 bg-primary-50 px-5 py-3 text-sm font-bold text-primary-700 transition hover:bg-primary-100"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleGenerateCertificate}
              className="rounded-md bg-primary-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
            >
              Generate Certificate
            </button>
          </div>
        </form>

        <CertificatePreview certificateData={formData} />
      </div>
    </section>
  );
}

export default CreateCertificate;
