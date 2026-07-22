import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const safeFileName = (name) => {
  const cleanedName = String(name || "poster")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .replace(/_+/g, "_");

  return cleanedName || "poster";
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

/**
 * Downloads poster preview as a high-resolution PNG file (1080 x 1350 aspect quality).
 * @param {string} elementId
 * @param {string} fileName
 */
export async function downloadPosterPng(elementId = "poster-preview", fileName = "poster.png") {
  let exportWrapper;
  try {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      alert("Poster preview element was not found. Please try again.");
      return false;
    }

    const clonedNode = targetElement.cloneNode(true);
    exportWrapper = document.createElement("div");

    exportWrapper.style.position = "fixed";
    exportWrapper.style.left = "-99999px";
    exportWrapper.style.top = "0";
    exportWrapper.style.width = "1080px";
    exportWrapper.style.height = "1350px";
    exportWrapper.style.padding = "0";
    exportWrapper.style.margin = "0";
    exportWrapper.style.overflow = "hidden";
    exportWrapper.style.background = "#0f172a";
    exportWrapper.style.zIndex = "-1";

    clonedNode.style.width = "1080px";
    clonedNode.style.height = "1350px";
    clonedNode.style.maxWidth = "none";
    clonedNode.style.maxHeight = "none";
    clonedNode.style.aspectRatio = "auto";
    clonedNode.style.transform = "none";
    clonedNode.style.opacity = "1";

    exportWrapper.appendChild(clonedNode);
    document.body.appendChild(exportWrapper);

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await waitForImagesToLoad(clonedNode);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(exportWrapper, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 1080,
      height: 1350
    });

    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    const cleanName = safeFileName(fileName);
    const finalFileName = cleanName.toLowerCase().endsWith(".png") ? cleanName : `${cleanName}.png`;

    downloadLink.href = pngUrl;
    downloadLink.download = finalFileName;
    downloadLink.click();
    return true;
  } catch (error) {
    console.error("PNG export error:", error);
    alert(error.message || "Failed to download poster PNG. Please try again.");
    return false;
  } finally {
    if (exportWrapper && exportWrapper.parentNode) {
      exportWrapper.parentNode.removeChild(exportWrapper);
    }
  }
}

/**
 * Downloads poster preview as a high-quality A4 portrait PDF file.
 * @param {string} elementId
 * @param {string} fileName
 */
export async function downloadPosterPdf(elementId = "poster-preview", fileName = "poster.pdf") {
  let exportWrapper;
  try {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      alert("Poster preview element was not found. Please try again.");
      return false;
    }

    const clonedNode = targetElement.cloneNode(true);
    exportWrapper = document.createElement("div");

    exportWrapper.style.position = "fixed";
    exportWrapper.style.left = "-99999px";
    exportWrapper.style.top = "0";
    exportWrapper.style.width = "1080px";
    exportWrapper.style.height = "1350px";
    exportWrapper.style.padding = "0";
    exportWrapper.style.margin = "0";
    exportWrapper.style.overflow = "hidden";
    exportWrapper.style.background = "#0f172a";
    exportWrapper.style.zIndex = "-1";

    clonedNode.style.width = "1080px";
    clonedNode.style.height = "1350px";
    clonedNode.style.maxWidth = "none";
    clonedNode.style.maxHeight = "none";
    clonedNode.style.aspectRatio = "auto";
    clonedNode.style.transform = "none";
    clonedNode.style.opacity = "1";

    exportWrapper.appendChild(clonedNode);
    document.body.appendChild(exportWrapper);

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await waitForImagesToLoad(clonedNode);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(exportWrapper, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 1080,
      height: 1350
    });

    const imageData = canvas.toDataURL("image/jpeg", 0.92);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 8;
    const targetWidth = pageWidth - margin * 2;
    const targetHeight = targetWidth * (1350 / 1080); // Maintains 4:5 aspect ratio

    const xOffset = margin;
    const yOffset = (pageHeight - targetHeight) / 2;

    pdf.addImage(imageData, "JPEG", xOffset, yOffset, targetWidth, targetHeight, undefined, "FAST");

    const cleanName = safeFileName(fileName);
    const finalFileName = cleanName.toLowerCase().endsWith(".pdf") ? cleanName : `${cleanName}.pdf`;

    pdf.save(finalFileName);
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    alert(error.message || "Failed to download poster PDF. Please try again.");
    return false;
  } finally {
    if (exportWrapper && exportWrapper.parentNode) {
      exportWrapper.parentNode.removeChild(exportWrapper);
    }
  }
}
