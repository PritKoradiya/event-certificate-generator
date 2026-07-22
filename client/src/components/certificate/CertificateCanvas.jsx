import React, { forwardRef } from "react";
import CertificateSvg from "./CertificateSvg.jsx";

const CertificateCanvas = forwardRef(function CertificateCanvas(props, ref) {
  return <CertificateSvg ref={ref} {...props} />;
});

export default CertificateCanvas;
