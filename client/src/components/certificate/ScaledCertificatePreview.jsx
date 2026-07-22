import React, { useState, useEffect, useRef } from "react";
import CertificateCanvas, { CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT } from "./CertificateCanvas.jsx";

/**
 * ScaledCertificatePreview renders CertificateCanvas inside a responsive scaling container.
 * Uses ResizeObserver to calculate scale = wrapperWidth / 1600.
 * The CertificateCanvas inside remains fixed at 1600x1131.
 */
function ScaledCertificatePreview({
  id = "certificate-preview",
  certificateData = {}
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / CERTIFICATE_WIDTH);
        }
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const scaledHeight = CERTIFICATE_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl bg-slate-900/5 p-0 shadow-md border border-slate-200"
      style={{ height: `${scaledHeight}px` }}
    >
      <div
        style={{
          width: `${CERTIFICATE_WIDTH}px`,
          height: `${CERTIFICATE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left"
        }}
      >
        <CertificateCanvas id={id} {...certificateData} />
      </div>
    </div>
  );
}

export default ScaledCertificatePreview;
