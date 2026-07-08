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
  <>
    {["top-5 left-5", "top-5 right-5 rotate-90", "bottom-5 right-5 rotate-180", "bottom-5 left-5 -rotate-90"].map((position) => (
      <svg key={position} className={`absolute h-[15%] w-[11%] ${position}`} viewBox="0 0 120 120" aria-hidden="true">
        <path d="M12 108 C18 54 54 18 108 12" fill="none" stroke={color} strokeWidth="5" />
        <path d="M28 100 C34 66 66 34 100 28" fill="none" stroke={color} strokeWidth="2.5" />
        <circle cx="34" cy="88" r="8" fill={softColor} stroke={color} strokeWidth="3" />
        <path d="M15 72 C34 70 50 54 52 35" fill="none" stroke={color} strokeWidth="3" />
      </svg>
    ))}
  </>
);

const WaveDecor = ({ primary = "#0f766e", secondary = "#d97706" }) => (
  <>
    <svg className="absolute right-0 top-0 h-[34%] w-[42%]" viewBox="0 0 420 210" preserveAspectRatio="none" aria-hidden="true">
      <path d="M95 0 H420 V168 C328 209 257 185 204 126 C162 79 128 44 95 0Z" fill={primary} opacity="0.92" />
      <path d="M188 0 H420 V88 C335 122 275 101 231 62 C213 46 199 25 188 0Z" fill={secondary} opacity="0.85" />
    </svg>
    <svg className="absolute bottom-0 left-0 h-[30%] w-[40%]" viewBox="0 0 420 190" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 38 C88 8 158 28 219 88 C269 138 319 166 420 139 V190 H0Z" fill={primary} opacity="0.14" />
      <path d="M0 126 C74 105 143 113 212 153 C252 176 302 186 365 174 V190 H0Z" fill={secondary} opacity="0.22" />
    </svg>
  </>
);

const FloralDecor = () => (
  <>
    {["left-6 top-6", "right-6 bottom-6 rotate-180"].map((position) => (
      <svg key={position} className={`absolute h-[28%] w-[22%] ${position}`} viewBox="0 0 210 180" aria-hidden="true">
        <path d="M28 150 C70 99 109 62 180 26" fill="none" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" />
        {[["62", "118", "#f97316"], ["92", "88", "#14b8a6"], ["126", "61", "#fb923c"], ["154", "42", "#0f766e"]].map(([cx, cy, fill]) => (
          <g key={`${cx}-${cy}`}>
            <ellipse cx={cx} cy={cy - 12} rx="11" ry="20" fill={fill} opacity="0.88" />
            <ellipse cx={cx} cy={Number(cy) + 12} rx="11" ry="20" fill={fill} opacity="0.88" />
            <ellipse cx={Number(cx) - 13} cy={cy} rx="20" ry="11" fill={fill} opacity="0.88" />
            <ellipse cx={Number(cx) + 13} cy={cy} rx="20" ry="11" fill={fill} opacity="0.88" />
            <circle cx={cx} cy={cy} r="7" fill="#fff7ed" />
          </g>
        ))}
      </svg>
    ))}
  </>
);

const GeometricDecor = () => (
  <>
    <div className="absolute left-[5%] top-[8%] h-[13%] w-[9%] rotate-12 rounded-2xl bg-[#38bdf8]/25" />
    <div className="absolute right-[7%] top-[10%] h-[15%] w-[15%] rounded-full bg-[#fb923c]/25" />
    <div className="absolute bottom-[9%] left-[9%] h-[0] w-[0] border-l-[42px] border-r-[42px] border-t-[74px] border-l-transparent border-r-transparent border-t-[#facc15]/40" />
    <div className="absolute bottom-[12%] right-[10%] h-[12%] w-[8%] -rotate-12 bg-[#14b8a6]/25" />
  </>
);

