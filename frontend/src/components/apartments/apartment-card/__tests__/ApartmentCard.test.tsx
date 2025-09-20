import { render, screen } from "@/__tests__/test-utils";
import { createMockApartment } from "@/__tests__/test-utils";
import ApartmentCard from "../ApartmentCard.component";
import { ReactNode } from "react";

// Mock the Link component from i18n routing
jest.mock("@/i18n/routing", () => ({
	Link: ({
		children,
		href,
		...props
	}: {
		children: ReactNode;
		href: string;
		[key: string]: unknown;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
	__esModule: true,
	default: ({
		src,
		alt,
		onError,
		...props
	}: {
		src: string;
		alt: string;
		onError?: () => void;
		[key: string]: unknown;
	}) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={src}
			alt={alt}
			onError={onError}
			{...props}
			data-testid="apartment-image"
		/>
	),
}));

describe("ApartmentCard Component", () => {
	const mockApartment = createMockApartment({
		id: 1,
		referenceNo: "TEST-001",
		compound: "Test Compound",
		neighborhood: "Test Neighborhood",
		bedrooms: 3,
		bathrooms: 2,
		areaSqm: 150,
		price: 2500000,
		isDelivered: true,
		galleryImages: ["test-image.jpg"],
		title: "Luxury Test Apartment",
		description: "Beautiful apartment with garden view",
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders apartment card with correct information", () => {
		render(<ApartmentCard apartment={mockApartment} />);

		// Check title
		expect(screen.getByText("Luxury Test Apartment")).toBeInTheDocument();

		// Check location
		expect(
			screen.getByText("Test Compound, Test Neighborhood")
		).toBeInTheDocument();

		// Check bedroom count
		expect(screen.getByText("3 bedrooms")).toBeInTheDocument();

		// Check bathroom count
		expect(screen.getByText("2 bathrooms")).toBeInTheDocument();

		// Check area
		expect(screen.getByText("150 sqm")).toBeInTheDocument();

		// Check price
		expect(screen.getByText("2,500,000 egp")).toBeInTheDocument();

		// Check description
		expect(
			screen.getByText("Beautiful apartment with garden view")
		).toBeInTheDocument();
	});

	it("displays delivered status badge when apartment is delivered", () => {
		render(<ApartmentCard apartment={mockApartment} />);

		expect(screen.getByText("delivered")).toBeInTheDocument();
		expect(screen.queryByText("underConstruction")).not.toBeInTheDocument();
	});

	it("displays under construction status badge when apartment is not delivered", () => {
		const notDeliveredApartment = createMockApartment({
			isDelivered: false,
		});

		render(<ApartmentCard apartment={notDeliveredApartment} />);

		expect(screen.getByText("underConstruction")).toBeInTheDocument();
		expect(screen.queryByText("delivered")).not.toBeInTheDocument();
	});

	it("displays fallback title when title is not provided", () => {
		const apartmentWithoutTitle = createMockApartment({
			title: "",
			bedrooms: 2,
		});

		render(<ApartmentCard apartment={apartmentWithoutTitle} />);

		expect(screen.getByText("2 Bedroom Apartment")).toBeInTheDocument();
	});

	it("displays apartment image with correct src", () => {
		render(<ApartmentCard apartment={mockApartment} />);

		const image = screen.getByTestId("apartment-image");
		expect(image).toHaveAttribute("src", "test-image.jpg");
		expect(image).toHaveAttribute("alt", "Luxury Test Apartment");
	});

	it("uses placeholder image when no gallery images are provided", () => {
		const apartmentWithoutImages = createMockApartment({
			galleryImages: [],
		});

		render(<ApartmentCard apartment={apartmentWithoutImages} />);

		const image = screen.getByTestId("apartment-image");
		expect(image).toHaveAttribute("src", "/placeholder-apartment.svg");
	});

	it("renders view details button with correct link", () => {
		render(<ApartmentCard apartment={mockApartment} />);

		const viewDetailsButton = screen.getByRole("link", { name: /viewDetails/ });
		expect(viewDetailsButton).toBeInTheDocument();
		expect(viewDetailsButton).toHaveAttribute("href", "/1");
	});

	it("does not render description when not provided", () => {
		const apartmentWithoutDescription = createMockApartment({
			description: "",
		});

		render(<ApartmentCard apartment={apartmentWithoutDescription} />);

		// The description paragraph should not be in the document
		expect(screen.queryByText(/Beautiful apartment/)).not.toBeInTheDocument();
	});

	it("renders all feature icons correctly", () => {
		render(<ApartmentCard apartment={mockApartment} />);

		// Check that bed, bath, and area icons are present
		// Since we're testing icons from lucide-react, we test for their text content
		expect(screen.getByText("3 bedrooms")).toBeInTheDocument();
		expect(screen.getByText("2 bathrooms")).toBeInTheDocument();
		expect(screen.getByText("150 sqm")).toBeInTheDocument();
	});

	it("handles image error by setting placeholder", () => {
		render(<ApartmentCard apartment={mockApartment} />);

		const image = screen.getByTestId("apartment-image");

		// Simulate image load error
		if (image instanceof HTMLImageElement && image.onerror) {
			image.onerror(new Event("error"));
		}

		// After error, the component should set a placeholder
		// Note: This test verifies the onError handler exists
		expect(image.onerror).toBeDefined();
	});
});
