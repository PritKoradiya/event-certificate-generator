import { useEffect, useMemo, useState } from "react";
import CertificatePreview from "../components/CertificatePreview.jsx";
import templateData from "../data/templateData.js";
import { deleteCertificate, getCertificates, updateCertificate } from "../services/certificateApi.js";
import downloadCertificatePdf from "../utils/downloadCertificatePdf.js";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100";

const categoryOptions = [
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

const createEditData = (certificate) => ({
  participantName: certificate?.participantName || "",
  organizationName: certificate?.organizationName || "",
  eventName: certificate?.eventName || "",
  certificateCategory: certificate?.certificateCategory || "",
  certificateTitle: certificate?.certificateTitle || "",
  eventDate: certificate?.eventDate || "",
  description: certificate?.description || "",
  templateStyle: certificate?.templateStyle || "",
  authorizedSignatureName: certificate?.authorizedSignatureName || "Authorized Person",
  status: certificate?.status || "Generated"
});

function GeneratedCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [editData, setEditData] = useState(createEditData(null));
  const [pendingDownload, setPendingDownload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGenerationType, setSelectedGenerationType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const categories = useMemo(() => {
    const savedCategories = certificates
      .map((certificate) => certificate.certificateCategory)
      .filter(Boolean);

    return ["All", ...new Set([...categoryOptions, ...savedCategories])];
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    return certificates.filter((certificate) => {
      const generationType = certificate.generationType || "Single";
      const status = certificate.status || "Generated";
      const matchesSearch =
        !normalizedSearchTerm ||
        certificate.participantName?.toLowerCase().includes(normalizedSearchTerm) ||
        certificate.eventName?.toLowerCase().includes(normalizedSearchTerm) ||
        certificate.certificateId?.toLowerCase().includes(normalizedSearchTerm);
      const matchesCategory = selectedCategory === "All" || certificate.certificateCategory === selectedCategory;
      const matchesGenerationType = selectedGenerationType === "All" || generationType === selectedGenerationType;
      const matchesStatus = selectedStatus === "All" || status === selectedStatus;

      return matchesSearch && matchesCategory && matchesGenerationType && matchesStatus;
    });
  }, [certificates, searchTerm, selectedCategory, selectedGenerationType, selectedStatus]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const result = await getCertificates();
        const savedCertificates = result.data || [];
        setCertificates(savedCertificates);
        setSelectedCertificate(savedCertificates[0] || null);
      } catch (error) {
        setErrorMessage(error.message || "Unable to fetch certificates.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    if (!pendingDownload || !selectedCertificate) {
      return;
    }

    const downloadSelectedCertificate = async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await downloadCertificatePdf("generated-certificate-preview", createPdfFileName(selectedCertificate));
      setPendingDownload(false);
    };

    downloadSelectedCertificate();
  }, [pendingDownload, selectedCertificate]);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Not available";
    }

    return new Date(dateValue).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const createPdfFileName = (certificate) => {
    const participantName = (certificate.participantName || "Participant").trim().replace(/\s+/g, "_");
    const certificateId = certificate.certificateId || "CERT-2026-001";

    return `${participantName}_${certificateId}.pdf`;
  };

  const getStatusBadgeClass = (status) => {
    return status === "Draft"
      ? "bg-amber-50 text-amber-700"
      : "bg-emerald-50 text-emerald-700";
  };

  const getGenerationBadgeClass = (generationType) => {
    return generationType === "Bulk"
      ? "bg-purple-50 text-purple-700"
      : "bg-blue-50 text-primary-700";
  };

  const handleView = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleStartEdit = (certificate) => {
    setEditingCertificate(certificate);
    setEditData(createEditData(certificate));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingCertificate) {
      return;
    }

    try {
      setIsSavingEdit(true);

      const result = await updateCertificate(editingCertificate._id, editData);
      const updatedCertificate = result.data;

      setCertificates((currentCertificates) =>
        currentCertificates.map((certificate) =>
          certificate._id === updatedCertificate._id ? updatedCertificate : certificate
        )
      );
      setSelectedCertificate(updatedCertificate);
      setEditingCertificate(null);
      alert("Certificate updated successfully.");
    } catch (error) {
      alert(error.message || "Unable to update certificate. Please try again.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDelete = async (certificate) => {
    const confirmed = window.confirm("Are you sure you want to delete this certificate?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteCertificate(certificate._id);
      const remainingCertificates = certificates.filter((item) => item._id !== certificate._id);

      setCertificates(remainingCertificates);

      if (selectedCertificate?._id === certificate._id) {
        setSelectedCertificate(remainingCertificates[0] || null);
      }

      if (editingCertificate?._id === certificate._id) {
        setEditingCertificate(null);
      }

      alert("Certificate deleted successfully.");
    } catch (error) {
      alert(error.message || "Unable to delete certificate. Please try again.");
    }
  };

  const handleDownloadPdf = async () => {
    if (!selectedCertificate) {
      alert("Please select a certificate first.");
      return;
    }

    await downloadCertificatePdf("generated-certificate-preview", createPdfFileName(selectedCertificate));
  };

  const detailRows = selectedCertificate
    ? [
        ["Participant Name", selectedCertificate.participantName || "Not added"],
        ["Organization Name", selectedCertificate.organizationName || "Not added"],
        ["Event Name", selectedCertificate.eventName || "Not added"],
        ["Category", selectedCertificate.certificateCategory || "Not added"],
        ["Certificate Title", selectedCertificate.certificateTitle || "Not added"],
        ["Event Date", selectedCertificate.eventDate || "Not added"],
        ["Template Style", selectedCertificate.templateStyle || "Not added"],
        ["Authorized Signature", selectedCertificate.authorizedSignatureName || "Authorized Person"],
        ["Certificate ID", selectedCertificate.certificateId || "Not available"],
        ["Status", selectedCertificate.status || "Generated"],
        ["Generation Type", selectedCertificate.generationType || "Single"],
        ["Created Date", formatDate(selectedCertificate.createdAt)]
      ]
    : [];

  if (isLoading) {
    return (
      <section className="page-transition rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-soft">
        <p className="text-base font-bold text-slate-600">Loading generated certificates...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="page-transition rounded-2xl border border-red-100 bg-red-50 p-10 text-center shadow-soft">
        <h2 className="text-2xl font-black text-red-700">Unable to load certificates</h2>
        <p className="mt-2 text-base text-red-600">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section className="page-transition space-y-7">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Generated Certificates</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Certificate Records</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">
          View, edit, delete, filter, and export saved certificate records.
        </p>
      </div>

      <div className="slide-up rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="grid gap-3 xl:grid-cols-[1fr_220px_180px_180px]">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by participant, event, or certificate ID"
            className={inputClass}
          />
          <select className={inputClass} value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select className={inputClass} value={selectedGenerationType} onChange={(event) => setSelectedGenerationType(event.target.value)}>
            <option value="All">All</option>
            <option value="Single">Single</option>
            <option value="Bulk">Bulk</option>
          </select>
          <select className={inputClass} value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
            <option value="All">All</option>
            <option value="Generated">Generated</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <p className="mt-4 text-base font-bold text-slate-600">
          Showing {filteredCertificates.length} of {certificates.length} certificates
        </p>
      </div>

      {certificates.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-soft">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-3xl font-black text-slate-500">
            0
          </div>
          <h2 className="mt-5 text-3xl font-black text-slate-950">No certificates saved yet.</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-slate-600">
            Drafts and generated certificate records will appear here.
          </p>
        </section>
      ) : (
        <div className="grid gap-5">
          {filteredCertificates.map((certificate) => {
            const status = certificate.status || "Generated";
            const generationType = certificate.generationType || "Single";

            return (
              <article key={certificate._id} className="card-hover rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-start">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Participant</p>
                      <h3 className="mt-1 break-words text-xl font-black text-slate-950">{certificate.participantName || "Draft Participant"}</h3>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Organization</p>
                      <p className="mt-1 break-words text-base font-bold text-slate-700">{certificate.organizationName || "Not added"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Event</p>
                      <p className="mt-1 break-words text-base font-bold text-slate-700">{certificate.eventName || "Not added"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Category</p>
                      <p className="mt-1 text-base font-bold text-slate-700">{certificate.certificateCategory || "Not added"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Template</p>
                      <p className="mt-1 text-base font-bold text-slate-700">{certificate.templateStyle || "Not added"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Certificate ID</p>
                      <p className="mt-1 text-base font-bold text-slate-700">{certificate.certificateId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Generation</p>
                      <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-black ${getGenerationBadgeClass(generationType)}`}>
                        {generationType}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Status</p>
                      <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-black ${getStatusBadgeClass(status)}`}>
                        {status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Created Date</p>
                      <p className="mt-1 text-base font-bold text-slate-700">{formatDate(certificate.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 xl:w-44 xl:flex-col">
                    <button type="button" onClick={() => handleView(certificate)} className="button-press soft-hover rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-bold text-slate-700">
                      View
                    </button>
                    <button type="button" onClick={() => handleStartEdit(certificate)} className="button-press soft-hover rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-base font-bold text-primary-700">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCertificate(certificate);
                        setPendingDownload(true);
                      }}
                      className="button-press soft-hover rounded-xl bg-primary-600 px-4 py-3 text-base font-bold text-white"
                    >
                      Download PDF
                    </button>
                    <button type="button" onClick={() => handleDelete(certificate)} className="button-press soft-hover rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-base font-bold text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {filteredCertificates.length === 0 && certificates.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft">
          <p className="text-base font-bold text-slate-600">No certificates matched your filters.</p>
        </div>
      )}

      {selectedCertificate && (
        <section className="slide-up grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft xl:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Selected Preview</p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">{selectedCertificate.participantName || "Draft Participant"}</h3>
              </div>
              <button type="button" onClick={handleDownloadPdf} className="button-press soft-hover rounded-xl bg-emerald-600 px-5 py-3 text-base font-bold text-white transition hover:bg-emerald-700">
                Download PDF
              </button>
            </div>

            <CertificatePreview certificateData={selectedCertificate} previewId="generated-certificate-preview" />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Details</p>
            <div className="mt-4 grid gap-3">
              {detailRows.map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="mt-1 break-words text-base font-bold text-slate-800">{value}</p>
                </div>
              ))}
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">Description</p>
                <p className="mt-1 break-words text-base font-bold leading-7 text-slate-800">{selectedCertificate.description || "Not added"}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {editingCertificate && (
        <section className="slide-up rounded-2xl border border-blue-100 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Edit Certificate</p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">{editingCertificate.certificateId}</h3>
            </div>
            <button type="button" onClick={() => setEditingCertificate(null)} className="button-press soft-hover rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700">
              Cancel
            </button>
          </div>

          <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Participant Name
              <input className={inputClass} name="participantName" value={editData.participantName} onChange={handleEditChange} />
            </label>
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Organization Name
              <input className={inputClass} name="organizationName" value={editData.organizationName} onChange={handleEditChange} />
            </label>
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Event Name
              <input className={inputClass} name="eventName" value={editData.eventName} onChange={handleEditChange} />
            </label>
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Certificate Category
              <select className={inputClass} name="certificateCategory" value={editData.certificateCategory} onChange={handleEditChange}>
                <option value="">Select category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Certificate Title
              <input className={inputClass} name="certificateTitle" value={editData.certificateTitle} onChange={handleEditChange} />
            </label>
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Event Date
              <input className={inputClass} type="date" name="eventDate" value={editData.eventDate} onChange={handleEditChange} />
            </label>
            <label className="grid gap-2 text-base font-bold text-slate-700 md:col-span-2">
              Description / Details
              <textarea className="min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100" name="description" value={editData.description} onChange={handleEditChange} />
            </label>
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Template Style
              <select className={inputClass} name="templateStyle" value={editData.templateStyle} onChange={handleEditChange}>
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
              <input className={inputClass} name="authorizedSignatureName" value={editData.authorizedSignatureName} onChange={handleEditChange} />
            </label>
            <label className="grid gap-2 text-base font-bold text-slate-700">
              Status
              <select className={inputClass} name="status" value={editData.status} onChange={handleEditChange}>
                <option value="Generated">Generated</option>
                <option value="Draft">Draft</option>
              </select>
            </label>
          </form>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleSaveEdit} disabled={isSavingEdit} className="button-press soft-hover rounded-xl bg-primary-600 px-5 py-3 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-70">
              {isSavingEdit ? "Saving Changes..." : "Save Changes"}
            </button>
            <button type="button" onClick={() => setEditingCertificate(null)} className="button-press soft-hover rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700">
              Cancel
            </button>
          </div>
        </section>
      )}
    </section>
  );
}

export default GeneratedCertificates;
