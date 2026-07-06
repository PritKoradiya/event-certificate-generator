import templateData from "../data/templateData.js";

const defaultTemplate = templateData[0];

function CertificatePreview({ certificateData, previewId = "certificate-preview" }) {
  const {
    participantName,
    organizationName,
    eventName,
    category,
    certificateCategory,
    certificateTitle,
    eventDate,
    description,
    templateStyle,
    certificateId,
    createdAt
  } = certificateData;

  const selectedTemplate = templateData.find((template) => template.name === templateStyle) || defaultTemplate;
  const displayValue = (value, fallback) => value || fallback;
  const displayCategory = category || certificateCategory;
  const displayCertificateId = certificateId || "CERT-2026-001";
  const issueDate = createdAt ? new Date(createdAt) : new Date();
  const formattedIssueDate = issueDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return (
    <section
      id={previewId}
      className={`mx-auto aspect-[11/8] w-full max-w-4xl rounded-lg border p-3 shadow-soft sm:p-4 ${selectedTemplate.previewClass}`}
    >
      <div className={`flex h-full flex-col rounded-lg border-2 bg-white/80 px-4 py-4 text-center shadow-sm sm:px-8 sm:py-6 ${selectedTemplate.borderClass}`}>
        <div className="mx-auto flex w-full max-w-lg items-center gap-3">
          <div className={`h-1 flex-1 rounded-full ${selectedTemplate.accentClass}`} />
          <p className="max-w-[45%] truncate text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
            {selectedTemplate.name}
          </p>
          <div className={`h-1 flex-1 rounded-full ${selectedTemplate.accentClass}`} />
        </div>

        <div className="flex flex-1 flex-col justify-center overflow-hidden py-3">
          <h3 className={`break-words text-xl font-bold leading-tight sm:text-3xl lg:text-4xl ${selectedTemplate.headingClass}`}>
            {displayValue(certificateTitle, "Certificate of Participation")}
          </h3>

          <div className={`mx-auto mt-3 h-1 w-20 rounded-full ${selectedTemplate.accentClass}`} />

          <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
            This certificate is proudly presented to
          </p>

          <p className={`mx-auto mt-2 max-w-3xl break-words border-b px-3 pb-2 text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl ${selectedTemplate.headingClass} ${selectedTemplate.borderClass}`}>
            {displayValue(participantName, "Participant Name")}
          </p>

          <p className="mt-3 text-xs leading-5 text-slate-600 sm:text-sm">
            From <span className="break-words font-semibold text-slate-800">{displayValue(organizationName, "Organization Name")}</span>
          </p>

          <p className="mx-auto mt-2 max-w-2xl break-words text-xs leading-5 text-slate-700 sm:text-sm">
            For successfully participating in{" "}
            <span className="font-semibold text-slate-900">{displayValue(eventName, "Event Name")}</span>
          </p>

          <div className="mx-auto mt-3 flex max-w-xl flex-wrap justify-center gap-2 text-[10px] sm:text-xs">
            <span className={`rounded-full px-3 py-1.5 font-semibold ${selectedTemplate.badgeClass}`}>
              {displayValue(displayCategory, "Category")}
            </span>
            <span className="rounded-full bg-white px-3 py-1.5 font-semibold text-slate-700 shadow-sm">
              Event Date: {displayValue(eventDate, "Event Date")}
            </span>
          </div>

          <p className="mx-auto mt-3 line-clamp-2 max-w-2xl break-words text-xs leading-5 text-slate-600 sm:text-sm">
            {displayValue(description, "Description and certificate details will appear here as you type.")}
          </p>
        </div>

        <div className={`mx-auto h-px w-full max-w-2xl ${selectedTemplate.accentClass}`} />

        <div className="grid grid-cols-3 items-end gap-2 pt-3 text-[10px] text-slate-600 sm:text-xs">
          <div className="min-w-0">
            <div className="mx-auto w-full max-w-36 border-t border-slate-300 pt-1 font-semibold">
              Authorized Signature
            </div>
            <p className="mt-1 truncate">Issue Date: {formattedIssueDate}</p>
          </div>

          <div className="flex justify-center">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white px-2 text-center text-[9px] font-bold uppercase sm:h-20 sm:w-20 sm:text-[10px] ${selectedTemplate.borderClass} ${selectedTemplate.headingClass}`}>
              Official Seal
            </div>
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold uppercase tracking-wide text-slate-500">Certificate ID</p>
            <p className="mt-1 truncate font-bold text-slate-700">{displayCertificateId}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificatePreview;
