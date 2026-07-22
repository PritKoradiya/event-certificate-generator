import React from "react";

/**
 * PosterSvgMedia
 * Renders logo image, event banner image, or original SVG placeholders.
 */
function PosterSvgMedia({ posterImage, organizationLogo, theme }) {
  return (
    <g className="poster-svg-media">
      {/* 1. ORGANIZATION LOGO */}
      {organizationLogo ? (
        <g>
          {/* Logo container background */}
          <rect
            x="65"
            y="55"
            width="65"
            height="65"
            rx="16"
            fill="#ffffff"
            fillOpacity="0.1"
            stroke={theme.border}
            strokeWidth="1.5"
          />
          <image
            href={organizationLogo}
            x="67"
            y="57"
            width="61"
            height="61"
            preserveAspectRatio="xMidYMid meet"
            clipPath="url(#logo-img-clip)"
          />
        </g>
      ) : (
        <g>
          {/* Logo Placeholder Box */}
          <rect
            x="65"
            y="55"
            width="65"
            height="65"
            rx="16"
            fill="#ffffff"
            fillOpacity="0.08"
            stroke={theme.border}
            strokeWidth="1.5"
          />
          <text
            x="97.5"
            y="93"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="14"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            LOGO
          </text>
        </g>
      )}

      {/* 2. EVENT BANNER IMAGE */}
      {posterImage ? (
        <g>
          <image
            href={posterImage}
            x="65"
            y="480"
            width="480"
            height="355"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#event-img-clip)"
          />
          {/* Subtle overlay border for crisp edges */}
          <rect
            x="65"
            y="480"
            width="480"
            height="355"
            rx="24"
            fill="none"
            stroke={theme.border}
            strokeWidth="2"
          />
        </g>
      ) : (
        <g clipPath="url(#event-img-clip)">
          {/* Event Image Placeholder Canvas */}
          <rect x="65" y="480" width="480" height="355" rx="24" fill="#0f172a" />
          <rect
            x="85"
            y="500"
            width="440"
            height="315"
            rx="16"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.1"
            strokeDasharray="6 4"
            strokeWidth="1.5"
          />

          {/* SVG Camera / Mountain Image Icon */}
          <g transform="translate(265, 590)">
            <rect x="-35" y="-25" width="70" height="50" rx="8" fill="none" stroke={theme.accentSecondary || "#38bdf8"} strokeWidth="2.5" strokeOpacity="0.6" />
            <circle cx="-15" cy="-8" r="6" fill={theme.accentSecondary || "#38bdf8"} fillOpacity="0.6" />
            <path d="M-30 18 L-10 -5 L5 10 L15 0 L30 18 Z" fill={theme.accentSecondary || "#38bdf8"} fillOpacity="0.4" />
          </g>

          {/* Label */}
          <text
            x="305"
            y="670"
            textAnchor="middle"
            fill={theme.secondaryText}
            fontSize="14"
            fontWeight="800"
            fontFamily="sans-serif"
            letterSpacing="1.5"
          >
            EVENT BANNER PLACEHOLDER
          </text>
        </g>
      )}
    </g>
  );
}

export default React.memo(PosterSvgMedia);
