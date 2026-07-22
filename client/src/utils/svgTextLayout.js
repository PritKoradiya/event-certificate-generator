/**
 * Utility module for SVG text measurement, font fitting, and line wrapping.
 * Uses an off-screen HTML5 Canvas context ONLY for measuring text metrics.
 */

let canvasContext = null;

function getCanvasContext() {
  if (!canvasContext && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvasContext = canvas.getContext("2d");
  }
  return canvasContext;
}

/**
 * Measure text width in pixels using canvas measurement.
 */
export function measureTextWidth(text, fontSize = 16, fontFamily = "serif", fontWeight = "normal") {
  const ctx = getCanvasContext();
  if (!ctx) {
    // Fallback heuristic if canvas context is unavailable
    return (text || "").length * fontSize * 0.55;
  }

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}, Georgia, serif`;
  const metrics = ctx.measureText(text || "");
  return metrics.width;
}

/**
 * Calculates optimal font size so text fits within maxWidth, bounded by minimumSize and preferredSize.
 */
export function fitTextSize({
  text = "",
  maxWidth = 1000,
  preferredSize = 80,
  minimumSize = 40,
  fontFamily = "serif",
  fontWeight = "bold"
}) {
  const cleanText = String(text).trim();
  if (!cleanText) {
    return preferredSize;
  }

  let size = preferredSize;
  while (size > minimumSize) {
    const width = measureTextWidth(cleanText, size, fontFamily, fontWeight);
    if (width <= maxWidth) {
      return size;
    }
    size -= 2;
  }

  return minimumSize;
}

/**
 * Wraps text into an array of lines fitting within maxWidth up to maximumLines.
 */
export function wrapText({
  text = "",
  maxWidth = 1000,
  fontSize = 20,
  fontFamily = "sans-serif",
  fontWeight = "normal",
  maximumLines = 3
}) {
  const cleanText = String(text).trim();
  if (!cleanText) {
    return { lines: [""], fontSize, lineHeight: Math.round(fontSize * 1.25) };
  }

  // First check if whole text fits on 1 line
  const fullWidth = measureTextWidth(cleanText, fontSize, fontFamily, fontWeight);
  if (fullWidth <= maxWidth) {
    return {
      lines: [cleanText],
      fontSize,
      lineHeight: Math.round(fontSize * 1.25)
    };
  }

  // Split into words and wrap
  const words = cleanText.split(/\s+/);
  const lines = [];
  let currentLine = words[0] || "";

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = `${currentLine} ${word}`;
    const testWidth = measureTextWidth(testLine, fontSize, fontFamily, fontWeight);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;

      if (lines.length === maximumLines - 1) {
        // Remaining words go into last line
        const remainingWords = words.slice(i).join(" ");
        lines.push(remainingWords);
        break;
      }
    }
  }

  if (lines.length < maximumLines && currentLine && lines[lines.length - 1] !== currentLine) {
    lines.push(currentLine);
  }

  // If even with wrapping, lines exceed maximumLines or last line overflows, adjust font size
  if (lines.length > maximumLines && fontSize > 14) {
    return wrapText({
      text: cleanText,
      maxWidth,
      fontSize: fontSize - 2,
      fontFamily,
      fontWeight,
      maximumLines
    });
  }

  return {
    lines: lines.slice(0, maximumLines),
    fontSize,
    lineHeight: Math.round(fontSize * 1.25)
  };
}
