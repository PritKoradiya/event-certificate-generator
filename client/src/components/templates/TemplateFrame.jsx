import CertificateTextOverlay from "./CertificateTextOverlay.jsx";

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

const renderDecoration = (key, colors) => {
  if (key === "ornate") return <CornerOrnaments color={colors.accent} softColor={colors.soft} />;
  if (key === "wave") return <WaveDecor primary={colors.accent} secondary={colors.secondary} />;
  if (key === "floral") return <FloralDecor />;
  if (key === "playful") return <GeometricDecor />;
  if (key === "academic") return <CornerOrnaments color={colors.accent} softColor={colors.soft} />;
  return null;
};

function TemplateFrame({ data, config }) {
  const overlayTheme = config.textTheme || (config.dark ? "gold" : "dark");

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-2xl border ${config.outerClass}`}
      style={{ background: config.background, borderColor: config.borderColor }}
    >
      {renderDecoration(config.decoration, config)}
      <div
        className={`absolute inset-[4.5%] z-10 overflow-hidden border ${config.innerClass}`}
        style={{ background: config.panelBg, borderColor: config.borderColor }}
      />
      <CertificateTextOverlay {...data} textTheme={overlayTheme} />
    </div>
  );
}

export default TemplateFrame;
