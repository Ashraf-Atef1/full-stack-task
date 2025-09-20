import { render, screen } from "@/__tests__/test-utils";
import { Input } from "../input";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("Input Component", () => {
	it("renders input with default props", () => {
		render(<Input placeholder="Enter text" />);

		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
		expect(input).toHaveClass("h-9");
		expect(input).toHaveClass("w-full");
	});

	it("applies custom className", () => {
		render(<Input className="custom-class" placeholder="Custom input" />);

		const input = screen.getByPlaceholderText("Custom input");
		expect(input).toHaveClass("custom-class");
		expect(input).toHaveClass("h-9"); // Should still have base classes
	});

	it("handles different input types", () => {
		const { rerender } = render(<Input type="text" placeholder="Text input" />);
		expect(screen.getByPlaceholderText("Text input")).toHaveAttribute(
			"type",
			"text"
		);

		rerender(<Input type="email" placeholder="Email input" />);
		expect(screen.getByPlaceholderText("Email input")).toHaveAttribute(
			"type",
			"email"
		);

		rerender(<Input type="password" placeholder="Password input" />);
		expect(screen.getByPlaceholderText("Password input")).toHaveAttribute(
			"type",
			"password"
		);

		rerender(<Input type="number" placeholder="Number input" />);
		expect(screen.getByPlaceholderText("Number input")).toHaveAttribute(
			"type",
			"number"
		);
	});

	it("handles user input", async () => {
		const user = userEvent.setup();
		render(<Input placeholder="Type here" />);

		const input = screen.getByPlaceholderText("Type here");

		await user.type(input, "Hello World");
		expect(input).toHaveValue("Hello World");
	});

	it("can be disabled", () => {
		render(<Input disabled placeholder="Disabled input" />);

		const input = screen.getByPlaceholderText("Disabled input");
		expect(input).toBeDisabled();
		expect(input).toHaveClass("disabled:opacity-50");
	});

	it("handles onChange events", async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();

		render(<Input onChange={handleChange} placeholder="Test input" />);

		const input = screen.getByPlaceholderText("Test input");
		await user.type(input, "a");

		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	it("applies focus styles", () => {
		render(<Input placeholder="Focus test" />);

		const input = screen.getByPlaceholderText("Focus test");
		expect(input).toHaveClass("focus-visible:border-ring");
		expect(input).toHaveClass("focus-visible:ring-ring/50");
	});

	it("applies validation styles", () => {
		render(<Input aria-invalid="true" placeholder="Invalid input" />);

		const input = screen.getByPlaceholderText("Invalid input");
		expect(input).toHaveClass("aria-invalid:border-destructive");
	});

	it("forwards ref correctly", () => {
		const ref = React.createRef<HTMLInputElement>();
		render(<Input ref={ref} placeholder="Ref input" />);

		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});

	it("accepts additional props", () => {
		render(
			<Input data-testid="test-input" placeholder="Props test" maxLength={10} />
		);

		const input = screen.getByTestId("test-input");
		expect(input).toHaveAttribute("maxLength", "10");
		expect(input).toHaveAttribute("placeholder", "Props test");
	});
});
