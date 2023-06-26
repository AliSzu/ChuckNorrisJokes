import { screen, render, fireEvent } from "@testing-library/react";
import { expect, it, describe, vi } from "vitest";
import InputForm from "../components/InputForm/InputForm";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(<InputForm onSubmit={vi.fn()} onChange={vi.fn()} />);
});

describe("InputForm", () => {
  it("Initial render of draw button has 'Chuck Norris' text ", () => {
    const chuckButton = screen.getByRole("button", { name: "drawJoke" });
    expect(chuckButton.textContent).toContain("Chuck Norris");
  });

  it("Changing input field changes the button text", () => {
    const inputField = screen.getByLabelText<HTMLInputElement>("nameInput");
    const chuckButton = screen.getByRole("button", { name: "drawJoke" });
    expect(inputField.value).toBe("");
    fireEvent.change(inputField, { target: { value: "Bob" } });
    expect(chuckButton.textContent).toContain("Bob");
  });
});
