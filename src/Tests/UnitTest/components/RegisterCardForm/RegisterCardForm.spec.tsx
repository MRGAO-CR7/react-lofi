import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegisterCardForm } from "../../../../components/RegisterCardForm/RegisterCardForm";

describe("RegisterCardForm", () => {
  it("should render welcome message and form fields", () => {
    render(<RegisterCardForm userFirstName="John" />);
    expect(screen.getByText("Welcome John")).toBeInTheDocument();
    expect(screen.getByLabelText("Credit card number")).toBeInTheDocument();
    expect(screen.getByLabelText("CVC")).toBeInTheDocument();
    expect(screen.getByLabelText("Expiry")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should show validation errors when submitting empty form", () => {
    render(<RegisterCardForm />);
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByText(/Enter a valid card number/)).toBeInTheDocument();
    expect(screen.getByText(/CVC must be 3 or 4 digits/)).toBeInTheDocument();
  });

  it("should show success message on valid submit", async () => {
    render(<RegisterCardForm />);
    fireEvent.change(screen.getByLabelText("Credit card number"), {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(screen.getByLabelText("CVC"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Expiry"), {
      target: { value: "12/25" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByText("Card registered successfully.");
  });

  it("should format card number with spaces", () => {
    render(<RegisterCardForm />);
    const input = screen.getByLabelText("Credit card number");
    fireEvent.change(input, { target: { value: "4111111111111111" } });
    expect(input).toHaveValue("4111 1111 1111 1111");
  });
});
