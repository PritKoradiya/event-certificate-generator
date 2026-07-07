import { useEffect, useState } from "react";
import CertificatePreview from "../components/CertificatePreview.jsx";
import { getCertificates } from "../services/certificateApi.js";
import downloadCertificatePdf from "../utils/downloadCertificatePdf.js";

function GeneratedCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [pendingDownload, setPendingDownload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
      await downloadCertificatePdf("saved-certificate-preview", createPdfFileName(selectedCertificate));
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
    const participantName = certificate.participantName.trim().replace(/\s+/g, "_") || "Participant";
    const certificateId = certificate.certificateId || "CERT-2026-001";

    return `${participantName}_${certificateId}.pdf`;
  };

  const handleView = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleDownloadPdf = async () => {
    if (!selectedCertificate) {
      alert("Please select a certificate first.");
      return;
    }

    await downloadCertificatePdf("saved-certificate-preview", createPdfFileName(selectedCertificate));
  };

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

  if (certificates.length === 0) {
    return (
      <section className="page-transition rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-soft">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-3xl font-black text-slate-500">
          0
        </div>
        <h2 className="mt-5 text-3xl font-black text-slate-950">No certificates generated yet.</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-slate-600">
          Generated certificate records will appear here after you create and save a certificate.
        </p>
      </section>
    );
  }

  return (
    <section className="page-transition space-y-7">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Generated Certificates</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Saved certificate records</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">View saved MongoDB certificates and download the selected certificate as A4 landscape PDF.</p>
      </div>

      <div className="grid gap-5">
        {certificates.map((certificate) => (
          <article key={certificate._id} className="card-hover rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Participant</p>
                  <h3 className="mt-1 break-words text-xl font-black text-slate-950">{certificate.participantName}</h3>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Organization</p>
                  <p className="mt-1 break-words text-base font-bold text-slate-700">{certificate.organizationName}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Event</p>
                  <p className="mt-1 break-words text-base font-bold text-slate-700">{certificate.eventName}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Category</p>
                  <p className="mt-1 text-base font-bold text-slate-700">{certificate.certificateCategory}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Template</p>
                  <p className="mt-1 text-base font-bold text-slate-700">{certificate.templateStyle}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Certificate ID</p>
                  <p className="mt-1 text-base font-bold text-slate-700">{certificate.certificateId}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Created Date</p>
                  <p className="mt-1 text-base font-bold text-slate-700">{formatDate(certificate.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Status</p>
                  <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">
                    {certificate.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  type="button"
                  onClick={() => handleView(certificate)}
                  className="button-press soft-hover rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCertificate(certificate);
                    setPendingDownload(true);
                  }}
                  className="button-press soft-hover rounded-xl bg-primary-600 px-5 py-3 text-base font-bold text-white transition hover:bg-primary-700"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedCertificate && (
        <section className="slide-up space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-primary-600">Selected Preview</p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">{selectedCertificate.participantName}</h3>
            </div>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="button-press soft-hover rounded-xl bg-emerald-600 px-5 py-3 text-base font-bold text-white transition hover:bg-emerald-700"
            >
              Download PDF
            </button>
          </div>

          <CertificatePreview certificateData={selectedCertificate} previewId="saved-certificate-preview" />
        </section>
      )}
    </section>
  );
}

export default GeneratedCertificates;
