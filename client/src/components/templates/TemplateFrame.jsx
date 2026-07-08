const formatIssueDate = (createdAt) => {
  const issueDate = createdAt ? new Date(createdAt) : new Date();

  return issueDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

const valueOrFallback = (value, fallback) => value || fallback;

const CornerOrnaments = ({ color = "#1e3a8a", softColor = "#dbeafe" }) => (
  <div className="pointer-events-none absolute inset-0 z-0 opacity-75">
    {["top-4 left-4", "top-4 right-4 rotate-90", "bottom-4 right-4 rotate-180", "bottom-4 left-4 -rotate-90"].map((position) => (
      <svg key={position} className={`absolute h-[13%] w-[10%] ${position}`} viewBox="0 0 120 120" aria-hidden="true">
        <path d="M12 108 C18 54 54 18 108 12" fill="none" stroke={color} strokeWidth="5" />
        <path d="M28 100 C34 66 66 34 100 28" fill="none" stroke={color} strokeWidth="2.5" />
        <circle cx="34" cy="88" r="8" fill={softColor} stroke={color} strokeWidth="3" />
        <path d="M15 72 C34 70 50 54 52 35" fill="none" stroke={color} strokeWidth="3" />
      </svg>
    ))}
  </div>
);

const WaveDecor = ({ primary = "#0f766e", secondary = "#d97706" }) => (
  <div className="pointer-events-none absolute inset-0 z-0">
    <svg className="absolute right-0 top-0 h-[28%] w-[36%]" viewBox="0 0 420 210" preserveAspectRatio="none" aria-hidden="true">
      <path d="M95 0 H420 V168 C328 209 257 185 204 126 C162 79 128 44 95 0Z" fill={primary} opacity="0.7" />
      <path d="M188 0 H420 V88 C335 122 275 101 231 62 C213 46 199 25 188 0Z" fill={secondary} opacity="0.65" />
    </svg>
    <svg className="absolute bottom-0 left-0 h-[25%] w-[34%]" viewBox="0 0 420 190" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 38 C88 8 158 28 219 88 C269 138 319 166 420 139 V190 H0Z" fill={primary} opacity="0.14" />
      <path d="M0 126 C74 105 143 113 212 153 C252 176 302 186 365 174 V190 H0Z" fill={secondary} opacity="0.18" />
    </svg>
  </div>
);

const FloralDecor = () => (
  <div className="pointer-events-none absolute inset-0 z-0 opacity-55">
    {["left-4 top-4", "right-4 top-4 rotate-90", "right-4 bottom-4 rotate-180", "left-4 bottom-4 -rotate-90"].map((position) => (
      <svg key={position} className={`absolute h-[18%] w-[14%] ${position}`} viewBox="0 0 210 180" aria-hidden="true">
        <path d="M28 150 C70 99 109 62 180 26" fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        {[["62", "118", "#f97316"], ["96", "86", "#14b8a6"], ["132", "58", "#fb923c"]].map(([cx, cy, fill]) => (
          <g key={`${cx}-${cy}`}>
            <ellipse cx={cx} cy={cy - 10} rx="9" ry="16" fill={fill} opacity="0.82" />
            <ellipse cx={cx} cy={Number(cy) + 10} rx="9" ry="16" fill={fill} opacity="0.82" />
            <ellipse cx={Number(cx) - 11} cy={cy} rx="16" ry="9" fill={fill} opacity="0.82" />
            <ellipse cx={Number(cx) + 11} cy={cy} rx="16" ry="9" fill={fill} opacity="0.82" />
            <circle cx={cx} cy={cy} r="7" fill="#fff7ed" />
          </g>
        ))}
      </svg>
    ))}
  </div>
);

const GeometricDecor = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="absolute left-[4%] top-[7%] h-[10%] w-[7%] rotate-12 rounded-2xl bg-[#38bdf8]/20" />
    <div className="absolute right-[6%] top-[8%] h-[12%] w-[12%] rounded-full bg-[#fb923c]/20" />
    <div className="absolute bottom-[8%] left-[8%] h-[0] w-[0] border-l-[34px] border-r-[34px] border-t-[58px] border-l-transparent border-r-transparent border-t-[#facc15]/30" />
    <div className="absolute bottom-[10%] right-[9%] h-[9%] w-[6%] -rotate-12 bg-[#14b8a6]/20" />
  </div>
);

const Seal = ({ dark = false, accent = "#d97706", label = "Official Seal" }) => (
  <div
    className="flex aspect-square w-[clamp(52px,7vw,82px)] shrink-0 items-center justify-center rounded-full border-2 px-2 text-center text-[clamp(7px,0.82vw,10px)] font-black uppercase leading-tight"
    style={{
      borderColor: accent,
      color: dark ? "#f8e4a2" : accent,
      background: dark ? "rgba(248, 228, 162, 0.08)" : "rgba(255, 255, 255, 0.9)",
      boxShadow: `inset 0 0 0 6px ${dark ? "rgba(248, 228, 162, 0.08)" : "rgba(217, 119, 6, 0.1)"}`
    }}
  >
    {label}
  </div>
);

const renderDecoration = (key, colors) => {
  if (key === "ornate") return <CornerOrnaments color={colors.accent} softColor={colors.soft} />;
  if (key === "wave") return <WaveDecor primary={colors.accent} secondary={colors.secondary} />;
  if (key === "floral") return <FloralDecor />;
  if (key === "playful") return <GeometricDecor />;
  if (key === "academic") return <CornerOrnaments color={colors.accent} softColor={colors.soft} />;
  return null;
};

