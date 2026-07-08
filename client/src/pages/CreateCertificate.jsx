import { useEffect, useState } from "react";
import CertificatePreview from "../components/CertificatePreview.jsx";
import templateData from "../data/templateData.js";
import { createCertificate, saveDraftCertificate } from "../services/certificateApi.js";
import downloadCertificatePdf from "../utils/downloadCertificatePdf.js";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100";

const initialFormData = {
  participantName: "",
  organizationName: "",
  eventName: "",
  category: "",
  certificateTitle: "",
  eventDate: "",
  description: "",
  templateStyle: "",
  authorizedSignatureName: "Authorized Person"
};

const certificateCategories = [
  "Seminar",
  "Conference",
  "FDP",
  "Expert Talk",
  "Workshop",
  "Webinar",
  "Hackathon",
  "Training",
  "Competition",
  "Appreciation",
  "Academic",
  "Cultural",
  "Sports",
  "Technical"
];

function CreateCertificate() {
  const [formData, setFormData] = useState(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
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

  const handleSaveDraft = async () => {
    try {
      setIsSavingDraft(true);

      await saveDraftCertificate({
        participantName: formData.participantName,
        organizationName: formData.organizationName,
        eventName: formData.eventName,
        certificateCategory: formData.category,
        certificateTitle: formData.certificateTitle,
        eventDate: formData.eventDate,
        description: formData.description,
        templateStyle: formData.templateStyle,
        authorizedSignatureName: formData.authorizedSignatureName || "Authorized Person"
      });

      alert("Draft saved successfully.");
    } catch (error) {
      alert(error.message || "Unable to save draft. Please try again.");
    } finally {
      setIsSavingDraft(false);
    }
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
        templateStyle: formData.templateStyle,
        authorizedSignatureName: formData.authorizedSignatureName || "Authorized Person"
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
        createdAt: generatedCertificate.createdAt,
        authorizedSignatureName: generatedCertificate.authorizedSignatureName || formData.authorizedSignatureName
      }
    : formData;

  return (
    <section className="page-transition space-y-7">
      <div className="fade-in rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-7 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Certificate Builder</p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Create Certificate</h2>
        <p className="mt-2 text-lg leading-8 text-slate-600">Enter event and participant details to generate a certificate preview.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[520px_1fr]">
        <form className="slide-up grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:p-7" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-base font-bold text-slate-700">
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
            <label className="grid gap-2 text-base font-bold text-slate-700">
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
            <label className="grid gap-2 text-base font-bold text-slate-700">
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
            <label className="grid gap-2 text-base font-bold text-slate-700">
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
            <label className="grid gap-2 text-base font-bold text-slate-700">
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
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Event Date
              <input className={inputClass} type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
            </label>
          </div>

          <label className="grid gap-2 text-base font-bold text-slate-700">
            Description / Details
            <textarea
              className={`${inputClass} min-h-32 resize-y py-3`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter certificate description or event details"
            />
          </label>

          <label className="grid gap-2 text-base font-bold text-slate-700">
            Authorized Signature Name
            <input
              className={inputClass}
              type="text"
              name="authorizedSignatureName"
              value={formData.authorizedSignatureName}
              onChange={handleChange}
              placeholder="Enter authorized person name"
            />
          </label>

          <label className="grid gap-2 text-base font-bold text-slate-700">
            Template Style
            <select className={inputClass} name="templateStyle" value={formData.templateStyle} onChange={handleChange}>
              <option value="">Select template style</option>
              {templateData.map((template) => (
                <option key={template.id} value={template.name}>
                  {template.name}
                </option>
              ))}
            </select>
            <span className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold leading-6 text-blue-700">
              {templateData.length}+ certificate templates available. Select any design to preview instantly.
            </span>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleReset}
              className="button-press soft-hover rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSavingDraft}
              className="button-press soft-hover rounded-xl border border-primary-200 bg-primary-50 px-5 py-3 text-base font-bold text-primary-700 transition hover:bg-primary-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSavingDraft ? "Saving Draft..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={handleGenerateCertificate}
              disabled={isGenerating}
              className="button-press soft-hover rounded-xl bg-primary-600 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-500 disabled:opacity-70"
            >
              {isGenerating ? "Generating..." : "Generate Certificate"}
            </button>
            {generatedCertificate && (
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="button-press soft-hover rounded-xl bg-emerald-600 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Download PDF
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          <div className="slide-up rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-soft">
            <p className="text-base font-bold text-slate-700">
              Selected Template: <span className="text-primary-700">{selectedTemplateName}</span>
            </p>
          </div>
          <div className="slide-up delay-100 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <CertificatePreview certificateData={previewData} previewId="certificate-preview" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateCertificate;
