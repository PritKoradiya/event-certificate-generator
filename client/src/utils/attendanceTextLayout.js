/**
 * Fits text inside a specific maximum PDF width (in mm) by reducing font size in 0.2-point increments.
 */
export const fitPdfTextToWidth = ({
  pdf,
  text,
  preferredSize,
  minimumSize,
  maxWidth,
  fontStyle = "normal"
}) => {
  if (!pdf || !text) return preferredSize;

  let currentSize = preferredSize;
  pdf.setFont("times", fontStyle);
  pdf.setFontSize(currentSize);

  let textWidth = pdf.getTextWidth(text);

  while (textWidth > maxWidth && currentSize > minimumSize + 0.01) {
    currentSize = Math.max(minimumSize, Number((currentSize - 0.2).toFixed(2)));
    pdf.setFontSize(currentSize);
    textWidth = pdf.getTextWidth(text);
  }

  return currentSize;
};

// Canvas context singleton for SVG text measurement
let measurementCanvasCtx = null;
const getMeasurementCanvasContext = () => {
  if (typeof document === "undefined") return null;
  if (!measurementCanvasCtx) {
    const canvas = document.createElement("canvas");
    measurementCanvasCtx = canvas.getContext("2d");
  }
  return measurementCanvasCtx;
};

/**
 * Fits text inside a specific maximum SVG width (in mm) by reducing font size in 0.2-point increments.
 */
export const fitSvgAttendanceText = ({
  text,
  preferredSize,
  minimumSize,
  maxWidth,
  fontFamily = "'Times New Roman', Times, serif",
  fontWeight = "normal"
}) => {
  if (!text) return preferredSize;
  const ctx = getMeasurementCanvasContext();
  if (!ctx) return preferredSize;

  let currentSize = preferredSize;

  // 1 pt = (25.4 / 72) mm ≈ 0.352778 mm. In SVG with 1 unit = 1mm, font-size in mm is currentSize * (25.4/72)
  const getMeasuredWidthMm = (size) => {
    const pxSize = (size * 96) / 72; // Convert pt to px for canvas font setting
    ctx.font = `${fontWeight} ${pxSize}px ${fontFamily}`;
    const pxWidth = ctx.measureText(text).width;
    return (pxWidth * 25.4) / 96; // Convert canvas px to mm
  };

  let textWidthMm = getMeasuredWidthMm(currentSize);

  while (textWidthMm > maxWidth && currentSize > minimumSize + 0.01) {
    currentSize = Math.max(minimumSize, Number((currentSize - 0.2).toFixed(2)));
    textWidthMm = getMeasuredWidthMm(currentSize);
  }

  return currentSize;
};

export default {
  fitPdfTextToWidth,
  fitSvgAttendanceText
};
