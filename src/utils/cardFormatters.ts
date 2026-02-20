/**
 * Format card number with spaces every 4 digits (max 16 digits).
 */
export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

/**
 * Format expiry as MM/YY (max 4 digits).
 */
export const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
};

/**
 * Parse formatted card number to digits only.
 */
export const parseCardNumber = (formatted: string): string =>
  formatted.replace(/\s/g, "");

/**
 * Format CVC to digits only (max 4 digits).
 */
export const formatCvc = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 4);
