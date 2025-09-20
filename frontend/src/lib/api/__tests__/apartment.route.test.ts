import { createMockApartment } from "@/__tests__/test-utils";

// Mock axios completely before any imports
const mockGet = jest.fn();
const mockPost = jest.fn();
const mockAxiosInstance = {
	get: mockGet,
	post: mockPost,
};

jest.mock("axios", () => ({
	__esModule: true,
	default: {
		create: jest.fn(() => mockAxiosInstance),
	},
}));

// Mock next-intl/server
jest.mock("next-intl/server", () => ({
	getLocale: jest.fn().mockResolvedValue("en"),
}));

describe("Apartment API Routes", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getApartments", () => {
		it("should fetch apartments with default filters", async () => {
			const mockApartments = [
				createMockApartment({ id: 1 }),
				createMockApartment({ id: 2 }),
			];
			const mockResponse = {
				data: {
					apartments: mockApartments,
					total: 2,
					page: 1,
					limit: 6,
					totalPages: 1,
				},
			};

			mockGet.mockResolvedValueOnce(mockResponse);

			// Dynamic import to ensure mocks are in place
			const { getApartments } = await import("../apartment.route");
			const result = await getApartments();

			expect(mockGet).toHaveBeenCalledWith("/apartments", {
				params: {
					lang: "en",
					limit: 6,
				},
			});
			expect(result).toEqual(mockResponse.data);
		});

		it("should fetch apartments with custom filters", async () => {
			const filters = {
				priceMin: 1000000,
				priceMax: 5000000,
				bedrooms: 3,
				search: "luxury",
			};

			const mockResponse = {
				data: {
					apartments: [],
					total: 0,
					page: 1,
					limit: 6,
					totalPages: 0,
				},
			};

			mockGet.mockResolvedValueOnce(mockResponse);

			const { getApartments } = await import("../apartment.route");
			const result = await getApartments(filters);

			expect(mockGet).toHaveBeenCalledWith("/apartments", {
				params: {
					lang: "en",
					...filters,
					limit: 6,
				},
			});
			expect(result).toEqual(mockResponse.data);
		});

		it("should handle API errors", async () => {
			const errorMessage = "Network Error";
			mockGet.mockRejectedValueOnce(new Error(errorMessage));

			const { getApartments } = await import("../apartment.route");
			await expect(getApartments()).rejects.toThrow(errorMessage);
		});
	});

	describe("getApartmentById", () => {
		it("should fetch apartment by ID", async () => {
			const mockApartment = createMockApartment({ id: 123 });
			const mockResponse = {
				data: mockApartment,
			};

			mockGet.mockResolvedValueOnce(mockResponse);

			const { getApartmentById } = await import("../apartment.route");
			const result = await getApartmentById(123);

			expect(mockGet).toHaveBeenCalledWith("/apartments/123", {
				params: { lang: "en" },
			});
			expect(result).toEqual(mockApartment);
		});

		it("should handle apartment not found", async () => {
			const errorMessage = "Apartment not found";
			mockGet.mockRejectedValueOnce(new Error(errorMessage));

			const { getApartmentById } = await import("../apartment.route");
			await expect(getApartmentById(999)).rejects.toThrow(errorMessage);
		});
	});
});
