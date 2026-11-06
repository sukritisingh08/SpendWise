/**
 * Formats a date string into a readable format.
 * Example: "2026-11-06" → "Nov 6, 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Returns the current month and year.
 * Example: "November 2026"
 */
export function getCurrentMonthYear() {
  return new Date().toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Returns today's date in YYYY-MM-DD format.
 */
export function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
