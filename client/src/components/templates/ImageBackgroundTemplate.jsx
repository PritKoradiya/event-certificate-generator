const formatIssueDate = (createdAt) => {
  const issueDate = createdAt ? new Date(createdAt) : new Date();

  return issueDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

const trimOrFallback = (value, fallback) => {
  const trimmedValue = typeof value === "string" ? value.trim() : value;

  return trimmedValue || fallback;
};

function ImageBackgroundTemplate({
  participantName,
  organizationName,
  eventName,
  category,
  certificateCategory,
  certificateTitle,
  eventDate,
  description,
  certificateId,
  authorizedSignatureName,
  createdAt,
  backgroundImage,
  textTheme = "dark",
  safeArea
}) {
  const displayTitle = certificateTitle?.trim() || "Certificate of Participation";
  const displayParticipantName = participantName?.trim() || "Participant Name";
  const displayOrganizationName = organizationName?.trim() || "Organization Name";
  const displayEventName = eventName?.trim() || "Event Name";
  const displayCategory = certificateCategory?.trim() || category?.trim() || "Category";
  const displayDescription = description?.trim() || "For successfully participating in the event.";
  const displaySignature = authorizedSignatureName?.trim() || "Authorized Person";
  const displayCertificateId = certificateId || "CERT-2026-001";
  const displayEventDate = trimOrFallback(eventDate, "Event Date");
  const formattedIssueDate = formatIssueDate(createdAt);
  const isLightText = textTheme === "light";
  const mainText = isLightText ? "text-white" : "text-slate-900";
  const strongText = isLightText ? "text-white" : "text-slate-950";
  const bodyText = isLightText ? "text-slate-100" : "text-slate-700";
  const mutedText = isLightText ? "text-amber-100" : "text-slate-600";
  const accentColor = isLightText ? "#f8d675" : "#2563eb";
  const lineColor = isLightText ? "rgba(248, 214, 117, 0.8)" : "rgba(71, 85, 105, 0.75)";
  const paddingX = safeArea?.paddingX || "13%";
  const paddingY = safeArea?.paddingY || "8%";

  return (
    <div className="relative h-full w-full aspect-[1.414/1] overflow-hidden rounded-2xl bg-white">
      <img
        src={backgroundImage}
        alt="Certificate background"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover"
        draggable={false}
      />

      <div
        className={`relative z-10 flex h-full flex-col justify-between text-center ${mainText}`}
        style={{ padding: `${paddingY} ${paddingX}` }}
      >
        <header className="shrink-0 space-y-2">
          <p className={`truncate text-xs font-bold uppercase tracking-[0.35em] ${mutedText}`}>
            {displayCategory}
          </p>
          <h1 className={`certificate-bg-title certificate-description-safe mx-auto max-w-[85%] font-serif ${strongText}`}>
            {displayTitle}
          </h1>
        </header>

        <main className="mx-auto flex min-h-0 max-w-[82%] flex-1 flex-col items-center justify-center space-y-3 py-3">
          <p className={`certificate-bg-body max-w-full truncate font-semibold uppercase tracking-[0.22em] ${mutedText}`}>
            This certificate is proudly presented to
          </p>

          <h2 className={`certificate-bg-name max-w-full font-serif ${strongText}`}>
            {displayParticipantName}
          </h2>

          <div className="h-px w-[70%]" style={{ background: lineColor }} />

          <p className={`certificate-bg-body max-w-full break-words ${bodyText}`}>
            From <strong>{displayOrganizationName}</strong>
          </p>

          <p className={`certificate-bg-body max-w-full break-words ${bodyText}`}>
            For successfully participating in <strong>{displayEventName}</strong>
          </p>

          <p className={`certificate-bg-body max-w-full rounded-full px-3 py-1 font-semibold ${isLightText ? "bg-black/20 text-white" : "bg-white/75 text-slate-700"}`}>
            Event Date: {displayEventDate}
          </p>

          <p className={`certificate-description-safe certificate-bg-body max-w-[85%] break-words ${mutedText}`}>
            {displayDescription}
          </p>
        </main>

        <footer className={`certificate-bg-footer grid shrink-0 grid-cols-3 items-end gap-4 pt-3 ${bodyText}`}>
          <div className="min-w-0 text-left">
            <p className="signature-text mb-1 truncate text-[clamp(1rem,1.7vw,1.45rem)] font-semibold leading-none" style={{ color: accentColor }}>
              {displaySignature}
            </p>
            <div className="mb-1 h-px w-full max-w-40" style={{ background: lineColor }} />
            <p className="truncate font-bold">Authorized Signature</p>
          </div>

          <div className="flex justify-center">
            <div
              className="flex h-[clamp(52px,7vw,80px)] w-[clamp(52px,7vw,80px)] shrink-0 items-center justify-center rounded-full border-2 bg-white/70 text-center text-[clamp(7px,0.75vw,10px)] font-bold uppercase leading-tight"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Official
              <br />
              Seal
            </div>
          </div>

          <div className="min-w-0 text-right">
            <p className="truncate font-bold uppercase">Certificate ID</p>
            <p className={`truncate font-extrabold ${strongText}`}>{displayCertificateId}</p>
            <p className="mt-2 truncate">Issue Date: {formattedIssueDate}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ImageBackgroundTemplate;
