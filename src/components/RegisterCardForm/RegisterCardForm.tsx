import React, { FC, useState } from "react";
import type { FormData } from "../../types";
import * as styles from "../../scss/components/RegisterCardForm/RegisterCardForm.module.scss";

interface RegisterCardFormProps {
  userFirstName?: string;
}

export const RegisterCardForm: FC<RegisterCardFormProps> = ({
  userFirstName = "User",
}) => {
  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    cvc: "",
    expiry: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
  };

  return (
    <main className={styles.container}>
      <p className={styles.welcome}>Welcome {userFirstName}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="cardNumber" className={styles.label}>
          Credit card number
        </label>
        <input
          id="cardNumber"
          type="text"
          value={formData.cardNumber}
          onChange={(e) => handleChange("cardNumber", e.target.value)}
          placeholder="Credit card number"
          className={styles.input}
          autoComplete="cc-number"
        />
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="cvc" className={styles.label}>
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              value={formData.cvc}
              onChange={(e) => handleChange("cvc", e.target.value)}
              placeholder="CVC"
              className={styles.input}
              autoComplete="cc-csc"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="expiry" className={styles.label}>
              Expiry
            </label>
            <input
              id="expiry"
              type="text"
              value={formData.expiry}
              onChange={(e) => handleChange("expiry", e.target.value)}
              placeholder="MM/YY"
              className={styles.input}
              autoComplete="cc-exp"
            />
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </main>
  );
};
