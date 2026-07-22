import React from "react";

/**
 * CertificateTemplateFrame renders ONLY the visual artwork, decorative frame, borders,
 * seals, and background textures for any given template.
 * It NEVER renders dynamic text, signatures, or participant names.
 */
function CertificateTemplateFrame({ template = {} }) {
  const {
    designKey,
    designType,
    backgroundImage,
    backgroundFit = "stretch",
    theme = {}
  } = template;

  // Resolved CSS objectFit
  const resolvedObjectFit =
    backgroundFit === "stretch" ? "fill" : backgroundFit === "contain" ? "contain" : "cover";

  // If image background template
  if (designType === "image-background" || backgroundImage) {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: resolvedObjectFit }}
          draggable={false}
        />
      </div>
    );
  }

  // Classic Appreciation (New reference-inspired design)
  if (designKey === "classic-appreciation" || template.id === "classic-appreciation") {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-[#fffdfa]">
        {/* Subtle Wave Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#4a3b32 1px, transparent 1px)`,
            backgroundSize: "28px 28px"
          }}
        />

        {/* Outer Brown Double Border */}
        <div className="absolute inset-8 rounded-xl border-4 border-[#4a3b32] p-2">
          <div className="h-full w-full border-2 border-[#b89759]" />
        </div>

        {/* Ornate Corner Flourishes */}
        {[
          "top-10 left-10",
          "top-10 right-10 rotate-90",
          "bottom-10 right-10 rotate-180",
          "bottom-10 left-10 -rotate-90"
        ].map((pos, idx) => (
          <svg key={idx} className={`absolute h-20 w-20 text-[#b89759] ${pos}`} viewBox="0 0 100 100">
            <path d="M10 90 C 20 40, 40 20, 90 10" fill="none" stroke="currentColor" strokeWidth="4" />
            <path d="M20 80 C 30 45, 45 30, 80 20" fill="none" stroke="#4a3b32" strokeWidth="2" />
            <circle cx="35" cy="65" r="5" fill="currentColor" />
          </svg>
        ))}
      </div>
    );
  }

  // Classic Ornate
  if (designKey === "classic-ornate") {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-[#faf8f5]">
        <div className="absolute inset-8 border-[6px] border-[#1e293b] p-3">
          <div className="h-full w-full border-2 border-[#d97706]" />
        </div>
        {["top-10 left-10", "top-10 right-10 rotate-90", "bottom-10 right-10 rotate-180", "bottom-10 left-10 -rotate-90"].map((pos, idx) => (
          <svg key={idx} className={`absolute h-24 w-24 text-[#d97706] ${pos}`} viewBox="0 0 100 100">
            <path d="M10 90 C 25 45, 45 25, 90 10" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="30" cy="70" r="6" fill="#1e293b" />
          </svg>
        ))}
      </div>
    );
  }

  // Modern Wave
  if (designKey === "modern-wave") {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="absolute inset-8 border-2 border-teal-600/40 rounded-2xl" />
        <svg className="absolute top-0 right-0 h-64 w-96 text-teal-600/20" viewBox="0 0 400 300" fill="currentColor">
          <path d="M0 0 H400 V300 C250 200 150 250 0 0 Z" />
        </svg>
        <svg className="absolute bottom-0 left-0 h-64 w-96 text-amber-500/20" viewBox="0 0 400 300" fill="currentColor">
          <path d="M0 300 H400 V0 C250 150 150 100 0 300 Z" />
        </svg>
      </div>
    );
  }

  // Vintage Border
  if (designKey === "vintage-border") {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-[#fbf9f4]">
        <div className="absolute inset-10 border-4 border-double border-[#78350f] p-2">
          <div className="h-full w-full border border-[#b45309]" />
        </div>
      </div>
    );
  }

  // Gold Corner
  if (designKey === "gold-corner") {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-white">
        <div className="absolute inset-8 border border-amber-300 p-2">
          <div className="h-full w-full border-2 border-amber-500/60" />
        </div>
        {[
          "top-10 left-10 border-t-4 border-l-4",
          "top-10 right-10 border-t-4 border-r-4",
          "bottom-10 left-10 border-b-4 border-l-4",
          "bottom-10 right-10 border-b-4 border-r-4"
        ].map((pos, idx) => (
          <div key={idx} className={`absolute h-16 w-16 border-amber-500 ${pos}`} />
        ))}
      </div>
    );
  }

  // Dark Luxury
  if (designKey === "dark-luxury") {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-8 border-2 border-amber-500/50 p-2">
          <div className="h-full w-full border border-amber-400/30" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>
    );
  }

  // Floral Creative
  if (designKey === "floral-creative") {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-gradient-to-br from-teal-50/40 via-white to-orange-50/30">
        <div className="absolute inset-8 border-2 border-teal-600/30 rounded-3xl" />
      </div>
    );
  }

  // Playful Award
  if (designKey === "playful-award") {
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-gradient-to-br from-sky-50 via-white to-amber-50">
        <div className="absolute inset-8 border-4 border-sky-400/50 rounded-3xl" />
      </div>
    );
  }

  // Academic Seal / Default Blue Corporate
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden bg-white">
      <div className="absolute inset-8 border-4 border-[#1e3a8a] p-2">
        <div className="h-full w-full border-2 border-[#3b82f6]/40" />
      </div>
      {/* Corner Ornaments */}
      {[
        "top-10 left-10 border-t-2 border-l-2",
        "top-10 right-10 border-t-2 border-r-2",
        "bottom-10 left-10 border-b-2 border-l-2",
        "bottom-10 right-10 border-b-2 border-r-2"
      ].map((pos, idx) => (
        <div key={idx} className={`absolute h-12 w-12 border-[#1e3a8a] ${pos}`} />
      ))}
    </div>
  );
}

export default CertificateTemplateFrame;
