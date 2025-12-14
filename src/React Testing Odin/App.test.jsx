// Test runners' imports.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Components to be tested.
import App from '../App';
import { MyApplication } from "./MyApplication";


// Assert Vitest library installation.
describe('something truthy and false', () => {
    it('true to be true', () => {
        expect(true).toBe(true);
    });

    it('false to be false', () => {
        expect(false).toBe(false);
    });
});

// Assert React Testing Library works.
describe("App component", () => {
  it("renders correct heading", () => {
    render(<App />);
    // using regex with the i flag allows simpler case-insensitive comparison
    expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
  });
});

// Assert button changes heading as intended.
describe("App Component", () => {
  it("renders magnificent monkeys", () => {
    // since screen does not have the container property, 
    // we'll destructure render to obtain a container for this test
    const { container } = render(<MyApplication />);
    expect(container).toMatchSnapshot();
  });

  it("renders radical rhinos after button click", async () => {
      const user = userEvent.setup();

      render(<MyApplication />);
      const button = screen.getByRole("button", { name: /Click Me/i });

      await user.click(button);

      expect(screen.getByRole("heading").textContent).toMatch("Radical Rhinos");
  });

   
});