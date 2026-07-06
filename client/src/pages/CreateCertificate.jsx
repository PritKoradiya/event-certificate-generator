import { useEffect, useState } from "react";
import CertificatePreview from "../components/CertificatePreview.jsx";
import templateData from "../data/templateData.js";
import { createCertificate } from "../services/certificateApi.js";
import downloadCertificatePdf from "../utils/downloadCertificatePdf.js";

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

function CreateCertificate() {
  const [formData, setFormData] = useState(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState(null);

  useEffect(() => {
    const selectedTemplate = localStorage.getItem("selectedCertificateTemplate");

    if (selectedTemplate) {
      setFormData((currentData) => ({
        ...currentData,
        templateStyle: selectedTemplate
      }));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
    setGeneratedCertificate(null);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setGeneratedCertificate(null);
  };

  const handleSaveDraft = () => {
    alert("Save draft feature will be added in next step.");
  };

  const validateForm = () => {
    const requiredFields = [
      { key: "participantName", label: "Participant Name" },
      { key: "organizationName", label: "Organization Name" },
      { key: "eventName", label: "Event Name" },
      { key: "category", label: "Certificate Category" },
      { key: "certificateTitle", label: "Certificate Title" },
      { key: "eventDate", label: "Event Date" },
      { key: "templateStyle", label: "Template Style" }
    ];

    const missingFields = requiredFields
      .filter((field) => !formData[field.key])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      alert(`Please fill these required fields: ${missingFields.join(", ")}`);
      return false;
    }

    return true;
  };

  const handleGenerateCertificate = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsGenerating(true);

      const result = await createCertificate({
        participantName: formData.participantName,
        organizationName: formData.organizationName,
        eventName: formData.eventName,
        certificateCategory: formData.category,
        certificateTitle: formData.certificateTitle,
        eventDate: formData.eventDate,
        description: formData.description,
        templateStyle: formData.templateStyle
      });

      setGeneratedCertificate(result.data);
      alert("Certificate generated and saved successfully.");
    } catch (error) {
      alert(error.message || "Unable to generate certificate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const createPdfFileName = () => {
    const participantName = formData.participantName.trim().replace(/\s+/g, "_") || "Participant";
    const certificateId = generatedCertificate?.certificateId || "CERT-2026-001";

    return `${participantName}_${certificateId}.pdf`;
  };

  const handleDownloadPdf = async () => {
    if (!generatedCertificate) {
      alert("Please generate certificate first.");
      return;
    }

    await downloadCertificatePdf("certificate-preview", createPdfFileName());
  };

  const selectedTemplateName = formData.templateStyle || "Classic Certificate";
  const previewData = generatedCertificate
    ? {
        ...formData,
        certificateId: generatedCertificate.certificateId,
        createdAt: generatedCertificate.createdAt
      }
    : formData;

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
              {templateData.map((template) => (
                <option key={template.id} value={template.name}>
                  {template.name}
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
              disabled={isGenerating}
              className="rounded-md bg-primary-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-500 disabled:opacity-70"
            >
              {isGenerating ? "Generating..." : "Generate Certificate"}
            </button>
            {generatedCertificate && (
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="rounded-md bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Download PDF
              </button>
            )}
          </div>
        </form>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-soft">
            <p className="text-sm font-semibold text-slate-700">
              Selected Template: <span className="text-primary-700">{selectedTemplateName}</span>
            </p>
          </div>
          <CertificatePreview certificateData={previewData} previewId="certificate-preview" />
        </div>
      </div>
    </section>
  );
}

export default CreateCertificate;
