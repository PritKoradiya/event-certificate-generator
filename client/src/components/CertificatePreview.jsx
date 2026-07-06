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
    <section className={`rounded-lg border p-4 shadow-soft ${design.outer}`}>
      <div className={`rounded-lg border-2 bg-white/80 px-5 py-8 text-center shadow-sm sm:px-8 ${design.inner}`}>
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className={`h-1 flex-1 rounded-full ${design.accent}`} />
          <p className={`text-xs font-bold uppercase tracking-wide ${design.eyebrow}`}>
            {selectedTemplate}
          </p>
          <div className={`h-1 flex-1 rounded-full ${design.accent}`} />
        </div>

        <h3 className={`mt-5 text-2xl font-bold sm:text-4xl ${design.title}`}>
          {displayValue(certificateTitle, "Certificate of Participation")}
        </h3>

        <div className={`mx-auto mt-5 h-1 w-24 rounded-full ${design.accent}`} />

        <p className="mt-6 text-sm font-medium uppercase tracking-wide text-slate-500">
          This certificate is proudly presented to
        </p>

        <p className={`mx-auto mt-3 max-w-2xl border-b pb-3 text-3xl font-bold sm:text-5xl ${design.participant}`}>
          {displayValue(participantName, "Participant Name")}
        </p>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          From <span className="font-semibold text-slate-800">{displayValue(organizationName, "Organization Name")}</span>
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-700">
          For successfully participating in{" "}
          <span className="font-semibold text-slate-900">{displayValue(eventName, "Event Name")}</span>
        </p>

        <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-3 text-sm">
          <span className={`rounded-full px-4 py-2 font-semibold ${design.badge}`}>
            {displayValue(category, "Category")}
          </span>
          <span className="rounded-full bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm">
            Event Date: {displayValue(eventDate, "Event Date")}
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-slate-600">
          {displayValue(description, "Description and certificate details will appear here as you type.")}
        </p>

        <div className={`mx-auto mt-8 h-px max-w-xl ${design.accent}`} />

        <div className="mt-8 grid gap-6 text-sm text-slate-600 sm:grid-cols-3">
          <div className="mx-auto w-44 border-t border-slate-300 pt-2">
            Authorized Signature
          </div>
          <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 bg-white text-xs font-bold uppercase ${design.seal}`}>
            Official Seal
          </div>
          <div className="mx-auto w-44 border-t border-slate-300 pt-2">
            Issue Date Placeholder
          </div>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Certificate ID: CERT-2026-001
        </p>
      </div>
    </section>
  );
}

export default CertificatePreview;
