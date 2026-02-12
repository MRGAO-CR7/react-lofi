import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../../app";

describe("App", () => {
  it("should display register card form by default", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Register card form" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });

  it("should show menu when clicking burger icon", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("heading", { name: "Menu" })).toBeInTheDocument();
    expect(screen.getByText("This is menu content")).toBeInTheDocument();
  });

  it("should show register card form when clicking back", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Go back" }));
    expect(
      screen.getByRole("heading", { name: "Register card form" })
    ).toBeInTheDocument();
  });
});
