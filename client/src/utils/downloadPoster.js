import jsPDF from "jspdf";

export const safeFileName = (name) => {
  const cleanedName = String(name || "poster")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .replace(/_+/g, "_");

  return cleanedName || "poster";
};

/**
 * Resolves a DOM SVG element from either a React ref or a DOM element / ID.
 */
function resolveSvgElement(target) {
  if (!target) return null;
  if (target instanceof SVGElement) return target;
  if (target.current && target.current instanceof SVGElement) return target.current;
  if (typeof target === "string") {
    const el = document.getElementById(target);
    if (el instanceof SVGElement) return el;
    if (el) {
      const childSvg = el.querySelector("svg");
      if (childSvg) return childSvg;
    }
  }
  if (target instanceof HTMLElement) {
    const childSvg = target.querySelector("svg");
    if (childSvg) return childSvg;
  }
  return null;
}

/**
 * Converts an image URL (http/https/blob/data) to a base64 data URL.
 */
async function imageUrlToDataUrl(url) {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("data:")) return url;

  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve("");
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn("Failed to inline image for SVG export:", url, error);
    return "";
  }
}

/**
 * Clones SVG and inlines all external image elements as Data URLs.
 */
export async function inlinePosterSvgImages(svgElement) {
  const clonedSvg = svgElement.cloneNode(true);
  const imageElements = clonedSvg.querySelectorAll("image");

  for (const imgEl of imageElements) {
    const href = imgEl.getAttribute("href") || imgEl.getAttribute("xlink:href");
    if (href && !href.startsWith("data:")) {
      const dataUrl = await imageUrlToDataUrl(href);
      if (dataUrl) {
        imgEl.setAttribute("href", dataUrl);
        imgEl.setAttribute("xlink:href", dataUrl);
      }
    }
  }

  return clonedSvg;
}

/**
 * Serializes SVG element into clean XML string with inlined images.
 */
export async function serializePosterSvg(svgElement) {
  const clonedSvg = await inlinePosterSvgImages(svgElement);

  if (!clonedSvg.getAttribute("xmlns")) {
    clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }
  if (!clonedSvg.getAttribute("xmlns:xlink")) {
    clonedSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  }

  clonedSvg.setAttribute("width", "1080");
  clonedSvg.setAttribute("height", "1350");
  clonedSvg.setAttribute("viewBox", "0 0 1080 1350");

  const serializer = new XMLSerializer();
  return serializer.serializeToString(clonedSvg);
}

/**
 * Draws serialized SVG string onto a canvas at high resolution.
 */
export function posterSvgToCanvas(svgString, scale = 2) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080 * scale;
    canvas.height = 1350 * scale;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to render SVG onto Canvas for export."));
    };

    img.src = url;
  });
}

/**
 * Downloads SVG poster as a high-resolution PNG file (1080 x 1350 native, 2160 x 2700 scale 2).
 */
export async function downloadPosterPng(svgRefOrElement, fileName = "poster.png") {
  try {
    const svgElement = resolveSvgElement(svgRefOrElement);
    if (!svgElement) {
      alert("Poster SVG element was not found. Please try again.");
      return false;
    }

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const serializedSvg = await serializePosterSvg(svgElement);
    const canvas = await posterSvgToCanvas(serializedSvg, 2);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          alert("Failed to create PNG blob from poster SVG.");
          resolve(false);
          return;
        }

        const downloadLink = document.createElement("a");
        const cleanName = safeFileName(fileName);
        const finalFileName = cleanName.toLowerCase().endsWith(".png") ? cleanName : `${cleanName}.png`;

        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = finalFileName;
        downloadLink.click();

        setTimeout(() => URL.revokeObjectURL(downloadLink.href), 1000);
        resolve(true);
      }, "image/png");
    });
  } catch (error) {
    console.error("Poster PNG export error:", error);
    alert(error.message || "Failed to download poster PNG. Please try again.");
    return false;
  }
}

/**
 * Generates an A4 portrait PDF Blob from the poster SVG.
 */
export async function generatePosterPdfBlob(svgRefOrElement) {
  const svgElement = resolveSvgElement(svgRefOrElement);
  if (!svgElement) {
    throw new Error("Poster SVG element was not found.");
  }

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const serializedSvg = await serializePosterSvg(svgElement);
  const canvas = await posterSvgToCanvas(serializedSvg, 2);
  const imageData = canvas.toDataURL("image/jpeg", 0.9);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 5; // 5mm margin
  const targetWidth = pageWidth - margin * 2; // 200mm
  const targetHeight = targetWidth * (1350 / 1080); // 250mm (4:5 ratio)

  const xOffset = margin; // 5mm
  const yOffset = (pageHeight - targetHeight) / 2; // 23.5mm

  pdf.addImage(imageData, "JPEG", xOffset, yOffset, targetWidth, targetHeight, undefined, "FAST");
  return pdf;
}

/**
 * Downloads poster SVG as a high-quality A4 portrait PDF file.
 */
export async function downloadPosterPdf(svgRefOrElement, fileName = "poster.pdf") {
  try {
    const pdf = await generatePosterPdfBlob(svgRefOrElement);
    const cleanName = safeFileName(fileName);
    const finalFileName = cleanName.toLowerCase().endsWith(".pdf") ? cleanName : `${cleanName}.pdf`;

    pdf.save(finalFileName);
    return true;
  } catch (error) {
    console.error("Poster PDF export error:", error);
    alert(error.message || "Failed to download poster PDF. Please try again.");
    return false;
  }
}
