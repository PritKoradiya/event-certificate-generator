const templateDesigns = {
  "Classic Certificate": {
    outer: "border-slate-800 bg-white",
    inner: "border-slate-300",
    eyebrow: "text-slate-700",
    title: "font-serif text-slate-950",
    participant: "font-serif text-slate-900 border-slate-300",
    accent: "bg-slate-800",
    badge: "bg-slate-100 text-slate-800",
    seal: "border-slate-400 text-slate-700"
  },
  "Modern Blue Certificate": {
    outer: "border-blue-300 bg-gradient-to-br from-blue-50 via-white to-sky-100",
    inner: "border-blue-200",
    eyebrow: "text-blue-700",
    title: "text-blue-950",
    participant: "text-blue-700 border-blue-200",
    accent: "bg-blue-600",
    badge: "bg-blue-100 text-blue-800",
    seal: "border-blue-400 text-blue-700"
  },
  "Gold Achievement Certificate": {
    outer: "border-amber-400 bg-amber-50",
    inner: "border-amber-200",
    eyebrow: "text-amber-700",
    title: "font-serif text-amber-950",
    participant: "font-serif text-amber-700 border-amber-300",
    accent: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800",
    seal: "border-amber-500 text-amber-700"
  },
  "Seminar Certificate": {
    outer: "border-indigo-200 bg-white",
    inner: "border-indigo-100",
    eyebrow: "text-indigo-600",
    title: "text-indigo-950",
    participant: "text-indigo-700 border-indigo-200",
    accent: "bg-indigo-500",
    badge: "bg-indigo-50 text-indigo-700",
    seal: "border-indigo-300 text-indigo-700"
  },
  "Conference Certificate": {
    outer: "border-sky-300 bg-slate-50",
    inner: "border-sky-100",
    eyebrow: "text-sky-700",
    title: "text-slate-950",
    participant: "text-sky-800 border-sky-200",
    accent: "bg-sky-700",
    badge: "bg-sky-100 text-sky-800",
    seal: "border-sky-400 text-sky-800"
  },
  "FDP Certificate": {
    outer: "border-emerald-300 bg-emerald-50",
    inner: "border-emerald-100",
    eyebrow: "text-emerald-700",
    title: "text-emerald-950",
    participant: "text-emerald-800 border-emerald-200",
    accent: "bg-emerald-600",
    badge: "bg-emerald-100 text-emerald-800",
    seal: "border-emerald-400 text-emerald-800"
  },
  "Workshop Certificate": {
    outer: "border-cyan-300 bg-cyan-50",
    inner: "border-cyan-100",
    eyebrow: "text-cyan-700",
    title: "text-cyan-950",
    participant: "text-cyan-800 border-cyan-200",
    accent: "bg-cyan-600",
    badge: "bg-cyan-100 text-cyan-800",
    seal: "border-cyan-400 text-cyan-800"
  },
  "Webinar Certificate": {
    outer: "border-violet-300 bg-violet-50",
    inner: "border-violet-100",
    eyebrow: "text-violet-700",
    title: "text-violet-950",
    participant: "text-violet-800 border-violet-200",
    accent: "bg-violet-600",
    badge: "bg-violet-100 text-violet-800",
    seal: "border-violet-400 text-violet-800"
  }
};

function CertificatePreview({ certificateData }) {
  const {
    participantName,
    organizationName,
    eventName,
    category,
    certificateTitle,
    eventDate,
    description,
    templateStyle
  } = certificateData;

  const selectedTemplate = templateStyle || "Classic Certificate";
  const design = templateDesigns[selectedTemplate] || templateDesigns["Classic Certificate"];
  const displayValue = (value, fallback) => value || fallback;

  return (
    <section className={`mx-auto aspect-[11/8] w-full max-w-4xl rounded-lg border p-3 shadow-soft sm:p-4 ${design.outer}`}>
      <div className={`flex h-full flex-col rounded-lg border-2 bg-white/80 px-4 py-4 text-center shadow-sm sm:px-8 sm:py-6 ${design.inner}`}>
        <div className="mx-auto flex w-full max-w-lg items-center gap-3">
          <div className={`h-1 flex-1 rounded-full ${design.accent}`} />
          <p className={`max-w-[45%] truncate text-[10px] font-bold uppercase tracking-wide sm:text-xs ${design.eyebrow}`}>
            {selectedTemplate}
          </p>
          <div className={`h-1 flex-1 rounded-full ${design.accent}`} />
        </div>

        <div className="flex flex-1 flex-col justify-center overflow-hidden py-3">
          <h3 className={`break-words text-xl font-bold leading-tight sm:text-3xl lg:text-4xl ${design.title}`}>
            {displayValue(certificateTitle, "Certificate of Participation")}
          </h3>

          <div className={`mx-auto mt-3 h-1 w-20 rounded-full ${design.accent}`} />

          <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
            This certificate is proudly presented to
          </p>

          <p className={`mx-auto mt-2 max-w-3xl break-words border-b px-3 pb-2 text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl ${design.participant}`}>
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
            <span className={`rounded-full px-3 py-1.5 font-semibold ${design.badge}`}>
              {displayValue(category, "Category")}
            </span>
            <span className="rounded-full bg-white px-3 py-1.5 font-semibold text-slate-700 shadow-sm">
              Event Date: {displayValue(eventDate, "Event Date")}
            </span>
          </div>

          <p className="mx-auto mt-3 line-clamp-2 max-w-2xl break-words text-xs leading-5 text-slate-600 sm:text-sm">
            {displayValue(description, "Description and certificate details will appear here as you type.")}
          </p>
        </div>

        <div className={`mx-auto h-px w-full max-w-2xl ${design.accent}`} />

        <div className="grid grid-cols-3 items-end gap-2 pt-3 text-[10px] text-slate-600 sm:text-xs">
          <div className="min-w-0">
            <div className="mx-auto w-full max-w-36 border-t border-slate-300 pt-1 font-semibold">
              Authorized Signature
            </div>
            <p className="mt-1 truncate">Issue Date Placeholder</p>
          </div>

          <div className="flex justify-center">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white px-2 text-center text-[9px] font-bold uppercase sm:h-20 sm:w-20 sm:text-[10px] ${design.seal}`}>
              Official Seal
            </div>
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold uppercase tracking-wide text-slate-500">Certificate ID</p>
            <p className="mt-1 truncate font-bold text-slate-700">CERT-2026-001</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificatePreview;
