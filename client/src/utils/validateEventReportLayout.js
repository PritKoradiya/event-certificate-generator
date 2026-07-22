/**
 * Utility to validate Event Report content length and formatting bounds.
 */

export const REPORT_LIMITS = {
  OUTLINE_MAX_CHARS: 1200,
  OBJECTIVES_MAX_ITEMS: 8,
  OUTCOMES_MAX_ITEMS: 8,
  BULLET_MAX_CHARS: 300,
  CAPTION_MAX_CHARS: 300
};

export function validateEventReportLayout(reportData) {
  const warnings = [];

  const outline = reportData.eventOutline || "";
  if (outline.length > REPORT_LIMITS.OUTLINE_MAX_CHARS) {
    warnings.push(
      `Event Outline is ${outline.length} characters (recommended max: ${REPORT_LIMITS.OUTLINE_MAX_CHARS}).`
    );
  }

  const objectives = reportData.eventObjectives || [];
  if (objectives.length > REPORT_LIMITS.OBJECTIVES_MAX_ITEMS) {
    warnings.push(
      `Objectives count is ${objectives.length} (recommended max: ${REPORT_LIMITS.OBJECTIVES_MAX_ITEMS}).`
    );
  }
  objectives.forEach((obj, idx) => {
    if (obj.length > REPORT_LIMITS.BULLET_MAX_CHARS) {
      warnings.push(
        `Objective #${idx + 1} exceeds ${REPORT_LIMITS.BULLET_MAX_CHARS} characters.`
      );
    }
  });

  const outcomes = reportData.eventOutcomes || [];
  if (outcomes.length > REPORT_LIMITS.OUTCOMES_MAX_ITEMS) {
    warnings.push(
      `Outcomes count is ${outcomes.length} (recommended max: ${REPORT_LIMITS.OUTCOMES_MAX_ITEMS}).`
    );
  }
  outcomes.forEach((out, idx) => {
    if (out.length > REPORT_LIMITS.BULLET_MAX_CHARS) {
      warnings.push(
        `Outcome #${idx + 1} exceeds ${REPORT_LIMITS.BULLET_MAX_CHARS} characters.`
      );
    }
  });

  const caption = reportData.photoCaption || "";
  if (caption.length > REPORT_LIMITS.CAPTION_MAX_CHARS) {
    warnings.push(
      `Photo caption is ${caption.length} characters (recommended max: ${REPORT_LIMITS.CAPTION_MAX_CHARS}).`
    );
  }

  if (import.meta.env?.DEV && warnings.length > 0) {
    console.warn("⚠️ Event Report Layout Validation Warnings:", warnings);
  }

  return {
    isValid: warnings.length === 0,
    warnings
  };
}
