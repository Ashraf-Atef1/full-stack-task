import { render, screen } from "@/__tests__/test-utils";
import { Button } from "../button";
import React from "react";

describe("Button Component", () => {
	it("renders button with default props", () => {
		render(<Button>Click me</Button>);

		const button = screen.getByRole("button", { name: "Click me" });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass("inline-flex");
	});

	it("renders button with different variants", () => {
		const { rerender } = render(<Button variant="default">Default</Button>);
		expect(screen.getByRole("button")).toHaveClass("bg-primary");

		rerender(<Button variant="destructive">Destructive</Button>);
		expect(screen.getByRole("button")).toHaveClass("bg-destructive");

		rerender(<Button variant="outline">Outline</Button>);
		expect(screen.getByRole("button")).toHaveClass("border");

		rerender(<Button variant="secondary">Secondary</Button>);
		expect(screen.getByRole("button")).toHaveClass("bg-secondary");

		rerender(<Button variant="ghost">Ghost</Button>);
		expect(screen.getByRole("button")).toHaveClass("hover:bg-accent");

		rerender(<Button variant="link">Link</Button>);
		expect(screen.getByRole("button")).toHaveClass("underline-offset-4");
	});

	it("renders button with different sizes", () => {
		const { rerender } = render(<Button size="default">Default</Button>);
		expect(screen.getByRole("button")).toHaveClass("h-9");

		rerender(<Button size="sm">Small</Button>);
		expect(screen.getByRole("button")).toHaveClass("h-8");

		rerender(<Button size="lg">Large</Button>);
		expect(screen.getByRole("button")).toHaveClass("h-10");

		rerender(<Button size="icon">Icon</Button>);
		expect(screen.getByRole("button")).toHaveClass("size-9");
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		const button = screen.getByRole("button", { name: "Click me" });
		button.click();

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("can be disabled", () => {
		render(<Button disabled>Disabled</Button>);

		const button = screen.getByRole("button", { name: "Disabled" });
		expect(button).toBeDisabled();
		expect(button).toHaveClass("disabled:opacity-50");
	});

	it("renders as a Slot when asChild is true", () => {
		render(
			<Button asChild>
				<a href="#test">Link Button</a>
			</Button>
		);

		const link = screen.getByRole("link", { name: "Link Button" });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "#test");
	});

	it("applies custom className", () => {
		render(<Button className="custom-class">Custom</Button>);

		const button = screen.getByRole("button", { name: "Custom" });
		expect(button).toHaveClass("custom-class");
		expect(button).toHaveClass("inline-flex"); // Should still have base classes
	});

	it("forwards ref correctly", () => {
		const ref = React.createRef<HTMLButtonElement>();
		render(<Button ref={ref}>Ref Button</Button>);

		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
		expect(ref.current?.textContent).toBe("Ref Button");
	});

	it("renders children correctly", () => {
		render(
			<Button>
				<span>Icon</span>
				Button Text
			</Button>
		);

		expect(screen.getByText("Icon")).toBeInTheDocument();
		expect(screen.getByText("Button Text")).toBeInTheDocument();
	});
});
