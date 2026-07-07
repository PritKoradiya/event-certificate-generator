import { useMemo, useState } from "react";
import CertificatePreview from "../components/CertificatePreview.jsx";
import templateData from "../data/templateData.js";
import { bulkCreateCertificates } from "../services/certificateApi.js";
import downloadCertificatePdf from "../utils/downloadCertificatePdf.js";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100";

const categories = [
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

const initialCommonDetails = {
  organizationName: "",
  eventName: "",
  certificateCategory: "",
  certificateTitle: "Certificate of Participation",
  eventDate: "",
  description: "For successfully participating in the event.",
  templateStyle: "",
  authorizedSignatureName: "Event Coordinator"
};

const stepItems = [
  "Add Participants",
  "Add Common Certificate Details",
  "Generate Certificates",
  "View / Download"
];

function BulkGenerate() {
  const [manualNames, setManualNames] = useState("");
  const [participants, setParticipants] = useState([]);
  const [commonDetails, setCommonDetails] = useState(initialCommonDetails);
  const [generatedCertificates, setGeneratedCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const samplePreviewData = useMemo(() => {
    const firstParticipant = participants[0] || {
      participantName: "Participant Name",
      organizationName: ""
    };

    return {
      participantName: firstParticipant.participantName,
      organizationName: firstParticipant.organizationName || commonDetails.organizationName || "Organization Name",
      eventName: commonDetails.eventName,
      certificateCategory: commonDetails.certificateCategory,
      certificateTitle: commonDetails.certificateTitle,
      eventDate: commonDetails.eventDate,
      description: commonDetails.description,
      templateStyle: commonDetails.templateStyle,
      authorizedSignatureName: commonDetails.authorizedSignatureName
    };
  }, [commonDetails, participants]);

  const handleCommonChange = (event) => {
    const { name, value } = event.target;
    setCommonDetails((currentDetails) => ({
      ...currentDetails,
      [name]: value
    }));
  };

  const handleManualParticipants = () => {
    const names = manualNames
      .split("\n")
      .map((name) => name.trim())
      .filter(Boolean);

    if (names.length === 0) {
      alert("Please enter at least one participant name.");
      return;
    }

    const newParticipants = names.map((name, index) => ({
      id: `${Date.now()}-${index}`,
      participantName: name,
      organizationName: ""
    }));

    setParticipants(newParticipants);
    setGeneratedCertificates([]);
    setSelectedCertificate(null);
    setSuccessMessage("");
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const csvText = String(reader.result || "");
      const rows = csvText
        .split(/\r?\n/)
        .map((row) => row.trim())
        .filter(Boolean);

      const dataRows = rows[0]?.toLowerCase().includes("participantname") ? rows.slice(1) : rows;
      const parsedParticipants = dataRows
        .map((row, index) => {
          const [participantName, organizationName] = row.split(",").map((value) => value.trim());

          return {
            id: `${Date.now()}-${index}`,
            participantName: participantName || "",
            organizationName: organizationName || ""
          };
        })
        .filter((participant) => participant.participantName);

      if (parsedParticipants.length === 0) {
        alert("No valid participants found in CSV file.");
        return;
      }

      setParticipants(parsedParticipants);
      setGeneratedCertificates([]);
      setSelectedCertificate(null);
      setSuccessMessage("");
    };

    reader.onerror = () => {
      alert("Unable to read CSV file. Please try again.");
    };

    reader.readAsText(file);
  };

  const handleRemoveParticipant = (participantId) => {
    setParticipants((currentParticipants) => currentParticipants.filter((participant) => participant.id !== participantId));
  };

  const validateBulkForm = () => {
    if (participants.length === 0) {
      alert("Please add participants first.");
      return false;
    }

    const missingParticipant = participants.find((participant) => !participant.participantName.trim());

    if (missingParticipant) {
      alert("Participant name is required for every participant.");
      return false;
    }

    const requiredFields = [
      { key: "eventName", label: "Event Name" },
      { key: "certificateCategory", label: "Certificate Category" },
      { key: "certificateTitle", label: "Certificate Title" },
      { key: "eventDate", label: "Event Date" },
      { key: "templateStyle", label: "Template Style" }
    ];
    const missingFields = requiredFields
      .filter((field) => !commonDetails[field.key])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      alert(`Please fill these required fields: ${missingFields.join(", ")}`);
      return false;
    }

    const missingOrganization = participants.some((participant) => !participant.organizationName && !commonDetails.organizationName);

    if (missingOrganization) {
      alert("Please add Default Organization Name or include organizationName in CSV.");
      return false;
    }

    return true;
  };

  const handleGenerateBulkCertificates = async () => {
    if (!validateBulkForm()) {
      return;
    }

    try {
      setIsGenerating(true);
      setSuccessMessage("");

      const payload = {
        participants: participants.map((participant) => ({
          participantName: participant.participantName,
          organizationName: participant.organizationName || commonDetails.organizationName
        })),
        commonDetails
      };

      const result = await bulkCreateCertificates(payload);
      const savedCertificates = result.data || [];

      setGeneratedCertificates(savedCertificates);
      setSelectedCertificate(savedCertificates[0] || null);
      setSuccessMessage(`${result.count || savedCertificates.length} certificates generated successfully.`);
    } catch (error) {
      alert(error.message || "Unable to generate bulk certificates. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const createPdfFileName = (certificate) => {
    const participantName = certificate.participantName.trim().replace(/\s+/g, "_") || "Participant";
    const certificateId = certificate.certificateId || "CERT-2026-001";

    return `${participantName}_${certificateId}.pdf`;
  };

  const handleDownloadSelectedPdf = async () => {
    if (!selectedCertificate) {
      alert("Please select a certificate first.");
      return;
    }

    await downloadCertificatePdf("bulk-certificate-preview", createPdfFileName(selectedCertificate));
  };

  return (
    <section className="page-transition space-y-7">
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-soft lg:p-10">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Step 7</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Bulk Certificate Generation</h2>
        <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-600">
          Generate multiple certificates from student list using same event details and template.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stepItems.map((item, index) => (
          <div key={item} className={`slide-up rounded-2xl border border-slate-200 bg-white p-5 shadow-soft delay-${Math.min(index + 1, 4)}00`}>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg font-black text-primary-700">
                {index + 1}
              </span>
              <p className="text-base font-black text-slate-800">{item}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="slide-up rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Option A</p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">Manual List</h3>
            <textarea
              value={manualNames}
              onChange={(event) => setManualNames(event.target.value)}
              className="mt-4 min-h-40 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
              placeholder={"Prit Koradiya\nRahul Patel\nNeha Sharma"}
            />
            <button
              type="button"
              onClick={handleManualParticipants}
              className="button-press soft-hover mt-4 rounded-xl bg-primary-600 px-5 py-3 text-base font-black text-white transition hover:bg-primary-700"
            >
              Add Manual Participants
            </button>
          </div>

          <div className="slide-up delay-100 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Option B</p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">CSV Upload</h3>
            <p className="mt-2 text-base leading-7 text-slate-600">
              Format: participantName,organizationName
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="mt-4 block w-full rounded-xl border border-dashed border-blue-200 bg-blue-50 px-4 py-5 text-base font-bold text-slate-700"
            />
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-600">
              participantName,organizationName<br />
              Prit Koradiya,PPSU<br />
              Rahul Patel,PPSU
            </div>
          </div>
        </div>

        <div className="slide-up delay-200 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Participant Preview</p>
              <h3 className="mt-2 text-2xl font-black text-slate-950">{participants.length} participants</h3>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-base">
              <thead>
                <tr className="border-b border-slate-200 text-sm uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-3">No.</th>
                  <th className="px-3 py-3">Participant Name</th>
                  <th className="px-3 py-3">Organization Name</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => (
                  <tr key={participant.id} className="border-b border-slate-100">
                    <td className="px-3 py-4 font-bold text-slate-500">{index + 1}</td>
                    <td className="px-3 py-4 font-black text-slate-900">{participant.participantName}</td>
                    <td className="px-3 py-4 font-semibold text-slate-600">{participant.organizationName || commonDetails.organizationName || "Default organization"}</td>
                    <td className="px-3 py-4">
                      <button
                        type="button"
                        onClick={() => handleRemoveParticipant(participant.id)}
                        className="button-press soft-hover rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-black text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {participants.length === 0 && (
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-base font-bold text-slate-500">
              Added participants will appear here.
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[480px_1fr]">
        <form className="slide-up rounded-2xl border border-slate-200 bg-white p-6 shadow-soft" onSubmit={(event) => event.preventDefault()}>
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Common Details</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">Certificate form</h3>

          <div className="mt-5 grid gap-5">
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Default Organization Name
              <input className={inputClass} name="organizationName" value={commonDetails.organizationName} onChange={handleCommonChange} placeholder="PPSU" />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Event Name
              <input className={inputClass} name="eventName" value={commonDetails.eventName} onChange={handleCommonChange} placeholder="Hackathon" />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Certificate Category
              <select className={inputClass} name="certificateCategory" value={commonDetails.certificateCategory} onChange={handleCommonChange}>
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Certificate Title
              <input className={inputClass} name="certificateTitle" value={commonDetails.certificateTitle} onChange={handleCommonChange} />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Event Date
              <input className={inputClass} type="date" name="eventDate" value={commonDetails.eventDate} onChange={handleCommonChange} />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Description / Details
              <textarea
                className="min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                name="description"
                value={commonDetails.description}
                onChange={handleCommonChange}
              />
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Template Style
              <select className={inputClass} name="templateStyle" value={commonDetails.templateStyle} onChange={handleCommonChange}>
                <option value="">Select template style</option>
                {templateData.map((template) => (
                  <option key={template.id} value={template.name}>
                    {template.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-base font-bold text-slate-700">
              Authorized Signature Name
              <input className={inputClass} name="authorizedSignatureName" value={commonDetails.authorizedSignatureName} onChange={handleCommonChange} />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleGenerateBulkCertificates}
              disabled={isGenerating}
              className="button-press soft-hover rounded-xl bg-primary-600 px-5 py-3 text-base font-black text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isGenerating ? "Generating Bulk Certificates..." : "Generate Bulk Certificates"}
            </button>
            <button
              type="button"
              onClick={() => alert("Download all certificates as ZIP will be added in next step.")}
              className="button-press soft-hover rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-black text-slate-700 transition hover:bg-slate-50"
            >
              Download All PDFs
            </button>
          </div>

          {successMessage && (
            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-base font-black text-emerald-800">
              {successMessage}
            </div>
          )}
        </form>

        <div className="slide-up delay-100 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Live Preview</p>
            <h3 className="mt-1 text-2xl font-black text-slate-950">Sample certificate</h3>
          </div>
          <CertificatePreview certificateData={samplePreviewData} previewId="bulk-sample-preview" />
        </div>
      </div>

      {generatedCertificates.length > 0 && (
        <div className="slide-up space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Generated Result</p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">Bulk generated certificates</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-base">
              <thead>
                <tr className="border-b border-slate-200 text-sm uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-3">No.</th>
                  <th className="px-3 py-3">Participant</th>
                  <th className="px-3 py-3">Organization</th>
                  <th className="px-3 py-3">Event</th>
                  <th className="px-3 py-3">Category</th>
                  <th className="px-3 py-3">Template</th>
                  <th className="px-3 py-3">Certificate ID</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {generatedCertificates.map((certificate, index) => (
                  <tr key={certificate._id || certificate.certificateId} className="border-b border-slate-100">
                    <td className="px-3 py-4 font-bold text-slate-500">{index + 1}</td>
                    <td className="px-3 py-4 font-black text-slate-900">{certificate.participantName}</td>
                    <td className="px-3 py-4 font-semibold text-slate-600">{certificate.organizationName}</td>
                    <td className="px-3 py-4 font-semibold text-slate-600">{certificate.eventName}</td>
                    <td className="px-3 py-4 font-semibold text-slate-600">{certificate.certificateCategory}</td>
                    <td className="px-3 py-4 font-semibold text-slate-600">{certificate.templateStyle}</td>
                    <td className="px-3 py-4 font-black text-slate-700">{certificate.certificateId}</td>
                    <td className="px-3 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">
                        {certificate.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedCertificate(certificate)}
                        className="button-press soft-hover rounded-lg bg-primary-600 px-4 py-2 text-sm font-black text-white"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedCertificate && (
        <div className="slide-up space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Selected Bulk Preview</p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">{selectedCertificate.participantName}</h3>
            </div>
            <button
              type="button"
              onClick={handleDownloadSelectedPdf}
              className="button-press soft-hover rounded-xl bg-emerald-600 px-5 py-3 text-base font-black text-white transition hover:bg-emerald-700"
            >
              Download PDF
            </button>
          </div>

          <CertificatePreview certificateData={selectedCertificate} previewId="bulk-certificate-preview" />
        </div>
      )}
    </section>
  );
}

export default BulkGenerate;
