import React, { forwardRef } from "react";
import CertificateSvg from "./certificate/CertificateSvg.jsx";

const CertificatePreview = forwardRef(function CertificatePreview(
  { certificateData = {}, previewId = "certificate-preview-svg" },
  ref
) {
  return (
    <div className="certificate-preview-shell">
      <CertificateSvg
        ref={ref}
        id={previewId}
        {...certificateData}
      />
    </div>
  );
});

export default CertificatePreview;
