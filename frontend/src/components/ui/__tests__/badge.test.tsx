import { render, screen } from "@/__tests__/test-utils";
import { Badge } from "../badge";

describe("Badge Component", () => {
	it("renders badge with default props", () => {
		render(<Badge>Default Badge</Badge>);

		const badge = screen.getByText("Default Badge");
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass("inline-flex");
		expect(badge).toHaveClass("bg-primary");
	});

	it("renders badge with different variants", () => {
		const { rerender } = render(<Badge variant="default">Default</Badge>);
		expect(screen.getByText("Default")).toHaveClass("bg-primary");

		rerender(<Badge variant="secondary">Secondary</Badge>);
		expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");

		rerender(<Badge variant="destructive">Destructive</Badge>);
		expect(screen.getByText("Destructive")).toHaveClass("bg-destructive");

		rerender(<Badge variant="outline">Outline</Badge>);
		expect(screen.getByText("Outline")).toHaveClass("text-primary-foreground");
	});

	it("applies custom className", () => {
		render(<Badge className="custom-class">Custom</Badge>);

		const badge = screen.getByText("Custom");
		expect(badge).toHaveClass("custom-class");
		expect(badge).toHaveClass("inline-flex"); // Should still have base classes
	});

	it("renders as a Slot when asChild is true", () => {
		render(
			<Badge asChild>
				<a href="#test">Link Badge</a>
			</Badge>
		);

		const link = screen.getByRole("link", { name: "Link Badge" });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "#test");
		expect(link).toHaveClass("inline-flex");
	});

	it("renders children correctly", () => {
		render(
			<Badge>
				<span>Icon</span>
				Badge Text
			</Badge>
		);

		expect(screen.getByText("Icon")).toBeInTheDocument();
		expect(screen.getByText("Badge Text")).toBeInTheDocument();
	});

	it("applies focus and accessibility styles", () => {
		render(<Badge>Accessible Badge</Badge>);

		const badge = screen.getByText("Accessible Badge");
		expect(badge).toHaveClass("focus-visible:border-ring");
		expect(badge).toHaveClass("focus-visible:ring-ring/50");
	});
});
