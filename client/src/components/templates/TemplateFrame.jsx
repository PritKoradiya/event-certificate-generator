import React from "react";
import CertificateSvg from "../certificate/CertificateSvg.jsx";

function TemplateFrame({ data, config }) {
  return (
    <CertificateSvg
      {...data}
      designKey={config?.designKey || ""}
    />
  );
}

export default TemplateFrame;