const Seal = ({ dark = false, accent = "#d97706", label = "Official Seal" }) => (
  <div
    className="flex aspect-square w-[clamp(58px,8vw,92px)] items-center justify-center rounded-full border-2 px-2 text-center text-[clamp(8px,0.92vw,11px)] font-black uppercase"
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
  const displayCategory = data.category || data.certificateCategory;
  const certificateId = valueOrFallback(data.certificateId, "CERT-2026-001");
  const signatureName = valueOrFallback(data.authorizedSignatureName, "Authorized Person");
  const issueDate = formatIssueDate(data.createdAt);
  const dark = config.dark;
  const textColor = dark ? "text-white" : "text-slate-900";
  const mutedColor = dark ? "text-amber-100/85" : "text-slate-600";
  const bodyColor = dark ? "text-slate-100" : "text-slate-700";

  return (
    <div
      className={`relative flex h-full w-full overflow-hidden border ${config.outerClass}`}
      style={{ background: config.background, borderColor: config.borderColor }}
    >
      {renderDecoration(config.decoration, config)}
      <div
        className={`relative z-10 m-[2.2%] flex flex-1 flex-col border px-[5%] py-[3.2%] text-center ${config.innerClass}`}
        style={{ background: config.panelBg, borderColor: config.borderColor }}
      >
        <div className="flex shrink-0 items-center gap-4">
          <div className="h-px flex-1" style={{ background: config.lineColor }} />
          <p className={`max-w-[62%] truncate text-[clamp(9px,1.12vw,13px)] font-black uppercase tracking-[0.22em] ${mutedColor}`}>
            {valueOrFallback(displayCategory, "Certificate")}
          </p>
          <div className="h-px flex-1" style={{ background: config.lineColor }} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-[1.8%]">
          <p className={`text-[clamp(10px,1.22vw,14px)] font-bold uppercase tracking-[0.34em] ${mutedColor}`}>
            {config.kicker}
          </p>
          <h3 className={`mt-[0.8%] break-words text-[clamp(22px,3.45vw,46px)] font-black leading-tight ${config.headingFont} ${textColor}`}>
            {valueOrFallback(data.certificateTitle, "Certificate of Participation")}
          </h3>
          <div className="mx-auto mt-[1.2%] h-[3px] w-[18%] min-w-24 rounded-full" style={{ background: config.lineColor }} />

          <p className={`mt-[1.7%] text-[clamp(10px,1.18vw,14px)] font-bold uppercase tracking-wide ${mutedColor}`}>
            This certificate is proudly presented to
          </p>
          <p className={`mx-auto mt-[0.6%] max-w-[88%] break-words border-b px-4 pb-[0.8%] text-[clamp(27px,4.8vw,64px)] font-black leading-tight ${config.nameFont}`} style={{ color: config.nameColor, borderColor: config.lineColor }}>
            {valueOrFallback(data.participantName, "Participant Name")}
          </p>

          <p className={`mt-[1.2%] text-[clamp(11px,1.32vw,16px)] leading-snug ${bodyColor}`}>
            From <span className="break-words font-black">{valueOrFallback(data.organizationName, "Organization Name")}</span>
          </p>
          <p className={`mx-auto mt-[0.8%] max-w-[82%] break-words text-[clamp(12px,1.45vw,17px)] leading-snug ${bodyColor}`}>
            For successfully participating in <span className="font-black">{valueOrFallback(data.eventName, "Event Name")}</span>
          </p>

          <div className="mx-auto mt-[1.5%] flex max-w-[82%] flex-wrap justify-center gap-2 text-[clamp(10px,1.08vw,13px)]">
            <span className="rounded-full px-3 py-1 font-black" style={{ background: config.badgeBg, color: config.badgeText }}>
              {valueOrFallback(displayCategory, "Category")}
            </span>
            <span className={`rounded-full px-3 py-1 font-bold ${dark ? "bg-white/10 text-white" : "bg-white text-slate-800"}`}>
              Event Date: {valueOrFallback(data.eventDate, "Event Date")}
            </span>
          </div>

          <p className={`mx-auto mt-[1.4%] max-w-[84%] break-words text-[clamp(11px,1.22vw,15px)] leading-snug ${bodyColor}`}>
            {valueOrFallback(data.description, "Description and certificate details will appear here as you type.")}
          </p>
        </div>

        <div className="mx-auto h-px w-full max-w-[78%] shrink-0" style={{ background: config.lineColor }} />

        <div className={`grid shrink-0 grid-cols-3 items-end gap-3 pt-[1.7%] text-[clamp(9px,1.08vw,13px)] ${bodyColor}`}>
          <div className="min-w-0">
            <p className="signature-text truncate text-[clamp(18px,2.45vw,33px)] leading-none" style={{ color: config.nameColor }}>
              {signatureName}
            </p>
            <div className="mx-auto mt-1 w-full max-w-44 border-t pt-1 font-black" style={{ borderColor: config.lineColor }}>
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
        </div>
      </div>
    </div>
  );
}

export default TemplateFrame;
