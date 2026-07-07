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
    createdAt,
    authorizedSignatureName
  } = certificateData;

  const selectedTemplate = templateData.find((template) => template.name === templateStyle) || defaultTemplate;
  const displayValue = (value, fallback) => value || fallback;
  const displayCategory = category || certificateCategory;
  const displayCertificateId = certificateId || "CERT-2026-001";
  const signatureName = authorizedSignatureName || "Authorized Person";
  const issueDate = createdAt ? new Date(createdAt) : new Date();
  const formattedIssueDate = issueDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return (
    <section
      id={previewId}
      className={`certificate-preview-root scale-in mx-auto aspect-[1.414/1] w-full max-w-[950px] overflow-hidden rounded-xl border p-[1.4%] shadow-soft ${selectedTemplate.previewClass}`}
    >
      <div className={`flex h-full flex-col rounded-lg border-2 bg-white px-[4.5%] py-[3%] text-center ${selectedTemplate.borderClass}`}>
        <div className="flex shrink-0 items-center gap-3">
          <div className={`h-1 flex-1 rounded-full ${selectedTemplate.accentClass}`} />
          <p className="max-w-[58%] truncate text-[clamp(9px,1.2vw,13px)] font-bold uppercase tracking-wide text-slate-700">
            {selectedTemplate.name} - {displayValue(displayCategory, "Category")}
          </p>
          <div className={`h-1 flex-1 rounded-full ${selectedTemplate.accentClass}`} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-[2%]">
          <h3 className={`break-words text-[clamp(20px,3.2vw,44px)] font-bold leading-tight ${selectedTemplate.headingClass}`}>
            {displayValue(certificateTitle, "Certificate of Participation")}
          </h3>

          <div className={`mx-auto mt-[1.3%] h-1 w-24 rounded-full ${selectedTemplate.accentClass}`} />

          <p className="mt-[1.5%] text-[clamp(10px,1.25vw,14px)] font-bold uppercase tracking-wide text-slate-600">
            This certificate is proudly presented to
          </p>

          <p className={`mx-auto mt-[0.8%] max-w-[88%] break-words border-b px-3 pb-[0.8%] text-[clamp(26px,4.6vw,62px)] font-black leading-tight ${selectedTemplate.headingClass} ${selectedTemplate.borderClass}`}>
            {displayValue(participantName, "Participant Name")}
          </p>

          <p className="mt-[1.4%] text-[clamp(11px,1.35vw,16px)] leading-snug text-slate-700">
            From <span className="break-words font-bold text-slate-900">{displayValue(organizationName, "Organization Name")}</span>
          </p>

          <p className="mx-auto mt-[0.8%] max-w-[82%] break-words text-[clamp(12px,1.45vw,17px)] leading-snug text-slate-800">
            For successfully participating in{" "}
            <span className="font-bold text-slate-950">{displayValue(eventName, "Event Name")}</span>
          </p>

          <div className="mx-auto mt-[1.6%] flex max-w-[80%] flex-wrap justify-center gap-2 text-[clamp(10px,1.15vw,13px)]">
            <span className={`rounded-full px-3 py-1 font-semibold ${selectedTemplate.badgeClass}`}>
              {displayValue(displayCategory, "Category")}
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-800 shadow-sm">
              Event Date: {displayValue(eventDate, "Event Date")}
            </span>
          </div>

          <p className="mx-auto mt-[1.5%] max-w-[82%] break-words text-[clamp(11px,1.25vw,15px)] leading-snug text-slate-700">
            {displayValue(description, "Description and certificate details will appear here as you type.")}
          </p>
        </div>

        <div className={`mx-auto h-px w-full max-w-[78%] shrink-0 ${selectedTemplate.accentClass}`} />

        <div className="grid shrink-0 grid-cols-3 items-end gap-3 pt-[1.8%] text-[clamp(9px,1.1vw,13px)] text-slate-700">
          <div className="min-w-0">
            <p className={`signature-text truncate text-[clamp(18px,2.6vw,34px)] leading-none ${selectedTemplate.headingClass}`}>
              {signatureName}
            </p>
            <div className="mx-auto mt-1 w-full max-w-44 border-t border-slate-400 pt-1 font-bold">
              Authorized Signature
            </div>
          </div>

          <div className="flex justify-center">
            <div className={`flex aspect-square w-[clamp(58px,8.2vw,92px)] items-center justify-center rounded-full border-2 bg-white px-2 text-center text-[clamp(8px,0.95vw,11px)] font-black uppercase ${selectedTemplate.borderClass} ${selectedTemplate.headingClass}`}>
              Official Seal
            </div>
          </div>

          <div className="min-w-0 text-right">
            <p className="truncate font-bold uppercase tracking-wide text-slate-600">Certificate ID</p>
            <p className="truncate font-black text-slate-800">{displayCertificateId}</p>
            <p className="mt-1 truncate font-semibold text-slate-600">Issue Date: {formattedIssueDate}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificatePreview;
