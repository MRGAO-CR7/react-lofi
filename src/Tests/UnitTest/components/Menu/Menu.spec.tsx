import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Menu } from "../../../../components/Menu/Menu";

describe("Menu", () => {
  it("should render menu content", () => {
    render(<Menu />);
    expect(screen.getByText("This is menu content")).toBeInTheDocument();
  });

  it("should render inside main landmark", () => {
    render(<Menu />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent("This is menu content");
  });
});
