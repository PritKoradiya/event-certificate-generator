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

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });

  const cleanFileName = safeFileName(fileName) || "Event_Report.pdf";

  try {
    // Capture page 1
    const canvas1 = await html2canvas(page1El, {
      backgroundColor: "#ffffff",
      scale: 1.5,
      useCORS: true,
      logging: false
    });
    const imgData1 = canvas1.toDataURL("image/jpeg", 0.82);
    pdf.addImage(imgData1, "JPEG", 0, 0, 210, 297);

    // Capture page 2 if it exists
    if (page2El) {
      pdf.addPage();
      const canvas2 = await html2canvas(page2El, {
        backgroundColor: "#ffffff",
        scale: 1.5,
        useCORS: true,
        logging: false
      });
      const imgData2 = canvas2.toDataURL("image/jpeg", 0.82);
      pdf.addImage(imgData2, "JPEG", 0, 0, 210, 297);
    }

    pdf.save(cleanFileName);
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    alert("Error generating PDF: " + error.message);
  }
};
