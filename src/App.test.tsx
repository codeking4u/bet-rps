import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText("PICK YOUR POSITIONS")).toBeInTheDocument();
    expect(getByText("Rock")).toBeInTheDocument();
    expect(getByText("Paper")).toBeInTheDocument();
    expect(getByText("Scissors")).toBeInTheDocument();
  });

  it("renders Play button", () => {
    const { getByText } = render(<App />);
    expect(getByText(/PLAY/)).toBeInTheDocument();
  });
});
