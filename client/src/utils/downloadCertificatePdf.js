import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const EXPORT_WIDTH = 1600;
const EXPORT_HEIGHT = 1131;

export const safeFileName = (name) => {
  const cleanedName = String(name || "certificate")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .replace(/_+/g, "_");

  return cleanedName || "certificate";
};

const waitForImagesToLoad = async (element) => {
  const images = element.querySelectorAll("img");

  await Promise.all(
    [...images].map((image) => {
      if (image.complete) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = resolve;
      });
    })
  );
};

const createPdfFromElement = async (elementId = "certificate-export-canvas") => {
  let exportWrapper = null;
  let targetElement = document.getElementById(elementId);

  // If target element is not found, try fallback to "certificate-canvas" or "certificate-preview"
  if (!targetElement) {
    targetElement = document.getElementById("certificate-canvas") || document.getElementById("certificate-preview");
  }

  if (!targetElement) {
    throw new Error("Certificate element was not found for export. Please try again.");
  }

  try {
    // Clone node to guarantee fixed 1600x1131 unscaled export host
    const clonedCertificate = targetElement.cloneNode(true);
    exportWrapper = document.createElement("div");

    exportWrapper.className = "certificate-export-host";
    exportWrapper.style.position = "fixed";
    exportWrapper.style.left = "-20000px";
    exportWrapper.style.top = "0";
    exportWrapper.style.width = `${EXPORT_WIDTH}px`;
    exportWrapper.style.height = `${EXPORT_HEIGHT}px`;
    exportWrapper.style.padding = "0";
    exportWrapper.style.margin = "0";
    exportWrapper.style.overflow = "hidden";
    exportWrapper.style.background = "#ffffff";
    exportWrapper.style.zIndex = "-1000";
    exportWrapper.style.opacity = "1";
    exportWrapper.style.pointerEvents = "none";

    clonedCertificate.style.width = `${EXPORT_WIDTH}px`;
    clonedCertificate.style.height = `${EXPORT_HEIGHT}px`;
    clonedCertificate.style.maxWidth = "none";
    clonedCertificate.style.maxHeight = "none";
    clonedCertificate.style.aspectRatio = "auto";
    clonedCertificate.style.transform = "none";
    clonedCertificate.style.opacity = "1";
    clonedCertificate.style.filter = "none";

    exportWrapper.appendChild(clonedCertificate);
    document.body.appendChild(exportWrapper);

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await waitForImagesToLoad(exportWrapper);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(exportWrapper, {
      backgroundColor: "#ffffff",
      width: EXPORT_WIDTH,
      height: EXPORT_HEIGHT,
      windowWidth: EXPORT_WIDTH,
      windowHeight: EXPORT_HEIGHT,
      scale: 1.25,
      useCORS: true,
      allowTaint: false,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 10000
    });

    const imageData = canvas.toDataURL("image/jpeg", 0.88);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 4;

    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    const canvasRatio = canvas.width / canvas.height;
    const targetRatio = maxWidth / maxHeight;

    let renderWidth;
    let renderHeight;

    if (canvasRatio > targetRatio) {
      renderWidth = maxWidth;
      renderHeight = maxWidth / canvasRatio;
    } else {
      renderHeight = maxHeight;
      renderWidth = maxHeight * canvasRatio;
    }

    const x = (pageWidth - renderWidth) / 2;
    const y = (pageHeight - renderHeight) / 2;

    pdf.addImage(imageData, "JPEG", x, y, renderWidth, renderHeight, undefined, "FAST");

    return pdf;
  } finally {
    if (exportWrapper && exportWrapper.parentNode) {
      exportWrapper.parentNode.removeChild(exportWrapper);
    }
  }
};

export const generateCertificatePdfBlob = async (elementId) => {
  const pdf = await createPdfFromElement(elementId);
  return pdf.output("blob");
};

const downloadCertificatePdf = async (elementId = "certificate-export-canvas", fileName = "certificate.pdf") => {
  try {
    const pdf = await createPdfFromElement(elementId);
    const cleanName = safeFileName(fileName);
    const finalFileName = cleanName.toLowerCase().endsWith(".pdf") ? cleanName : `${cleanName}.pdf`;

    pdf.save(finalFileName);
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    alert(error.message || "Unable to download certificate PDF. Please try again.");
    return false;
  }
};

export default downloadCertificatePdf;
