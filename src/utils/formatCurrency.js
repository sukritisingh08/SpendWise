/**
 * Formats a number as Indian Rupees (₹).
 * Handles numbers, numeric strings, and edge cases gracefully.
 * Examples: 1500 → "₹1,500.00", 250000 → "₹2,50,000.00"
 */
export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
