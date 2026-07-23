import { jsPDF } from "jspdf";

/**
 * Reusable helper to inline external images inside SVG if present
 */
export const inlineAttendanceSvgImages = async (svgElement) => {
  const images = svgElement.querySelectorAll("image");
  const promises = Array.from(images).map((img) => {
    const href = img.getAttribute("href") || img.getAttribute("xlink:href");
    if (!href || href.startsWith("data:")) return Promise.resolve();

    return new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth || image.width;
        canvas.height = image.naturalHeight || image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        img.setAttribute("href", dataUrl);
        img.setAttribute("xlink:href", dataUrl);
        resolve();
      };
      image.onerror = () => resolve();
      image.src = href;
    });
  });

  await Promise.all(promises);
};

/**
 * Helper to clone and serialize SVG DOM element to a clean XML string
 */
export const serializeAttendanceSvg = (svgElement) => {
  const clonedSvg = svgElement.cloneNode(true);
  clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clonedSvg.setAttribute("width", "1240");
  clonedSvg.setAttribute("height", "1754");
  clonedSvg.setAttribute("viewBox", "0 0 1240 1754");

  const serializer = new XMLSerializer();
  return serializer.serializeToString(clonedSvg);
};

/**
 * Convert serialized SVG string to a high-resolution JPEG canvas data URL
 */
export const attendanceSvgToCanvas = (svgString, scale = 1.5) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(1240 * scale);
      canvas.height = Math.round(1754 * scale);

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      URL.revokeObjectURL(url);
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      resolve(imgData);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to render SVG page to canvas."));
    };

    img.src = url;
  });
};

/**
 * Main Multipage A4 Attendance PDF Download function
 * Converts SVG DOM pages into vector-like crisp JPEG pages in jsPDF A4 document
 */
export const downloadAttendanceSheetPdf = async ({ pageSvgs = [], fileName = "Attendance_Sheet.pdf" }) => {
  if (!pageSvgs || pageSvgs.length === 0) {
    throw new Error("No SVG pages provided for PDF export.");
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });

  for (let i = 0; i < pageSvgs.length; i++) {
    const svgEl = pageSvgs[i];
    await inlineAttendanceSvgImages(svgEl);
    const svgString = serializeAttendanceSvg(svgEl);
    const jpegDataUrl = await attendanceSvgToCanvas(svgString, 1.5);

    if (i > 0) {
      pdf.addPage("a4", "portrait");
    }

    // Exact A4 dimensions: 210mm x 297mm
    pdf.addImage(jpegDataUrl, "JPEG", 0, 0, 210, 297, undefined, "FAST");
  }

  pdf.save(fileName);
};

export default downloadAttendanceSheetPdf;
