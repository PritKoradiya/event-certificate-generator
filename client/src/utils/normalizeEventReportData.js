/**
 * Normalizes raw event report data into a canonical object structure.
 * Supports frontend form data, backend database models, and legacy field names.
 */

function parseListField(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || "").trim())
      .filter((item) => item.length > 0);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    // Try parsing JSON array
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => String(item || "").trim())
            .filter((item) => item.length > 0);
        }
      } catch (e) {
        // Fallback to newline splitting
      }
    }

    // Split by newlines or bullets
    return trimmed
      .split(/\r?\n/)
      .map((line) => line.replace(/^[•\-\*\s]+/, "").trim())
      .filter((line) => line.length > 0);
  }

  return [];
}

export function normalizeEventReportData(report = {}) {
  const reportDate = report.reportDate || report.date || "";
  const eventDate = report.eventDate || report.dateOfEvent || "";
  const eventTime = report.eventTime || report.time || "";
  const resourcePerson = report.resourcePerson || "";
  const eventName = report.eventName || report.nameOfTheEvent || "";
  const numberOfParticipants =
    report.numberOfParticipants || report.noOfParticipants || "";
  const attendee = report.attendee || "";
  const venue = report.venue || "";
  const eventOutline = report.eventOutline || "";

  const eventObjectives = parseListField(
    report.eventObjectives || report.objectives
  );
  const eventOutcomes = parseListField(
    report.eventOutcomes || report.outcomes
  );

  const photoCaption = report.photoCaption || "";
  
  let rawPhotos = report.photos || [];
  if (typeof rawPhotos === "string") {
    try {
      rawPhotos = JSON.parse(rawPhotos);
    } catch (e) {
      rawPhotos = [rawPhotos];
    }
  }
  if (!Array.isArray(rawPhotos)) {
    rawPhotos = [];
  }
  const photos = rawPhotos.filter((p) => p && typeof p === "string");

  const eventCoordinatorName =
    report.eventCoordinatorName ||
    report.eventCoordinator ||
    "DR. JAYSHRI A. PATIL";
  const deanName = report.deanName || "DR. NIRAJ SHAH";
  const reportId = report.reportId || report.id || report._id || "REPORT-2026-0001";

  return {
    reportDate,
    eventDate,
    eventTime,
    resourcePerson,
    eventName,
    numberOfParticipants,
    attendee,
    venue,
    eventOutline,
    eventObjectives,
    eventOutcomes,
    photoCaption,
    photos,
    eventCoordinatorName,
    deanName,
    reportId
  };
}
