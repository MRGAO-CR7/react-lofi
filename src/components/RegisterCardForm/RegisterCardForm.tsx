import React, { FC } from "react";
import * as styles from "../../scss/components/RegisterCardForm/RegisterCardForm.module.scss";
import { useRegisterCardForm } from "../../hooks/useRegisterCardForm";

interface RegisterCardFormProps {
  userFirstName?: string;
}

export const RegisterCardForm: FC<RegisterCardFormProps> = ({
  userFirstName = "User",
}) => {
  const {
    formData,
    errors,
    isSubmitted,
    isSubmitting,
    handleCardNumberChange,
    handleCvcChange,
    handleExpiryChange,
    handleSubmit,
  } = useRegisterCardForm();

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
            className={
              errors.cardNumber ? `${styles.input} ${styles.error}` : styles.input
            }
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
              className={
                errors.cvc ? `${styles.input} ${styles.error}` : styles.input
              }
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
              className={
                errors.expiry ? `${styles.input} ${styles.error}` : styles.input
              }
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
