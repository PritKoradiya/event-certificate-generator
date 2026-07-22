import React from "react";
import ScaledCertificatePreview from "./certificate/ScaledCertificatePreview.jsx";

function CertificatePreview({ certificateData = {}, previewId = "certificate-preview" }) {
  return (
    <ScaledCertificatePreview
      id={previewId}
      certificateData={certificateData}
    />
  );
}

export default CertificatePreview;
