import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const EXPORT_WIDTH = 1123;
const EXPORT_HEIGHT = 794;

export const safeFileName = (name) => {
  const cleanedName = String(name || "certificate")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .replace(/_+/g, "_");

  return cleanedName || "certificate";
};

const createPdfFromElement = async (elementId) => {
  let exportWrapper;

  try {
    const certificateElement = document.getElementById(elementId);

    if (!certificateElement) {
      throw new Error("Certificate preview was not found. Please try again.");
    }

    const clonedCertificate = certificateElement.cloneNode(true);
    exportWrapper = document.createElement("div");

    exportWrapper.className = "pdf-export-clone";
    exportWrapper.style.position = "fixed";
    exportWrapper.style.left = "-9999px";
    exportWrapper.style.top = "0";
    exportWrapper.style.width = `${EXPORT_WIDTH}px`;
    exportWrapper.style.height = `${EXPORT_HEIGHT}px`;
    exportWrapper.style.padding = "0";
    exportWrapper.style.margin = "0";
    exportWrapper.style.overflow = "visible";
    exportWrapper.style.background = "#ffffff";

    clonedCertificate.classList.add("pdf-export-clone");
    clonedCertificate.style.width = `${EXPORT_WIDTH}px`;
    clonedCertificate.style.height = `${EXPORT_HEIGHT}px`;
    clonedCertificate.style.maxWidth = "none";
    clonedCertificate.style.aspectRatio = "auto";
    clonedCertificate.style.transform = "none";
    clonedCertificate.style.opacity = "1";
    clonedCertificate.style.filter = "none";
    clonedCertificate.style.boxShadow = "none";
    clonedCertificate.style.backgroundColor = "#ffffff";

    exportWrapper.appendChild(clonedCertificate);
    document.body.appendChild(exportWrapper);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = await html2canvas(exportWrapper, {
      backgroundColor: "#ffffff",
      scale: 1.5,
      useCORS: true,
      logging: false,
      removeContainer: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: EXPORT_WIDTH,
      windowHeight: EXPORT_HEIGHT
    });

    const imageData = canvas.toDataURL("image/jpeg", 0.78);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true
    });

    const pageWidth = 297;
    const pageHeight = 210;
    const margin = 5;
    const imageWidth = pageWidth - margin * 2;
    const imageHeight = pageHeight - margin * 2;

    pdf.addImage(imageData, "JPEG", margin, margin, imageWidth, imageHeight, undefined, "FAST");

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

const downloadCertificatePdf = async (elementId, fileName) => {
  try {
    const pdf = await createPdfFromElement(elementId);
    const cleanName = safeFileName(fileName || "certificate.pdf");
    const finalFileName = cleanName.toLowerCase().endsWith(".pdf") ? cleanName : `${cleanName}.pdf`;

    pdf.save(finalFileName);
    return true;
  } catch (error) {
    alert(error.message || "Unable to download certificate PDF. Please try again.");
    return false;
  }
};

export default downloadCertificatePdf;
