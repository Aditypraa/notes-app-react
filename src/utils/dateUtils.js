/**
 * Format date to locale string
 * @param {string} date - ISO date string
 * @returns {string} - Formatted date string
 */
export function showFormattedDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
}
