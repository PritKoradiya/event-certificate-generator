import { jsPDF } from "jspdf";
import { normalizeEventReportData } from "./normalizeEventReportData.js";
import { formatDateForReport, formatDateNumeric } from "./formatReportDate.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_BASE = API_BASE.replace("/api", "");

export const safeFileName = (name) => {
  if (!name) return "Event_Report.pdf";
  const hasPdf = String(name).toLowerCase().endsWith(".pdf");
  const baseName = hasPdf ? String(name).substring(0, name.length - 4) : String(name);
  const sanitized = baseName
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "");
  return hasPdf ? `${sanitized}.pdf` : `${sanitized}.pdf`;
};

/**
 * Resolves local file object URLs, base64 data URLs, or server uploads to full image URLs.
 */
function resolvePhotoUrl(photoPath) {
  if (!photoPath) return "";
  if (photoPath.startsWith("blob:") || photoPath.startsWith("data:") || photoPath.startsWith("http")) {
    return photoPath;
  }
  if (photoPath.startsWith("/uploads")) {
    return `${SERVER_BASE}${photoPath}`;
  }
  return photoPath;
}

/**
 * Loads an image URL into a base64 Data URL and retrieves image dimensions.
 */
function loadImageDataUrl(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve(null);
      return;
    }
    if (url.startsWith("data:")) {
      const img = new Image();
      img.onload = () => resolve({ dataUrl: url, width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve(null);
      img.src = url;
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        resolve({ dataUrl, width: img.naturalWidth, height: img.naturalHeight });
      } catch (e) {
        console.warn("Failed to convert image to Data URL:", e);
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Calculates contained image dimensions fitting within boxWidth x boxHeight while preserving aspect ratio.
 */
function fitImageInBox(imgWidth, imgHeight, boxWidth, boxHeight) {
  if (!imgWidth || !imgHeight) {
    return { width: boxWidth, height: boxHeight, offsetX: 0, offsetY: 0 };
  }
  const aspect = imgWidth / imgHeight;
  let targetW = boxWidth;
  let targetH = targetW / aspect;

  if (targetH > boxHeight) {
    targetH = boxHeight;
    targetW = targetH * aspect;
  }

  const offsetX = (boxWidth - targetW) / 2;
  const offsetY = (boxHeight - targetH) / 2;

  return { width: targetW, height: targetH, offsetX, offsetY };
}

/**
 * Draws Page 1 of the formal Event Report directly onto jsPDF canvas.
 */
function drawReportPageOne(pdf, report) {
  const leftMargin = 18;
  const rightMargin = 192;
  const usableWidth = 174;

  // Title: EVENT REPORT
  pdf.setFont("times", "bold");
  pdf.setFontSize(16);
  pdf.text("EVENT REPORT", 105, 18, { align: "center" });
  // Underline title
  pdf.setLineWidth(0.4);
  pdf.line(84, 19.5, 126, 19.5);

  // Report Date (Top Right)
  const reportDateFormatted = report.reportDate ? formatDateNumeric(report.reportDate) : "03/04/2026";
  pdf.setFontSize(11);
  pdf.setFont("times", "bold");
  pdf.text("Date:", rightMargin - pdf.getTextWidth(reportDateFormatted) - 2, 26, { align: "right" });
  pdf.setFont("times", "normal");
  pdf.text(reportDateFormatted, rightMargin, 26, { align: "right" });

  // Details Table Grid
  const tableStartY = 29;
  pdf.setLineWidth(0.3);
  pdf.setDrawColor(0, 0, 0);

  // Row 1: Date of event | Time | Resource Person
  const row1Col1W = 32;
  const row1Col2W = 38;
  const row1Col3W = 104;

  const resourcePersonLines = pdf.splitTextToSize(report.resourcePerson || "", row1Col3W - 4);
  const row1H = Math.max(14, 6 + resourcePersonLines.length * 4.5);

  // Row 2: Name of the Event
  const row2Col1W = 40;
  const row2Col2W = 134;
  const eventNameLines = pdf.splitTextToSize(report.eventName || "", row2Col2W - 4);
  const row2H = Math.max(11, 5 + eventNameLines.length * 4.5);

  // Row 3: No of participants
  const row3H = 8;

  const totalTableH = row1H + row2H + row3H;

  // Outer Table Box
  pdf.rect(leftMargin, tableStartY, usableWidth, totalTableH);

  // Inner Horizontal Lines
  pdf.line(leftMargin, tableStartY + row1H, rightMargin, tableStartY + row1H);
  pdf.line(leftMargin, tableStartY + row1H + row2H, rightMargin, tableStartY + row1H + row2H);

  // Row 1 Vertical Dividers
  pdf.line(leftMargin + row1Col1W, tableStartY, leftMargin + row1Col1W, tableStartY + row1H);
  pdf.line(leftMargin + row1Col1W + row1Col2W, tableStartY, leftMargin + row1Col1W + row1Col2W, tableStartY + row1H);

  // Row 2 & 3 Vertical Divider
  pdf.line(leftMargin + row2Col1W, tableStartY + row1H, leftMargin + row2Col1W, tableStartY + totalTableH);

  // Populate Row 1 Content
  // Col 1: Date of event
  pdf.setFont("times", "bold");
  pdf.setFontSize(10);
  pdf.text("Date of event:", leftMargin + 2, tableStartY + 4.5);
  pdf.setFont("times", "normal");
  pdf.text(report.eventDate ? formatDateNumeric(report.eventDate) : "", leftMargin + 2, tableStartY + 9.5);

  // Col 2: Time
  pdf.setFont("times", "bold");
  pdf.text("Time:", leftMargin + row1Col1W + 2, tableStartY + 4.5);
  pdf.setFont("times", "normal");
  pdf.text(report.eventTime || "", leftMargin + row1Col1W + 2, tableStartY + 9.5);

  // Col 3: Resource Person
  pdf.setFont("times", "bold");
  pdf.text("Resource Person:", leftMargin + row1Col1W + row1Col2W + 2, tableStartY + 4.5);
  pdf.setFont("times", "normal");
  resourcePersonLines.forEach((line, idx) => {
    pdf.text(line, leftMargin + row1Col1W + row1Col2W + 2, tableStartY + 9.5 + idx * 4.5);
  });

  // Populate Row 2 Content: Name of the Event
  pdf.setFont("times", "bold");
  pdf.text("Name of the Event", leftMargin + 2, tableStartY + row1H + 5.5);
  eventNameLines.forEach((line, idx) => {
    pdf.text(line, leftMargin + row2Col1W + 2, tableStartY + row1H + 5.5 + idx * 4.5);
  });

  // Populate Row 3 Content: No of participants
  pdf.setFont("times", "bold");
  pdf.text("No of participants", leftMargin + 2, tableStartY + row1H + row2H + 5.5);
  pdf.setFont("times", "normal");
  pdf.text(String(report.numberOfParticipants || ""), leftMargin + row2Col1W + 2, tableStartY + row1H + row2H + 5.5);

  // Fields below table: Attendee & Venue
  let currentY = tableStartY + totalTableH + 6;

  // Attendee:
  pdf.setFont("times", "bold");
  pdf.setFontSize(11);
  pdf.text("Attendee: ", leftMargin, currentY);
  const attendeeLabelW = pdf.getTextWidth("Attendee: ");
  pdf.setFont("times", "normal");
  const attendeeLines = pdf.splitTextToSize(report.attendee || "", usableWidth - attendeeLabelW);
  attendeeLines.forEach((line, idx) => {
    if (idx === 0) {
      pdf.text(line, leftMargin + attendeeLabelW, currentY);
    } else {
      pdf.text(line, leftMargin + attendeeLabelW, currentY + idx * 5);
    }
  });
  currentY += Math.max(1, attendeeLines.length) * 5 + 2;

  // Venue:
  pdf.setFont("times", "bold");
  pdf.text("Venue: ", leftMargin, currentY);
  const venueLabelW = pdf.getTextWidth("Venue: ");
  pdf.setFont("times", "normal");
  pdf.text(report.venue || "", leftMargin + venueLabelW, currentY);
  currentY += 8;

  // Calculate dynamic spacing scale if outline + objectives + outcomes are large
  const outlineText = report.eventOutline || "";
  const outlineLines = pdf.splitTextToSize(outlineText, usableWidth);
  const totalObjLines = (report.eventObjectives || []).reduce((acc, item) => {
    return acc + pdf.splitTextToSize(item, usableWidth - 10).length;
  }, 0);
  const totalOutLines = (report.eventOutcomes || []).reduce((acc, item) => {
    return acc + pdf.splitTextToSize(item, usableWidth - 10).length;
  }, 0);

  const estimatedHeight = currentY + outlineLines.length * 4.8 + totalObjLines * 4.6 + totalOutLines * 4.6 + 30;
  const lineGap = estimatedHeight > 275 ? 4.2 : 4.8;
  const fontSizeContent = estimatedHeight > 275 ? 10 : 10.5;

  // Section 1: Event Outline:
  pdf.setFont("times", "bold");
  pdf.setFontSize(11.5);
  pdf.text("Event Outline:", leftMargin, currentY);
  currentY += 5.5;

  pdf.setFont("times", "normal");
  pdf.setFontSize(fontSizeContent);
  outlineLines.forEach((line) => {
    pdf.text(line, leftMargin, currentY);
    currentY += lineGap;
  });
  currentY += 4;

  // Section 2: Objective of the Event:
  pdf.setFont("times", "bold");
  pdf.setFontSize(11.5);
  pdf.text("Objective of the Event:", leftMargin, currentY);
  currentY += 5.5;

  pdf.setFont("times", "normal");
  pdf.setFontSize(fontSizeContent);
  (report.eventObjectives || []).forEach((item) => {
    const itemLines = pdf.splitTextToSize(item, usableWidth - 8);
    itemLines.forEach((line, idx) => {
      if (idx === 0) {
        pdf.text("•", leftMargin + 3, currentY);
        pdf.text(line, leftMargin + 8, currentY);
      } else {
        pdf.text(line, leftMargin + 8, currentY);
      }
      currentY += lineGap;
    });
  });
  currentY += 4;

  // Section 3: Outcome of the Event:
  pdf.setFont("times", "bold");
  pdf.setFontSize(11.5);
  pdf.text("Outcome of the Event:", leftMargin, currentY);
  currentY += 5.5;

  pdf.setFont("times", "normal");
  pdf.setFontSize(fontSizeContent);
  (report.eventOutcomes || []).forEach((item) => {
    const itemLines = pdf.splitTextToSize(item, usableWidth - 8);
    itemLines.forEach((line, idx) => {
      if (idx === 0) {
        pdf.text("•", leftMargin + 3, currentY);
        pdf.text(line, leftMargin + 8, currentY);
      } else {
        pdf.text(line, leftMargin + 8, currentY);
      }
      currentY += lineGap;
    });
  });
}

/**
 * Draws Page 2 of the formal Event Report (Photos, Caption, Signatures).
 */
async function drawReportPageTwo(pdf, report) {
  pdf.addPage();

  const leftMargin = 18;
  const rightMargin = 192;
  const usableWidth = 174;

  // Top Heading: PHOTOS
  pdf.setFont("times", "bold");
  pdf.setFontSize(16);
  pdf.text("PHOTOS", 105, 20, { align: "center" });
  pdf.setLineWidth(0.4);
  pdf.line(90, 21.5, 120, 21.5);

  // Photo 1 and Photo 2 slots
  const photoBoxW = 135;
  const photoBoxH = 85;
  const photoCenterX = (210 - photoBoxW) / 2; // 37.5mm

  const photos = report.photos || [];
  const photo1Url = photos[0] ? resolvePhotoUrl(photos[0]) : "";
  const photo2Url = photos[1] ? resolvePhotoUrl(photos[1]) : "";

  const photo1Obj = photo1Url ? await loadImageDataUrl(photo1Url) : null;
  const photo2Obj = photo2Url ? await loadImageDataUrl(photo2Url) : null;

  // Render Photo 1 Slot
  const photo1Y = 28;
  if (photo1Obj) {
    const fit = fitImageInBox(photo1Obj.width, photo1Obj.height, photoBoxW, photoBoxH);
    pdf.addImage(
      photo1Obj.dataUrl,
      "JPEG",
      photoCenterX + fit.offsetX,
      photo1Y + fit.offsetY,
      fit.width,
      fit.height
    );
  } else {
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.3);
    pdf.rect(photoCenterX, photo1Y, photoBoxW, photoBoxH, "FD");
    pdf.setFont("times", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(148, 163, 184);
    pdf.text("PHOTO 1", 105, photo1Y + photoBoxH / 2, { align: "center" });
    pdf.setTextColor(0, 0, 0);
  }

  // Render Photo 2 Slot
  const photo2Y = 120;
  if (photo2Obj) {
    const fit = fitImageInBox(photo2Obj.width, photo2Obj.height, photoBoxW, photoBoxH);
    pdf.addImage(
      photo2Obj.dataUrl,
      "JPEG",
      photoCenterX + fit.offsetX,
      photo2Y + fit.offsetY,
      fit.width,
      fit.height
    );
  } else {
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.3);
    pdf.rect(photoCenterX, photo2Y, photoBoxW, photoBoxH, "FD");
    pdf.setFont("times", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(148, 163, 184);
    pdf.text("PHOTO 2", 105, photo2Y + photoBoxH / 2, { align: "center" });
    pdf.setTextColor(0, 0, 0);
  }

  // Photo Caption (Below Photo 2)
  const formattedEventDate = report.eventDate ? formatDateForReport(report.eventDate) : "02 April 2026";
  const defaultCaption = `Expert talk “${report.eventName || "Event Name"}” on ${formattedEventDate}.`;
  const captionText = report.photoCaption ? report.photoCaption : defaultCaption;

  pdf.setFont("times", "bold");
  pdf.setFontSize(11);
  const captionLines = pdf.splitTextToSize(captionText, usableWidth);
  let captionY = 213;
  captionLines.forEach((line) => {
    pdf.text(line, 105, captionY, { align: "center" });
    captionY += 5.5;
  });

  // Signatures Section (Bottom of Page 2, NO lines, NO boxes)
  const sigY = 265;
  pdf.setFont("times", "bold");
  pdf.setFontSize(11);

  // Left: EVENT COORDINATOR / Name
  pdf.text("EVENT COORDINATOR", leftMargin, sigY);
  pdf.text((report.eventCoordinatorName || "DR. JAYSHRI A. PATIL").toUpperCase(), leftMargin, sigY + 6.5);

  // Right: DEAN, SOE / Name
  pdf.text("DEAN, SOE", rightMargin, sigY, { align: "right" });
  pdf.text((report.deanName || "DR. NIRAJ SHAH").toUpperCase(), rightMargin, sigY + 6.5, { align: "right" });
}

/**
 * Generates direct two-page Event Report jsPDF object without html2canvas.
 */
export async function generateEventReportPdfBlob(reportRaw) {
  const report = normalizeEventReportData(reportRaw);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });

  drawReportPageOne(pdf, report);
  await drawReportPageTwo(pdf, report);

  return pdf;
}

/**
 * Direct PDF download helper for Event Reports.
 */
export async function downloadEventReportPdf(reportRaw, fileName = "Event_Report.pdf") {
  try {
    const pdf = await generateEventReportPdfBlob(reportRaw);
    const cleanFileName = safeFileName(fileName);
    pdf.save(cleanFileName);
    return true;
  } catch (error) {
    console.error("Failed to generate direct Event Report PDF:", error);
    alert("Error generating PDF: " + (error.message || error));
    return false;
  }
}
