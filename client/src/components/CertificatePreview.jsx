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

  const displayValue = (value, fallback) => value || fallback;

  return (
    <section className="rounded-lg border border-blue-200 bg-white p-5 shadow-soft">
      <div className="rounded-lg border-4 border-blue-100 bg-white px-5 py-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
          {displayValue(templateStyle, "Selected Template Style")}
        </p>

        <h3 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
          {displayValue(certificateTitle, "Certificate Title")}
        </h3>

        <p className="mt-6 text-sm font-medium text-slate-500">
          This certificate is proudly presented to
        </p>

        <p className="mt-3 border-b border-blue-100 pb-3 text-3xl font-bold text-blue-700 sm:text-4xl">
          {displayValue(participantName, "Participant Name")}
        </p>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          From <span className="font-semibold text-slate-800">{displayValue(organizationName, "Organization Name")}</span>
        </p>

        <p className="mt-4 text-base leading-7 text-slate-700">
          For successfully participating in{" "}
          <span className="font-semibold text-slate-900">{displayValue(eventName, "Event Name")}</span>
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
          <span className="rounded-full bg-blue-50 px-4 py-2 font-semibold text-blue-700">
            {displayValue(category, "Category")}
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700">
            {displayValue(eventDate, "Event Date")}
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-slate-600">
          {displayValue(description, "Description and certificate details will appear here as you type.")}
        </p>

        <div className="mt-10 grid gap-6 text-sm text-slate-600 sm:grid-cols-2">
          <div className="mx-auto w-44 border-t border-slate-300 pt-2">
            Signature Placeholder
          </div>
          <div className="mx-auto w-44 border-t border-slate-300 pt-2">
            Certificate ID Placeholder
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificatePreview;
