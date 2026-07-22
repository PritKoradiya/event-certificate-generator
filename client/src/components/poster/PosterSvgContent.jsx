import React from "react";
import { layoutPosterTitle, wrapText, fitTextSize } from "../../utils/posterSvgTextLayout.js";

/**
 * PosterSvgContent
 * Renders all dynamic text elements in strict safe coordinates.
 * Rendered AFTER background, frame, and media elements so text is NEVER covered.
 */
function PosterSvgContent({
  posterTitle = "ANNUAL INNOVATION & TECH SUMMIT 2026",
  tagline = "Empowering Next-Gen Innovators & Leaders",
  category = "Seminar",
  eventDate = "2026-08-15",
  eventTime = "10:00 AM - 04:00 PM",
  venue = "Main Auditorium, PP Savani University",
  speakerName = "Dr. Pritkumar Koradiya",
  speakerDesignation = "AI & Cloud Architecture Specialist",
  organizerName = "School of Engineering & Tech Club",
  description = "Join us for an immersive day of insightful technical talks, hands-on demonstrations, collaborative activities, and networking opportunities with leading industry professionals.",
  contactInformation = "+91 98765 43210 | info@ppsu.ac.in",
  registrationText = "Free Entry • Scan QR to Register Online",
  posterId = "POSTER-2026-0001",
  theme
}) {
  const headingGradId = `poster-heading-grad-${theme.headingGradientStart.replace("#", "")}`;

  // 1. Format Event Date
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "Date TBA";

  // 2. Organizer Text Wrapping (Max 2 lines, preferred 21px)
  const organizerWrapped = wrapText({
    text: organizerName || "Event Committee",
    fontSize: 21,
    maxWidth: 680,
    fontFamily: "sans-serif",
    fontWeight: "800",
    maximumLines: 2
  });

  // 3. Tagline Text Wrapping (Max 2 lines, preferred 17px)
  const taglineWrapped = tagline
    ? wrapText({
        text: tagline,
        fontSize: 17,
        maxWidth: 920,
        fontFamily: "sans-serif",
        fontWeight: "800",
        maximumLines: 2
      })
    : null;

  // 4. Poster Title Layout (Up to 3 lines, preferred 76px down to 42px)
  const titleLayout = layoutPosterTitle(posterTitle);

  // Calculate starting y for title so 1, 2, or 3 lines remain perfectly centered in y = 240..420 zone
  const totalTitleHeight = (titleLayout.lines.length - 1) * titleLayout.lineHeight;
  const titleCenterBaselineY = 320;
  const titleStartY = titleCenterBaselineY - totalTitleHeight / 2;

  // 5. Speaker Name & Designation Wrapping
  const speakerNameWrapped = wrapText({
    text: speakerName || "Guest Speaker Name",
    fontSize: 25,
    maxWidth: 390,
    fontFamily: "sans-serif",
    fontWeight: "900",
    maximumLines: 2
  });

  const speakerDesigWrapped = wrapText({
    text: speakerDesignation || "Designation & Organization",
    fontSize: 18,
    maxWidth: 390,
    fontFamily: "sans-serif",
    fontWeight: "600",
    maximumLines: 3
  });

  // 6. Description Text Wrapping (Max 4 lines, preferred 20px, min 16px, max width 890px)
  const descriptionWrapped = description
    ? wrapText({
        text: description,
        fontSize: 20,
        maxWidth: 890,
        fontFamily: "sans-serif",
        fontWeight: "500",
        maximumLines: 4
      })
    : null;

  // 7. Venue Text Wrapping (Max 2 lines inside Venue Card)
  const venueWrapped = wrapText({
    text: venue || "TBA",
    fontSize: 16,
    maxWidth: 250,
    fontFamily: "sans-serif",
    fontWeight: "800",
    maximumLines: 2
  });

  // 8. Time Text Fitting
  const timeFontSize = fitTextSize({
    text: eventTime || "TBA",
    preferredSize: 18,
    minimumSize: 13,
    maxWidth: 250,
    fontFamily: "sans-serif",
    fontWeight: "800"
  });

  return (
    <g className="poster-svg-content">
      {/* ========================================== */}
      {/* 1. HEADER ZONE TEXT                        */}
      {/* ========================================== */}
      <g>
        <text
          x="145"
          y="76"
          fill={theme.secondaryText}
          fontSize="12"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="1.5"
        >
          ORGANIZED BY
        </text>

        {organizerWrapped.lines.map((line, idx) => (
          <text
            key={`org-line-${idx}`}
            x="145"
            y={102 + idx * organizerWrapped.lineHeight}
            fill={theme.primaryText}
            fontSize={organizerWrapped.fontSize}
            fontWeight="800"
            fontFamily="sans-serif"
          >
            {line}
          </text>
        ))}
      </g>

      {/* Category Badge Text */}
      <text
        x="932.5"
        y="94"
        textAnchor="middle"
        fill={theme.badgeText}
        fontSize="15"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="1.5"
      >
        {String(category || "EVENT").toUpperCase()}
      </text>

      {/* ========================================== */}
      {/* 2. TITLE & TAGLINE ZONE TEXT              */}
      {/* ========================================== */}
      {taglineWrapped && (
        <g>
          {taglineWrapped.lines.map((line, idx) => (
            <text
              key={`tagline-line-${idx}`}
              x="540"
              y={215 + idx * taglineWrapped.lineHeight}
              textAnchor="middle"
              fill={theme.accentSecondary || "#38bdf8"}
              fontSize={taglineWrapped.fontSize}
              fontWeight="800"
              fontFamily="sans-serif"
              letterSpacing="2"
            >
              {line.toUpperCase()}
            </text>
          ))}
        </g>
      )}

      {/* MAIN POSTER TITLE */}
      <g>
        {titleLayout.lines.map((line, idx) => (
          <text
            key={`title-line-${idx}`}
            x="540"
            y={titleStartY + idx * titleLayout.lineHeight}
            textAnchor="middle"
            fill={`url(#${headingGradId})`}
            fontSize={titleLayout.fontSize}
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="-0.5"
          >
            {line.toUpperCase()}
          </text>
        ))}
      </g>

      {/* ========================================== */}
      {/* 3. SPEAKER CARD TEXT                       */}
      {/* ========================================== */}
      <g>
        {/* Card Header Label */}
        <text
          x="595"
          y="525"
          fill={theme.accentSecondary || "#38bdf8"}
          fontSize="13"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="1.5"
        >
          FEATURED SPEAKER / GUEST
        </text>

        {/* Speaker Name */}
        {speakerNameWrapped.lines.map((line, idx) => (
          <text
            key={`spk-name-${idx}`}
            x="595"
            y={565 + idx * speakerNameWrapped.lineHeight}
            fill={theme.primaryText}
            fontSize={speakerNameWrapped.fontSize}
            fontWeight="900"
            fontFamily="sans-serif"
          >
            {line}
          </text>
        ))}

        {/* Speaker Designation */}
        {speakerDesigWrapped.lines.map((line, idx) => (
          <text
            key={`spk-desig-${idx}`}
            x="595"
            y={660 + idx * speakerDesigWrapped.lineHeight}
            fill={theme.secondaryText}
            fontSize={speakerDesigWrapped.fontSize}
            fontWeight="600"
            fontFamily="sans-serif"
          >
            {line}
          </text>
        ))}
      </g>

      {/* ========================================== */}
      {/* 4. DESCRIPTION & EVENT DETAILS TEXT       */}
      {/* ========================================== */}
      {descriptionWrapped && (
        <g>
          {descriptionWrapped.lines.map((line, idx) => (
            <text
              key={`desc-line-${idx}`}
              x="95"
              y={905 + idx * descriptionWrapped.lineHeight}
              fill={theme.secondaryText}
              fontSize={descriptionWrapped.fontSize}
              fontWeight="500"
              fontFamily="sans-serif"
            >
              {line}
            </text>
          ))}
        </g>
      )}

      {/* Detail Cards Content */}
      {/* Date */}
      <g>
        <text x="235" y="1072" textAnchor="middle" fill={theme.secondaryText} fontSize="12" fontWeight="800" fontFamily="sans-serif" letterSpacing="1">
          DATE
        </text>
        <text x="235" y="1102" textAnchor="middle" fill={theme.primaryText} fontSize="17" fontWeight="900" fontFamily="sans-serif">
          {formattedDate}
        </text>
      </g>

      {/* Time */}
      <g>
        <text x="540" y="1072" textAnchor="middle" fill={theme.secondaryText} fontSize="12" fontWeight="800" fontFamily="sans-serif" letterSpacing="1">
          TIME
        </text>
        <text x="540" y="1102" textAnchor="middle" fill={theme.primaryText} fontSize={timeFontSize} fontWeight="900" fontFamily="sans-serif">
          {eventTime || "TBA"}
        </text>
      </g>

      {/* Venue */}
      <g>
        <text x="845" y="1072" textAnchor="middle" fill={theme.secondaryText} fontSize="12" fontWeight="800" fontFamily="sans-serif" letterSpacing="1">
          VENUE
        </text>
        {venueWrapped.lines.map((line, idx) => (
          <text
            key={`venue-line-${idx}`}
            x="845"
            y={1098 + idx * venueWrapped.lineHeight}
            textAnchor="middle"
            fill={theme.primaryText}
            fontSize={venueWrapped.fontSize}
            fontWeight="800"
            fontFamily="sans-serif"
          >
            {line}
          </text>
        ))}
      </g>

      {/* ========================================== */}
      {/* 5. FOOTER & CTA TEXT                       */}
      {/* ========================================== */}
      <g>
        {/* Pulsing Status Dot */}
        <circle cx="75" cy="1221" r="5" fill="#34d399" />

        {/* Registration CTA */}
        <text x="92" y="1226" fill={theme.primaryText} fontSize="16" fontWeight="800" fontFamily="sans-serif">
          {registrationText || "Free Entry • Scan QR to Register Online"}
        </text>

        {/* Contact Information */}
        <text x="1015" y="1226" textAnchor="end" fill={theme.secondaryText} fontSize="16" fontWeight="700" fontFamily="sans-serif">
          {contactInformation || ""}
        </text>

        {/* Poster ID */}
        <text x="1015" y="1255" textAnchor="end" fill={theme.secondaryText} fillOpacity="0.7" fontSize="13" fontWeight="600" fontFamily="monospace">
          {posterId || "POSTER-2026-0001"}
        </text>
      </g>
    </g>
  );
}

export default React.memo(PosterSvgContent);
