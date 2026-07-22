import React from "react";

/**
 * Pure SVG Frame Renderer for Certificate Backgrounds and Artwork.
 * Renders SVG elements (<rect>, <path>, <g>, <circle>, <image>) strictly.
 */
function CertificateSvgFrame({ template = {} }) {
  const {
    designKey,
    designType,
    backgroundImage,
    backgroundMode = "stretch"
  } = template;

  // Resolve SVG preserveAspectRatio attribute for image background templates
  const resolvedPreserveAspectRatio =
    backgroundMode === "contain"
      ? "xMidYMid meet"
      : backgroundMode === "cover"
      ? "xMidYMid slice"
      : "none";

  // PNG / Image background template
  if (designType === "image-background" || backgroundImage) {
    return (
      <g className="certificate-svg-frame-image">
        <rect width="1600" height="1131" fill="#ffffff" />
        <image
          href={backgroundImage}
          x="0"
          y="0"
          width="1600"
          height="1131"
          preserveAspectRatio={resolvedPreserveAspectRatio}
        />
      </g>
    );
  }

  // Classic Appreciation (New original inspiration design)
  if (designKey === "classic-appreciation" || template.id === "classic-appreciation") {
    return (
      <g className="certificate-svg-frame-classic-appreciation">
        {/* Warm Cream Base Background */}
        <rect width="1600" height="1131" fill="#fffdfa" />

        {/* Outer Dark Brown Frame */}
        <rect x="50" y="50" width="1500" height="1031" fill="none" stroke="#4a3b32" strokeWidth="6" rx="16" />

        {/* Inner Gold Thin Border */}
        <rect x="64" y="64" width="1472" height="1003" fill="none" stroke="#b89759" strokeWidth="2.5" rx="12" />

        {/* Ornate Corner Flourish Paths */}
        {/* Top-Left Corner */}
        <g transform="translate(70, 70)">
          <path d="M0,70 Q40,40 70,0" fill="none" stroke="#b89759" strokeWidth="4" />
          <path d="M10,60 Q35,35 60,10" fill="none" stroke="#4a3b32" strokeWidth="2" />
          <circle cx="28" cy="28" r="5" fill="#b89759" />
        </g>
        {/* Top-Right Corner */}
        <g transform="translate(1530, 70) scale(-1, 1)">
          <path d="M0,70 Q40,40 70,0" fill="none" stroke="#b89759" strokeWidth="4" />
          <path d="M10,60 Q35,35 60,10" fill="none" stroke="#4a3b32" strokeWidth="2" />
          <circle cx="28" cy="28" r="5" fill="#b89759" />
        </g>
        {/* Bottom-Left Corner */}
        <g transform="translate(70, 1061) scale(1, -1)">
          <path d="M0,70 Q40,40 70,0" fill="none" stroke="#b89759" strokeWidth="4" />
          <path d="M10,60 Q35,35 60,10" fill="none" stroke="#4a3b32" strokeWidth="2" />
          <circle cx="28" cy="28" r="5" fill="#b89759" />
        </g>
        {/* Bottom-Right Corner */}
        <g transform="translate(1530, 1061) scale(-1, -1)">
          <path d="M0,70 Q40,40 70,0" fill="none" stroke="#b89759" strokeWidth="4" />
          <path d="M10,60 Q35,35 60,10" fill="none" stroke="#4a3b32" strokeWidth="2" />
          <circle cx="28" cy="28" r="5" fill="#b89759" />
        </g>
      </g>
    );
  }

  // Classic Ornate
  if (designKey === "classic-ornate") {
    return (
      <g className="certificate-svg-frame-classic-ornate">
        <rect width="1600" height="1131" fill="#faf8f5" />
        <rect x="50" y="50" width="1500" height="1031" fill="none" stroke="#1e293b" strokeWidth="8" />
        <rect x="66" y="66" width="1468" height="999" fill="none" stroke="#d97706" strokeWidth="3" />
        <g transform="translate(80, 80)">
          <path d="M0,80 Q45,45 80,0" fill="none" stroke="#d97706" strokeWidth="4" />
          <circle cx="35" cy="35" r="7" fill="#1e293b" />
        </g>
        <g transform="translate(1520, 80) scale(-1, 1)">
          <path d="M0,80 Q45,45 80,0" fill="none" stroke="#d97706" strokeWidth="4" />
          <circle cx="35" cy="35" r="7" fill="#1e293b" />
        </g>
      </g>
    );
  }

  // Modern Wave
  if (designKey === "modern-wave") {
    return (
      <g className="certificate-svg-frame-modern-wave">
        <rect width="1600" height="1131" fill="#f8fafc" />
        {/* Top-Right Teal Wave */}
        <path d="M1000,0 C1200,180 1400,120 1600,300 V0 Z" fill="#0d9488" opacity="0.18" />
        {/* Bottom-Left Amber Wave */}
        <path d="M0,831 C200,950 400,900 600,1131 H0 Z" fill="#f59e0b" opacity="0.18" />
        <rect x="60" y="60" width="1480" height="1011" fill="none" stroke="#0d9488" strokeWidth="3" strokeOpacity="0.4" rx="20" />
      </g>
    );
  }

  // Vintage Border
  if (designKey === "vintage-border") {
    return (
      <g className="certificate-svg-frame-vintage-border">
        <rect width="1600" height="1131" fill="#fbf9f4" />
        <rect x="60" y="60" width="1480" height="1011" fill="none" stroke="#78350f" strokeWidth="6" />
        <rect x="72" y="72" width="1456" height="987" fill="none" stroke="#b45309" strokeWidth="2" />
      </g>
    );
  }

  // Gold Corner
  if (designKey === "gold-corner") {
    return (
      <g className="certificate-svg-frame-gold-corner">
        <rect width="1600" height="1131" fill="#ffffff" />
        <rect x="50" y="50" width="1500" height="1031" fill="none" stroke="#f59e0b" strokeWidth="3" strokeOpacity="0.6" />
        {/* Gold Corner Brackets */}
        <path d="M50,130 V50 H130" fill="none" stroke="#d97706" strokeWidth="6" />
        <path d="M1550,130 V50 H1470" fill="none" stroke="#d97706" strokeWidth="6" />
        <path d="M50,1001 V1081 H130" fill="none" stroke="#d97706" strokeWidth="6" />
        <path d="M1550,1001 V1081 H1470" fill="none" stroke="#d97706" strokeWidth="6" />
      </g>
    );
  }

  // Dark Luxury
  if (designKey === "dark-luxury") {
    return (
      <g className="certificate-svg-frame-dark-luxury">
        <rect width="1600" height="1131" fill="#0f172a" />
        <circle cx="800" cy="565" r="450" fill="#f59e0b" opacity="0.04" />
        <rect x="50" y="50" width="1500" height="1031" fill="none" stroke="#d97706" strokeWidth="4" strokeOpacity="0.6" />
        <rect x="64" y="64" width="1472" height="1003" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.4" />
      </g>
    );
  }

  // Floral Creative
  if (designKey === "floral-creative") {
    return (
      <g className="certificate-svg-frame-floral-creative">
        <rect width="1600" height="1131" fill="#faf5ff" />
        <rect x="60" y="60" width="1480" height="1011" fill="none" stroke="#c084fc" strokeWidth="3" strokeOpacity="0.4" rx="24" />
        {/* Floral Top Left Graphic */}
        <g transform="translate(80, 80)">
          <circle cx="20" cy="20" r="15" fill="#ea580c" opacity="0.4" />
          <circle cx="45" cy="25" r="10" fill="#0d9488" opacity="0.4" />
          <circle cx="25" cy="45" r="12" fill="#9333ea" opacity="0.4" />
        </g>
      </g>
    );
  }

  // Playful Award
  if (designKey === "playful-award") {
    return (
      <g className="certificate-svg-frame-playful-award">
        <rect width="1600" height="1131" fill="#f0f9ff" />
        <rect x="60" y="60" width="1480" height="1011" fill="none" stroke="#38bdf8" strokeWidth="5" rx="30" />
        <circle cx="120" cy="120" r="30" fill="#fbbf24" opacity="0.5" />
        <circle cx="1480" cy="120" r="40" fill="#f472b6" opacity="0.4" />
        <rect x="100" y="1000" width="60" height="60" fill="#34d399" opacity="0.4" transform="rotate(15 130 1030)" />
      </g>
    );
  }

  // Default Academic / Corporate Blue
  return (
    <g className="certificate-svg-frame-academic">
      <rect width="1600" height="1131" fill="#ffffff" />
      <rect x="50" y="50" width="1500" height="1031" fill="none" stroke="#1e3a8a" strokeWidth="6" />
      <rect x="64" y="64" width="1472" height="1003" fill="none" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" />
      <path d="M50,110 V50 H110" fill="none" stroke="#1e3a8a" strokeWidth="4" />
      <path d="M1550,110 V50 H1490" fill="none" stroke="#1e3a8a" strokeWidth="4" />
      <path d="M50,1021 V1081 H110" fill="none" stroke="#1e3a8a" strokeWidth="4" />
      <path d="M1550,1021 V1081 H1490" fill="none" stroke="#1e3a8a" strokeWidth="4" />
    </g>
  );
}

export default CertificateSvgFrame;
