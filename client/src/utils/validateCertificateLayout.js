/**
 * Automated layout validation helper before certificate export.
 * Checks for line count constraints and required metadata fields.
 */

export function validateCertificateLayout(certificateData = {}, template = {}) {
  const warnings = [];

  const {
    participantName = "",
    certificateTitle = "",
    description = "",
    eventName = ""
  } = certificateData;

  // Participant name line check
  if (participantName.length > 70) {
    warnings.push(`Participant name is very long (${participantName.length} chars). Ensure it fits within 2 lines.`);
  }

  // Certificate title check
  if (certificateTitle.length > 50) {
    warnings.push(`Certificate title is long (${certificateTitle.length} chars). Recommended maximum is 45 chars.`);
  }

  // Description line check
  if (description.length > 220) {
    warnings.push(`Description length (${description.length} chars) exceeds 220 characters. Text may be trimmed to 3 lines.`);
  }

  // Required field checks
  if (!participantName.trim()) {
    warnings.push("Participant name is missing.");
  }
  if (!eventName.trim()) {
    warnings.push("Event name is missing.");
  }

  if (import.meta.env.DEV && warnings.length > 0) {
    console.warn("Certificate Layout Validation Warnings:", warnings);
  }

  return {
    isValid: warnings.length === 0,
    warnings
  };
}

export default validateCertificateLayout;