function TemplateFrame({ data, config }) {
  const displayParticipantName = valueOrFallback(data.participantName, "Participant Name");
  const displayOrganizationName = valueOrFallback(data.organizationName, "Organization Name");
  const displayEventName = valueOrFallback(data.eventName, "Event Name");
  const displayTitle = valueOrFallback(data.certificateTitle, "Certificate of Participation");
  const displayCategory = valueOrFallback(data.certificateCategory || data.category, "Category");
  const displayDescription = valueOrFallback(data.description, "Description and certificate details will appear here as you type.");
  const displaySignature = valueOrFallback(data.authorizedSignatureName, "Authorized Person");
  const certificateId = valueOrFallback(data.certificateId, "CERT-2026-001");
  const issueDate = formatIssueDate(data.createdAt);
  const dark = config.dark;
  const textColor = dark ? "text-white" : "text-slate-900";
  const mutedColor = dark ? "text-amber-100/85" : "text-slate-600";
  const bodyColor = dark ? "text-slate-100" : "text-slate-700";

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-[clamp(12px,3vw,32px)] ${config.outerClass}`}
      style={{ background: config.background, borderColor: config.borderColor }}
    >
      {renderDecoration(config.decoration, config)}
      <div
        className={`relative z-10 flex h-full min-h-0 flex-col justify-between overflow-hidden border px-[clamp(16px,4vw,40px)] py-[clamp(12px,2.6vw,28px)] text-center ${config.innerClass}`}
        style={{ background: config.panelBg, borderColor: config.borderColor }}
      >
        <header className="flex h-[12%] min-h-[clamp(36px,6vw,58px)] shrink-0 items-center gap-4">
          <div className="h-px flex-1" style={{ background: config.lineColor }} />
          <p className={`max-w-[62%] truncate text-[clamp(9px,1vw,12px)] font-black uppercase tracking-[0.22em] ${mutedColor}`}>
            {displayCategory}
          </p>
          <div className="h-px flex-1" style={{ background: config.lineColor }} />
        </header>

        <main className="relative z-10 mx-auto flex min-h-0 w-full max-w-[85%] flex-1 flex-col items-center justify-center overflow-hidden py-2 text-center">
          <p className={`certificate-body-safe max-w-full truncate font-bold uppercase tracking-[0.28em] ${mutedColor}`}>
            {config.kicker}
          </p>
          <h3 className={`certificate-title-safe mt-1 max-w-full break-words font-black ${config.headingFont} ${textColor}`}>
            {displayTitle}
          </h3>
          <div className="mx-auto mt-3 h-[3px] w-[18%] min-w-24 rounded-full" style={{ background: config.lineColor }} />

          <p className={`certificate-body-safe mt-4 max-w-full truncate font-bold uppercase tracking-wide ${mutedColor}`}>
            This certificate is proudly presented to
          </p>
          <p className={`certificate-name-safe mx-auto mt-2 max-w-full break-words border-b px-4 pb-2 font-black ${config.nameFont}`} style={{ color: config.nameColor, borderColor: config.lineColor }}>
            {displayParticipantName}
          </p>

          <p className={`certificate-body-safe mt-4 max-w-full break-words leading-snug ${bodyColor}`}>
            From <span className="font-black">{displayOrganizationName}</span>
          </p>
          <p className={`certificate-body-safe mx-auto mt-2 max-w-full break-words leading-snug ${bodyColor}`}>
            For successfully participating in <span className="font-black">{displayEventName}</span>
          </p>

          <div className="certificate-body-safe mx-auto mt-3 flex max-w-full flex-wrap justify-center gap-2">
            <span className={`rounded-full px-3 py-1 font-bold ${dark ? "bg-white/10 text-white" : "bg-white text-slate-800"}`}>
              Event Date: {valueOrFallback(data.eventDate, "Event Date")}
            </span>
          </div>

          <p className={`certificate-description-safe certificate-body-safe mx-auto mt-3 max-w-full break-words leading-snug ${bodyColor}`}>
            {displayDescription}
          </p>
        </main>

        <footer className={`certificate-footer-safe relative z-10 mt-[clamp(8px,1.6vw,16px)] grid h-[18%] min-h-[clamp(58px,9vw,86px)] shrink-0 grid-cols-3 items-end gap-4 border-t pt-[clamp(8px,1.6vw,16px)] ${bodyColor}`} style={{ borderColor: config.lineColor }}>
          <div className="min-w-0">
            <p className="signature-text truncate text-[clamp(18px,2.1vw,28px)] leading-none" style={{ color: config.nameColor }}>
              {displaySignature}
            </p>
            <div className="mx-auto mt-2 w-full max-w-44 border-t pt-1 font-black" style={{ borderColor: config.lineColor }}>
              Authorized Signature
            </div>
          </div>

          <div className="flex justify-center">
            <Seal dark={dark} accent={config.sealColor} label={config.sealLabel} />
          </div>

          <div className="min-w-0 text-right">
            <p className={`truncate font-black uppercase tracking-wide ${mutedColor}`}>Certificate ID</p>
            <p className={`truncate font-black ${textColor}`}>{certificateId}</p>
            <p className={`mt-1 truncate font-semibold ${mutedColor}`}>Issue Date: {issueDate}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TemplateFrame;
