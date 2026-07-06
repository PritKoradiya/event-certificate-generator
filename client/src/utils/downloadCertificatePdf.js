import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const downloadCertificatePdf = async (elementId, fileName) => {
  try {
    const certificateElement = document.getElementById(elementId);

    if (!certificateElement) {
      throw new Error("Certificate preview was not found. Please try again.");
    }

    const canvas = await html2canvas(certificateElement, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true
    });

    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const availableWidth = pdfWidth - margin * 2;
    const availableHeight = pdfHeight - margin * 2;
    const imageRatio = canvas.width / canvas.height;

    let imageWidth = availableWidth;
    let imageHeight = imageWidth / imageRatio;

    if (imageHeight > availableHeight) {
      imageHeight = availableHeight;
      imageWidth = imageHeight * imageRatio;
    }

    const xPosition = (pdfWidth - imageWidth) / 2;
    const yPosition = (pdfHeight - imageHeight) / 2;

    pdf.addImage(imageData, "PNG", xPosition, yPosition, imageWidth, imageHeight);
    pdf.save(fileName || "certificate.pdf");
    return true;
  } catch (error) {
    alert(error.message || "Unable to download certificate PDF.");
    return false;
  }
};

export default downloadCertificatePdf;
