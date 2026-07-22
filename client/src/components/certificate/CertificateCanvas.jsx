import React from "react";
import templateData from "../../data/templateData.js";
import CertificateTemplateFrame from "./CertificateTemplateFrame.jsx";
import CertificateContentLayout from "./CertificateContentLayout.jsx";

const CERTIFICATE_WIDTH = 1600;
const CERTIFICATE_HEIGHT = 1131;

const templateMap = templateData.reduce((acc, item) => {
  if (item.id) acc[item.id] = item;
  if (item.name) acc[item.name] = item;
  if (item.designKey) acc[item.designKey] = item;
  return acc;
}, {});

function CertificateCanvas({
  id = "certificate-canvas",
  participantName = "Pritkumar Koradiya",
  organizationName = "School of Engineering, PP Savani University",
  eventName = "International Tech Summit 2026",
  certificateCategory = "Seminar",
  certificateTitle = "Certificate of Participation",
  eventDate = "2026-08-15",
  description = "for successfully attending and participating in the technical sessions and workshops.",
  templateStyle = "Classic Certificate",
  certificateId = "CERT-2026-0001",
  authorizedSignatureName = "Dr. Jayshri Patil",
  deanName = "Dr. Niraj Shah",
  designKey = "",
  backgroundImage = "",
  safeArea = null,
  textTheme = "",
  exportMode = false
}) {
  // Resolve template object
  const selectedTemplate =
    templateMap[designKey] ||
    templateMap[templateStyle] ||
    templateData[0];

  const mergedTemplate = {
    ...selectedTemplate,
    backgroundImage: backgroundImage || selectedTemplate?.backgroundImage,
    designType: selectedTemplate?.designType || (backgroundImage ? "image-background" : "vector"),
    textTheme: textTheme || selectedTemplate?.textTheme || "dark"
  };

  const isDark = mergedTemplate.textTheme === "light" || mergedTemplate.designKey === "dark-luxury";

  return (
    <div
      id={id}
      className="certificate-canvas"
      style={{
        width: `${CERTIFICATE_WIDTH}px`,
        height: `${CERTIFICATE_HEIGHT}px`,
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        background: "#ffffff",
        transform: "none",
        opacity: 1,
        filter: "none"
      }}
    >
      {/* Decorative Artwork Frame */}
      <CertificateTemplateFrame template={mergedTemplate} />

      {/* Standardized Safe-Area Content Layout */}
      <CertificateContentLayout
        participantName={participantName}
        organizationName={organizationName}
        eventName={eventName}
        certificateCategory={certificateCategory}
        certificateTitle={certificateTitle}
        eventDate={eventDate}
        description={description}
        certificateId={certificateId}
        authorizedSignatureName={authorizedSignatureName}
        deanName={deanName}
        isDarkTheme={isDark}
        themeColors={mergedTemplate.theme || {}}
      />
    </div>
  );
}

export { CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT };
export default CertificateCanvas;
