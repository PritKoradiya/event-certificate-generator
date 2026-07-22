/**
 * Utility module for SVG poster text measurement, font fitting, and line wrapping.
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
export function measureTextWidth(text, fontSize = 16, fontFamily = "sans-serif", fontWeight = "normal") {
  const cleanText = String(text || "");
  if (!cleanText) return 0;

  const ctx = getCanvasContext();
  if (!ctx) {
    // Fallback heuristic if canvas context is unavailable
    return cleanText.length * fontSize * 0.55;
  }

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}, system-ui, -apple-system, sans-serif`;
  const metrics = ctx.measureText(cleanText);
  return metrics.width;
}

/**
 * Calculates optimal font size so text fits within maxWidth, bounded by minimumSize and preferredSize.
 */
export function fitTextSize({
  text = "",
  preferredSize = 76,
  minimumSize = 42,
  maxWidth = 920,
  fontFamily = "sans-serif",
  fontWeight = "bold"
}) {
  const cleanText = String(text || "").trim();
  if (!cleanText) return preferredSize;

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
  fontSize = 20,
  maxWidth = 920,
  fontFamily = "sans-serif",
  fontWeight = "normal",
  maximumLines = 3
}) {
  const cleanText = String(text || "").trim();
  if (!cleanText) {
    return {
      lines: [""],
      fontSize,
      lineHeight: Math.round(fontSize * 1.08)
    };
  }

  let currentFontSize = fontSize;

  while (currentFontSize >= 12) {
    const words = cleanText.split(/\s+/);
    const lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = measureTextWidth(testLine, currentFontSize, fontFamily, fontWeight);

      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          // Single word is longer than maxWidth
          lines.push(word);
          currentLine = "";
        }
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    if (lines.length <= maximumLines) {
      // Also check if any individual line still exceeds maxWidth (e.g. huge single word)
      const maxLineW = Math.max(...lines.map((l) => measureTextWidth(l, currentFontSize, fontFamily, fontWeight)));
      if (maxLineW <= maxWidth) {
        return {
          lines,
          fontSize: currentFontSize,
          lineHeight: Math.round(currentFontSize * 1.08)
        };
      }
    }

    currentFontSize -= 2;
  }

  // Fallback: hard force chunking to maximumLines
  const words = cleanText.split(/\s+/);
  const chunkSize = Math.ceil(words.length / maximumLines);
  const forcedLines = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    forcedLines.push(words.slice(i, i + chunkSize).join(" "));
  }

  return {
    lines: forcedLines.slice(0, maximumLines),
    fontSize: Math.max(12, currentFontSize),
    lineHeight: Math.round(Math.max(12, currentFontSize) * 1.08)
  };
}

/**
 * Specifically layout Poster Title based on character count and width.
 * Preferred font size: 76px
 * Minimum font size: 42px
 * Maximum width: 920px
 * Maximum lines: 3
 * Line height: fontSize * 1.08
 */
export function layoutPosterTitle(titleText) {
  const clean = String(titleText || "").trim();
  if (!clean) {
    return { lines: ["EVENT POSTER TITLE"], fontSize: 76, lineHeight: Math.round(76 * 1.08) };
  }

  const charCount = clean.length;
  let targetSize = 76;
  if (charCount > 55) {
    targetSize = 44;
  } else if (charCount > 35) {
    targetSize = 53;
  } else if (charCount > 20) {
    targetSize = 64;
  } else {
    targetSize = 76;
  }

  return wrapText({
    text: clean,
    fontSize: targetSize,
    maxWidth: 920,
    fontFamily: "sans-serif",
    fontWeight: "900",
    maximumLines: 3
  });
}
