import React, { FC, useState } from "react";
import type { FormData } from "../../types";
import * as styles from "../../scss/components/RegisterCardForm/RegisterCardForm.module.scss";

interface RegisterCardFormProps {
  userFirstName?: string;
}

const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
};

const parseCardNumber = (formatted: string): string =>
  formatted.replace(/\s/g, "");

export const RegisterCardForm: FC<RegisterCardFormProps> = ({
  userFirstName = "User",
}) => {
  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    cvc: "",
    expiry: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearSuccess = () => setIsSubmitted(false);

  const handleCardNumberChange = (value: string) => {
    clearSuccess();
    setFormData((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: "" }));
  };

  const handleCvcChange = (value: string) => {
    clearSuccess();
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setFormData((prev) => ({ ...prev, cvc: digits }));
    if (errors.cvc) setErrors((prev) => ({ ...prev, cvc: "" }));
  };

  const handleExpiryChange = (value: string) => {
    clearSuccess();
    setFormData((prev) => ({ ...prev, expiry: formatExpiry(value) }));
    if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ cardNumber: "", cvc: "", expiry: "" });
    }, 500);
  };

  return (
    <main className={styles.container}>
      <p className={styles.welcome}>Welcome {userFirstName}</p>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.field}>
          <label htmlFor="cardNumber" className={styles.label}>
            Credit card number
          </label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={formData.cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className={errors.cardNumber ? `${styles.input} ${styles.error}` : styles.input}
            maxLength={19}
          />
          {errors.cardNumber && (
            <span className={styles.errorMessage}>{errors.cardNumber}</span>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="cvc" className={styles.label}>
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={formData.cvc}
              onChange={(e) => handleCvcChange(e.target.value)}
              placeholder="123"
              className={errors.cvc ? `${styles.input} ${styles.error}` : styles.input}
              maxLength={4}
            />
            {errors.cvc && (
              <span className={styles.errorMessage}>{errors.cvc}</span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="expiry" className={styles.label}>
              Expiry
            </label>
            <input
              id="expiry"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={formData.expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder="MM/YY"
              className={errors.expiry ? `${styles.input} ${styles.error}` : styles.input}
              maxLength={5}
            />
            {errors.expiry && (
              <span className={styles.errorMessage}>{errors.expiry}</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {isSubmitted && !Object.keys(errors).length && !formData.cardNumber && (
          <p className={styles.successMessage} role="status">
            Card registered successfully.
          </p>
        )}
      </form>
    </main>
  );
};
