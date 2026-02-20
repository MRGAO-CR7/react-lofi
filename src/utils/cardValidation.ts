import type { FormData } from "../types";
import { parseCardNumber } from "./cardFormatters";

export type ValidationErrors = Partial<Record<keyof FormData, string>>;

/**
 * Validate register card form data.
 * @returns Object with validation errors (empty if valid) and isValid boolean.
 */
export const validateCardForm = (
  formData: FormData
): { errors: ValidationErrors; isValid: boolean } => {
  const newErrors: ValidationErrors = {};
  const cardDigits = parseCardNumber(formData.cardNumber);

  if (cardDigits.length < 13 || cardDigits.length > 16) {
    newErrors.cardNumber = "Enter a valid card number (13-16 digits)";
  }
  if (formData.cvc.length < 3 || formData.cvc.length > 4) {
    newErrors.cvc = "CVC must be 3 or 4 digits";
  }
  const expiryParts = formData.expiry.split("/");
  if (
    expiryParts.length !== 2 ||
    expiryParts[0].length !== 2 ||
    expiryParts[1].length !== 2
  ) {
    newErrors.expiry = "Enter expiry as MM/YY";
  } else {
    const month = parseInt(expiryParts[0], 10);
    if (month < 1 || month > 12) {
      newErrors.expiry = "Invalid month";
    }
  }

  return {
    errors: newErrors,
    isValid: Object.keys(newErrors).length === 0,
  };
};
