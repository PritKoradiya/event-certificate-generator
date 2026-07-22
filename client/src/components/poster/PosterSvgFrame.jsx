import React from "react";

/**
 * PosterSvgFrame
 * Responsible ONLY for background color/gradient, patterns, decorative shapes,
 * card background shapes, borders, and CTA background containers.
 * NO dynamic text is rendered here.
 */
function PosterSvgFrame({ theme, layoutVariant }) {
  const gradientId = `poster-bg-gradient-${theme.backgroundStart.replace("#", "")}`;
  const headingGradId = `poster-heading-grad-${theme.headingGradientStart.replace("#", "")}`;
  const cardGradId = `poster-card-grad-${theme.backgroundStart.replace("#", "")}`;

  return (
    <g className="poster-svg-frame">
      <defs>
        {/* Main Background Gradient */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.backgroundStart} />
          <stop offset="50%" stopColor={theme.backgroundMid || theme.backgroundStart} />
          <stop offset="100%" stopColor={theme.backgroundEnd} />
        </linearGradient>

        {/* Title Text Gradient */}
        <linearGradient id={headingGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={theme.headingGradientStart} />
          <stop offset="50%" stopColor={theme.accentSecondary || "#ffffff"} />
          <stop offset="100%" stopColor={theme.headingGradientEnd} />
        </linearGradient>

        {/* Card Background Gradient */}
        <linearGradient id={cardGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.cardBackground} stopOpacity={theme.cardBackgroundOpacity || 0.8} />
          <stop offset="100%" stopColor={theme.cardBackground} stopOpacity={(theme.cardBackgroundOpacity || 0.8) * 0.9} />
        </linearGradient>

        {/* Subtle Background Pattern */}
        <pattern id="poster-dot-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#ffffff" fillOpacity="0.04" />
        </pattern>

        {/* Event Image Clip Path */}
        <clipPath id="event-img-clip">
          <rect x="65" y="480" width="480" height="355" rx="24" />
        </clipPath>

        {/* Logo Image Clip Path */}
        <clipPath id="logo-img-clip">
          <rect x="65" y="55" width="65" height="65" rx="16" />
        </clipPath>
      </defs>

      {/* 1. Main Background Rect */}
      <rect x="0" y="0" width="1080" height="1350" fill={`url(#${gradientId})`} />

      {/* 2. Background Pattern Layer */}
      <rect x="0" y="0" width="1080" height="1350" fill="url(#poster-dot-pattern)" />

      {/* 3. Decorative Ornaments / Ambient Glow Circles (behind media & content) */}
      <circle cx="-50" cy="-50" r="380" fill={theme.accent} fillOpacity="0.15" style={{ filter: "blur(60px)" }} />
      <circle cx="1130" cy="1400" r="420" fill={theme.accentSecondary || theme.accent} fillOpacity="0.12" style={{ filter: "blur(70px)" }} />
      <circle cx="1000" cy="300" r="250" fill={theme.headingGradientStart} fillOpacity="0.08" style={{ filter: "blur(50px)" }} />

      {/* 4. Canvas Border Frame */}
      <rect
        x="20"
        y="20"
        width="1040"
        height="1310"
        rx="36"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.08"
        strokeWidth="2"
      />

      {/* 5. Header Zone Ornaments */}
      {/* Category Badge Box */}
      <rect
        x="850"
        y="65"
        width="165"
        height="46"
        rx="23"
        fill={theme.badgeBackground}
        stroke={theme.border}
        strokeWidth="1.5"
      />

      {/* Header Divider Line */}
      <line x1="65" y1="155" x2="1015" y2="155" stroke={theme.border} strokeWidth="1" strokeDasharray={layoutVariant === "cyber" ? "6 4" : undefined} />

      {/* 6. Title Zone Divider */}
      <rect
        x="440"
        y="430"
        width="200"
        height="6"
        rx="3"
        fill={`url(#${headingGradId})`}
      />

      {/* 7. Media & Speaker Card Shapes */}
      {/* Image Frame Box Background */}
      <rect
        x="65"
        y="480"
        width="480"
        height="355"
        rx="24"
        fill="#090d16"
        stroke={theme.border}
        strokeWidth="2"
      />

      {/* Speaker Card Box Background */}
      <rect
        x="565"
        y="480"
        width="450"
        height="355"
        rx="24"
        fill={`url(#${cardGradId})`}
        stroke={theme.border}
        strokeWidth="2"
      />

      {/* 8. Description & Details Container Shape */}
      <rect
        x="65"
        y="865"
        width="950"
        height="290"
        rx="24"
        fill={`url(#${cardGradId})`}
        stroke={theme.border}
        strokeWidth="2"
      />

      {/* Description / Details Inner Divider Line */}
      <line x1="95" y1="1030" x2="985" y2="1030" stroke={theme.border} strokeWidth="1" />

      {/* Detail Cards (Date, Time, Venue) Background Boxes */}
      {/* Date Sub-Card */}
      <rect x="95" y="1045" width="280" height="90" rx="16" fill="#ffffff" fillOpacity="0.06" stroke={theme.border} strokeWidth="1" />
      {/* Time Sub-Card */}
      <rect x="400" y="1045" width="280" height="90" rx="16" fill="#ffffff" fillOpacity="0.06" stroke={theme.border} strokeWidth="1" />
      {/* Venue Sub-Card */}
      <rect x="705" y="1045" width="280" height="90" rx="16" fill="#ffffff" fillOpacity="0.06" stroke={theme.border} strokeWidth="1" />

      {/* 9. Footer Divider Line */}
      <line x1="65" y1="1185" x2="1015" y2="1185" stroke={theme.border} strokeWidth="1" />
    </g>
  );
}

export default React.memo(PosterSvgFrame);
