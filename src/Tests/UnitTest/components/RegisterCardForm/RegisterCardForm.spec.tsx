import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegisterCardForm } from "../../../../components/RegisterCardForm/RegisterCardForm";

const validCardNumber = "4111111111111111";
const validCvc = "123";
const validExpiry = "12/25";

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText("Credit card number"), {
    target: { value: validCardNumber },
  });
  fireEvent.change(screen.getByLabelText("CVC"), {
    target: { value: validCvc },
  });
  fireEvent.change(screen.getByLabelText("Expiry"), {
    target: { value: validExpiry },
  });
};

describe("RegisterCardForm", () => {
  describe("rendering", () => {
    it("should render welcome message with custom userFirstName", () => {
      render(<RegisterCardForm userFirstName="John" />);
      expect(screen.getByText("Welcome John")).toBeInTheDocument();
    });

    it("should render welcome message with default User when userFirstName not provided", () => {
      render(<RegisterCardForm />);
      expect(screen.getByText("Welcome User")).toBeInTheDocument();
    });

    it("should render all form fields and submit button", () => {
      render(<RegisterCardForm />);
      expect(screen.getByLabelText("Credit card number")).toBeInTheDocument();
      expect(screen.getByLabelText("CVC")).toBeInTheDocument();
      expect(screen.getByLabelText("Expiry")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });
  });

  describe("card number validation", () => {
    it("should show error when card number is empty", () => {
      render(<RegisterCardForm />);
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.getByText("Enter a valid card number (13-16 digits)")
      ).toBeInTheDocument();
    });

    it("should show error when card number has less than 13 digits", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: "411111111111" },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: validExpiry },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.getByText("Enter a valid card number (13-16 digits)")
      ).toBeInTheDocument();
    });

    it("should accept 13-digit card number", async () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: "4111111111111" },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: validExpiry },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      await screen.findByText("Card registered successfully.");
    });

    it("should accept 16-digit card number", async () => {
      render(<RegisterCardForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      await screen.findByText("Card registered successfully.");
    });
  });

  describe("CVC validation", () => {
    it("should show error when CVC is empty", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: validExpiry },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(screen.getByText("CVC must be 3 or 4 digits")).toBeInTheDocument();
    });

    it("should show error when CVC has 1 digit", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: validExpiry },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(screen.getByText("CVC must be 3 or 4 digits")).toBeInTheDocument();
    });

    it("should show error when CVC has 2 digits", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: "12" },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: validExpiry },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(screen.getByText("CVC must be 3 or 4 digits")).toBeInTheDocument();
    });

    it("should accept 3-digit CVC", async () => {
      render(<RegisterCardForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      await screen.findByText("Card registered successfully.");
    });

    it("should accept 4-digit CVC", async () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: "1234" },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: validExpiry },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      await screen.findByText("Card registered successfully.");
    });
  });

  describe("expiry validation", () => {
    it("should show error when expiry is empty", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.getByText("Enter expiry as MM/YY")
      ).toBeInTheDocument();
    });

    it("should show error when expiry format is invalid", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: "123" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.getByText("Enter expiry as MM/YY")
      ).toBeInTheDocument();
    });

    it("should show Invalid month when month is 00", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: "00/25" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(screen.getByText("Invalid month")).toBeInTheDocument();
    });

    it("should show Invalid month when month is 13", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: "13/25" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(screen.getByText("Invalid month")).toBeInTheDocument();
    });

    it("should accept valid expiry 01/25", async () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: "01/25" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      await screen.findByText("Card registered successfully.");
    });

    it("should accept valid expiry 12/25", async () => {
      render(<RegisterCardForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      await screen.findByText("Card registered successfully.");
    });
  });

  describe("multiple validation errors", () => {
    it("should show all validation errors when form is empty", () => {
      render(<RegisterCardForm />);
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.getByText("Enter a valid card number (13-16 digits)")
      ).toBeInTheDocument();
      expect(screen.getByText("CVC must be 3 or 4 digits")).toBeInTheDocument();
      expect(
        screen.getByText("Enter expiry as MM/YY")
      ).toBeInTheDocument();
    });

    it("should show only invalid field errors when one field is valid", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.queryByText("Enter a valid card number (13-16 digits)")
      ).not.toBeInTheDocument();
      expect(screen.getByText("CVC must be 3 or 4 digits")).toBeInTheDocument();
      expect(
        screen.getByText("Enter expiry as MM/YY")
      ).toBeInTheDocument();
    });
  });

  describe("input formatting", () => {
    it("should format card number with spaces every 4 digits", () => {
      render(<RegisterCardForm />);
      const input = screen.getByLabelText("Credit card number");
      fireEvent.change(input, { target: { value: validCardNumber } });
      expect(input).toHaveValue("4111 1111 1111 1111");
    });

    it("should strip non-digits from card number", () => {
      render(<RegisterCardForm />);
      const input = screen.getByLabelText("Credit card number");
      fireEvent.change(input, { target: { value: "4111-1111-1111-1111" } });
      expect(input).toHaveValue("4111 1111 1111 1111");
    });

    it("should format expiry as MM/YY when typing", () => {
      render(<RegisterCardForm />);
      const input = screen.getByLabelText("Expiry");
      fireEvent.change(input, { target: { value: "1225" } });
      expect(input).toHaveValue("12/25");
    });

    it("should strip non-digits from CVC", () => {
      render(<RegisterCardForm />);
      const input = screen.getByLabelText("CVC");
      fireEvent.change(input, { target: { value: "12a3" } });
      expect(input).toHaveValue("123");
    });
  });

  describe("submit behavior", () => {
    it("should show Submitting... while submitting", () => {
      render(<RegisterCardForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.getByRole("button", { name: "Submitting..." })
      ).toBeInTheDocument();
    });

    it("should reset form after successful submit", async () => {
      render(<RegisterCardForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      await screen.findByText("Card registered successfully.");

      expect(screen.getByLabelText("Credit card number")).toHaveValue("");
      expect(screen.getByLabelText("CVC")).toHaveValue("");
      expect(screen.getByLabelText("Expiry")).toHaveValue("");
    });

    it("should clear success message when user edits after successful submit", async () => {
      render(<RegisterCardForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      await screen.findByText("Card registered successfully.");

      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: "4" },
      });
      expect(screen.queryByText("Card registered successfully.")).not.toBeInTheDocument();
    });
  });

  describe("error clearing", () => {
    it("should clear card number error when user corrects input", () => {
      render(<RegisterCardForm />);
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.getByText("Enter a valid card number (13-16 digits)")
      ).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      expect(
        screen.queryByText("Enter a valid card number (13-16 digits)")
      ).not.toBeInTheDocument();
    });

    it("should clear CVC error when user corrects input", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: validExpiry },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(screen.getByText("CVC must be 3 or 4 digits")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      expect(
        screen.queryByText("CVC must be 3 or 4 digits")
      ).not.toBeInTheDocument();
    });

    it("should clear expiry error when user corrects input", () => {
      render(<RegisterCardForm />);
      fireEvent.change(screen.getByLabelText("Credit card number"), {
        target: { value: validCardNumber },
      });
      fireEvent.change(screen.getByLabelText("CVC"), {
        target: { value: validCvc },
      });
      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: "13/25" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(screen.getByText("Invalid month")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Expiry"), {
        target: { value: "12/25" },
      });
      expect(screen.queryByText("Invalid month")).not.toBeInTheDocument();
    });
  });
});
