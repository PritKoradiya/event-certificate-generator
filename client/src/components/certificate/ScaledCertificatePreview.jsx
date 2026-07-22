import React, { forwardRef } from "react";
import CertificateSvg from "./CertificateSvg.jsx";

const ScaledCertificatePreview = forwardRef(function ScaledCertificatePreview(
  { id = "certificate-preview-svg", certificateData = {} },
  ref
) {
  return (
    <div className="certificate-preview-shell">
      <CertificateSvg ref={ref} id={id} {...certificateData} />
    </div>
  );
});

export default ScaledCertificatePreview;
