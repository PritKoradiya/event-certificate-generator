import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const downloadCertificatePdf = async (elementId, fileName) => {
  let certificateElement;

  try {
    certificateElement = document.getElementById(elementId);

    if (!certificateElement) {
      throw new Error("Certificate preview was not found. Please try again.");
    }

    certificateElement.classList.add("pdf-export-mode");
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const canvas = await html2canvas(certificateElement, {
      scale: 1.5,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      removeContainer: true,
      windowWidth: certificateElement.scrollWidth,
      windowHeight: certificateElement.scrollHeight
    });

    // Using JPEG compression to keep PDF size smaller.
    const imageData = canvas.toDataURL("image/jpeg", 0.72);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;
    const imageRatio = canvas.width / canvas.height;
    const pageRatio = availableWidth / availableHeight;

    let imageWidth;
    let imageHeight;

    if (imageRatio > pageRatio) {
      imageWidth = availableWidth;
      imageHeight = imageWidth / imageRatio;
    } else {
      imageHeight = availableHeight;
      imageWidth = imageHeight * imageRatio;
    }

    const xPosition = (pageWidth - imageWidth) / 2;
    const yPosition = (pageHeight - imageHeight) / 2;

    pdf.addImage(imageData, "JPEG", xPosition, yPosition, imageWidth, imageHeight, undefined, "FAST");
    pdf.save(fileName || "certificate.pdf");
    return true;
  } catch (error) {
    alert(error.message || "Unable to download certificate PDF.");
    return false;
  } finally {
    if (certificateElement) {
      certificateElement.classList.remove("pdf-export-mode");
    }
  }
};

export default downloadCertificatePdf;
