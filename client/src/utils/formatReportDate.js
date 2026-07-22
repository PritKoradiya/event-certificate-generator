/**
 * Formats date strings for formal event reports.
 * Example input: "2026-04-02" or "2026-04-02T00:00:00.000Z"
 * Example output: "02 April 2026"
 */
export function formatDateForReport(dateInput) {
  if (!dateInput) return "";
  
  // If already formatted like "02/04/2026" or text, try parsing or return if non-standard
  const clean = String(dateInput).trim();
  if (!clean) return "";

  // Check if DD/MM/YYYY or YYYY-MM-DD
  const dateObj = new Date(clean);
  if (isNaN(dateObj.getTime())) {
    return clean;
  }

  const day = String(dateObj.getDate()).padStart(2, "0");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Formats date into DD/MM/YYYY format for details section.
 */
export function formatDateNumeric(dateInput) {
  if (!dateInput) return "";
  const clean = String(dateInput).trim();
  if (clean.includes("/")) return clean;

  const dateObj = new Date(clean);
  if (isNaN(dateObj.getTime())) return clean;

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}
