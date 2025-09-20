import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeStore } from "@/lib/store/store";

// Create a test query client
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 0,
			},
			mutations: {
				retry: false,
			},
		},
	});

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	const store = makeStore();
	const queryClient = createTestQueryClient();

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Provider>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Test utilities for mocking API responses
export const mockApiResponse = (data: unknown, status = 200) => {
	return Promise.resolve({
		ok: status >= 200 && status < 300,
		status,
		json: () => Promise.resolve(data),
		text: () => Promise.resolve(JSON.stringify(data)),
	});
};

// Mock apartment data factory
export const createMockApartment = (overrides = {}) => ({
	id: 1,
	referenceNo: "TEST-001",
	compound: "Test Compound",
	neighborhood: "Test Neighborhood",
	developer: "Test Developer",
	saleType: "Resale",
	price: 1000000,
	areaSqm: 100,
	bedrooms: 2,
	bathrooms: 2,
	finishingStatus: "Fully finished",
	deliveryStatus: "Ready",
	downPayment: 100000,
	monthlyInstallment: 50000,
	installmentDurationYears: 5,
	isDelivered: true,
	listingUrl: "https://nawy.com/apartment/TEST-001",
	phoneNumber: "+201234567890",
	galleryImages: ["image1.jpg", "image2.jpg"],
	floorPlanUrl: "https://nawy.com/floorplan/TEST-001.pdf",
	createdAt: "2024-01-01T00:00:00.000Z",
	updatedAt: "2024-01-01T00:00:00.000Z",
	locale: "en",
	title: "Test Apartment EN",
	description: "Test description in English",
	slug: "test-apartment-en",
	seoTitle: "Test Apartment SEO Title",
	seoDescription: "Test Apartment SEO Description",
	seoKeywords: ["apartment", "test"],
	...overrides,
});

export * from "@testing-library/react";
export { customRender as render };
