import React from "react";

/**
 * PosterSvgForeground
 * Renders non-intrusive foreground accents, subtle grid lines, or corner markers.
 * Must NOT overlap any dynamic text or media content.
 */
function PosterSvgForeground({ theme, layoutVariant }) {
  return (
    <g className="poster-svg-foreground" pointerEvents="none">
      {/* Corner Frame Tech Accents (Non-overlapping) */}
      {layoutVariant === "cyber" || layoutVariant === "tech" ? (
        <g stroke={theme.accentSecondary || theme.accent} strokeWidth="2" fill="none" opacity="0.6">
          <path d="M 35 60 L 35 35 L 60 35" />
          <path d="M 1020 35 L 1045 35 L 1045 60" />
          <path d="M 35 1290 L 35 1315 L 60 1315" />
          <path d="M 1020 1315 L 1045 1315 L 1045 1290" />
        </g>
      ) : null}

      {/* Decorative Minimal Corner Dots */}
      <circle cx="35" cy="35" r="3" fill={theme.accent} fillOpacity="0.4" />
      <circle cx="1045" cy="35" r="3" fill={theme.accent} fillOpacity="0.4" />
      <circle cx="35" cy="1315" r="3" fill={theme.accent} fillOpacity="0.4" />
      <circle cx="1045" cy="1315" r="3" fill={theme.accent} fillOpacity="0.4" />
    </g>
  );
}

export default React.memo(PosterSvgForeground);
