import { useEffect, useState } from "react";
import { getCertificates } from "../services/certificateApi.js";

function GeneratedCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const result = await getCertificates();
        setCertificates(result.data || []);
      } catch (error) {
        setErrorMessage(error.message || "Unable to fetch certificates.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

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

  const handleView = () => {
    alert("Certificate view details will be added in next step.");
  };

  const handleDownloadPdf = () => {
    alert("PDF download will be added in next step.");
  };

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-semibold text-slate-600">Loading generated certificates...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-lg border border-red-100 bg-red-50 p-8 text-center shadow-soft">
        <h2 className="text-xl font-bold text-red-700">Unable to load certificates</h2>
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      </section>
    );
  }

  if (certificates.length === 0) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-500">
          0
        </div>
        <h2 className="mt-5 text-2xl font-bold text-slate-950">No certificates generated yet.</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Generated certificate records will appear here after you create and save a certificate.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Generated Certificates</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Saved certificate records</h2>
      </div>

      <div className="grid gap-5">
        {certificates.map((certificate) => (
          <article key={certificate._id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Participant</p>
                  <h3 className="mt-1 break-words text-lg font-bold text-slate-950">{certificate.participantName}</h3>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Organization</p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-700">{certificate.organizationName}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Event</p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-700">{certificate.eventName}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Category</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{certificate.certificateCategory}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Template</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{certificate.templateStyle}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Certificate ID</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{certificate.certificateId}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Created Date</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{formatDate(certificate.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Status</p>
                  <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {certificate.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  type="button"
                  onClick={handleView}
                  className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-700"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GeneratedCertificates;
