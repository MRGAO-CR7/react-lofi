import { useState, useCallback } from "react";
import type { FormData } from "../types";
import {
  formatCardNumber,
  formatExpiry,
  formatCvc,
} from "../utils/cardFormatters";
import { validateCardForm } from "../utils/cardValidation";

const initialFormData: FormData = {
  cardNumber: "",
  cvc: "",
  expiry: "",
};

export const useRegisterCardForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearSuccess = useCallback(() => setIsSubmitted(false), []);

  const handleCardNumberChange = useCallback(
    (value: string) => {
      clearSuccess();
      setFormData((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
      setErrors((prev) => (prev.cardNumber ? { ...prev, cardNumber: "" } : prev));
    },
    [clearSuccess]
  );

  const handleCvcChange = useCallback(
    (value: string) => {
      clearSuccess();
      setFormData((prev) => ({ ...prev, cvc: formatCvc(value) }));
      setErrors((prev) => (prev.cvc ? { ...prev, cvc: "" } : prev));
    },
    [clearSuccess]
  );

  const handleExpiryChange = useCallback(
    (value: string) => {
      clearSuccess();
      setFormData((prev) => ({ ...prev, expiry: formatExpiry(value) }));
      setErrors((prev) => (prev.expiry ? { ...prev, expiry: "" } : prev));
    },
    [clearSuccess]
  );

  const validate = useCallback((): boolean => {
    const { errors: newErrors, isValid } = validateCardForm(formData);
    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitted(true);

      if (!validate()) return;

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setFormData(initialFormData);
      }, 500);
    },
    [validate]
  );

  return {
    formData,
    errors,
    isSubmitted,
    isSubmitting,
    handleCardNumberChange,
    handleCvcChange,
    handleExpiryChange,
    handleSubmit,
  };
};
