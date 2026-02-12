import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "../../../../components/Header/Header";

describe("Header", () => {
  it("should render with form variant and burger icon", () => {
    const onIconClick = jest.fn();
    render(
      <Header
        variant="form"
        title="Register card form"
        onIconClick={onIconClick}
      />
    );
    expect(
      screen.getByRole("heading", { name: "Register card form" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open menu" })
    ).toBeInTheDocument();
  });

  it("should render with menu variant and back icon", () => {
    const onIconClick = jest.fn();
    render(<Header variant="menu" title="Menu" onIconClick={onIconClick} />);
    expect(screen.getByRole("heading", { name: "Menu" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
  });

  it("should call onIconClick when burger icon is clicked", () => {
    const onIconClick = jest.fn();
    render(
      <Header
        variant="form"
        title="Register card form"
        onIconClick={onIconClick}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(onIconClick).toHaveBeenCalledTimes(1);
  });

  it("should call onIconClick when back icon is clicked", () => {
    const onIconClick = jest.fn();
    render(<Header variant="menu" title="Menu" onIconClick={onIconClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Go back" }));
    expect(onIconClick).toHaveBeenCalledTimes(1);
  });
});
