import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Replaces spaces with underscores and removes special characters.
 * Preserves the .pdf extension if present.
 */
export const safeFileName = (name) => {
  if (!name) return "";
  const hasPdf = name.toLowerCase().endsWith(".pdf");
  const baseName = hasPdf ? name.substring(0, name.length - 4) : name;
  const sanitized = baseName
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "");
  return hasPdf ? `${sanitized}.pdf` : sanitized;
};

/**
 * Helper function that returns a Promise resolving when all <img> tags inside the
 * specified element have finished loading.
 */
const waitForImages = (element) => {
  const images = Array.from(element.getElementsByTagName("img"));
  const promises = images.map((img) => {
    if (img.complete) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });
  return Promise.all(promises);
};

/**
 * Captures pages from the DOM and downloads them as a two-page PDF.
 * @param {string} fileName The output filename
 */
export const downloadEventReportPdf = async (fileName) => {
  const page1El = document.getElementById("event-report-page-1");
  const page2El = document.getElementById("event-report-page-2");

  if (!page1El) {
    console.error("Element event-report-page-1 not found.");
    return;
  }

  // Wait for document fonts if available
  if (document.fonts) {
    await document.fonts.ready;
  }

  // Wait for images in both pages to finish loading
  await waitForImages(page1El);
  if (page2El) {
    await waitForImages(page2El);
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });

  const cleanFileName = safeFileName(fileName) || "Event_Report.pdf";

  // Classes to temporarily remove during canvas capture to avoid background shadows and borders
  const shadowClasses = ["shadow-2xl", "border", "border-slate-300"];

  try {
    // Page 1: Strip styling, capture, and restore
    page1El.classList.remove(...shadowClasses);
    const canvas1 = await html2canvas(page1El, {
      backgroundColor: "#ffffff",
      scale: 1.5,
      useCORS: true,
      logging: false
    });
    page1El.classList.add(...shadowClasses);
    
    const imgData1 = canvas1.toDataURL("image/jpeg", 0.82);
    pdf.addImage(imgData1, "JPEG", 0, 0, 210, 297);

    // Page 2: Strip styling, capture, and restore if page 2 exists
    if (page2El) {
      pdf.addPage();
      page2El.classList.remove(...shadowClasses);
      const canvas2 = await html2canvas(page2El, {
        backgroundColor: "#ffffff",
        scale: 1.5,
        useCORS: true,
        logging: false
      });
      page2El.classList.add(...shadowClasses);
      
      const imgData2 = canvas2.toDataURL("image/jpeg", 0.82);
      pdf.addImage(imgData2, "JPEG", 0, 0, 210, 297);
    }

    pdf.save(cleanFileName);
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    alert("Error generating PDF: " + error.message);
  }
};
