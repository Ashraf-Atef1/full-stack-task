import { apartmentFormSchema } from "../apartment.schema";

describe("Apartment Form Schema Validation", () => {
	describe("Valid Data", () => {
		it("should validate correct apartment data", () => {
			const validData = {
				referenceNo: "APT-001",
				compound: "Test Compound",
				neighborhood: "Test Neighborhood",
				developer: "Test Developer",
				saleType: "new",
				price: 1000000,
				areaSqm: 120,
				bedrooms: 3,
				bathrooms: 2,
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				downPayment: 200000,
				monthlyInstallment: 15000,
				installmentDurationYears: 5,
				isDelivered: false,
				listingUrl: "https://example.com/apartment-001",
				phoneNumber: "+1234567890",
				galleryImages: ["image1.jpg", "image2.jpg"],
				floorPlanUrl: "floorplan.pdf",
				translations: [
					{
						locale: "en",
						title: "Beautiful Apartment",
						description:
							"A beautiful apartment with great amenities and features",
						slug: "beautiful-apartment",
						seoTitle: "Beautiful Apartment for Sale",
						seoDescription: "Find your dream apartment with amazing features",
						seoKeywords: ["apartment", "sale", "luxury"],
					},
					{
						locale: "ar",
						title: "شقة جميلة",
						description: "شقة جميلة مع وسائل راحة رائعة وميزات",
						slug: "شقة-جميلة",
						seoTitle: "شقة جميلة للبيع",
						seoDescription: "اعثر على شقة أحلامك مع ميزات مذهلة",
						seoKeywords: ["شقة", "بيع", "فاخر"],
					},
				],
			};

			const result = apartmentFormSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});
	});

	describe("Required Fields Validation", () => {
		it("should require referenceNo", () => {
			const invalidData = {
				referenceNo: "",
				compound: "Test Compound",
				neighborhood: "Test Neighborhood",
				saleType: "new",
				price: 1000000,
				areaSqm: 120,
				bedrooms: 3,
				bathrooms: 2,
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				isDelivered: false,
				listingUrl: "https://example.com/test",
				phoneNumber: "+1234567890",
				galleryImages: [],
				translations: [
					{
						locale: "en",
						title: "Test Title",
						description: "Test description that is long enough",
					},
				],
			};

			const result = apartmentFormSchema.safeParse(invalidData);
			expect(result.success).toBe(false);

			if (!result.success) {
				expect(result.error.issues).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							path: ["referenceNo"],
							message: expect.stringContaining("Reference number is required"),
						}),
					])
				);
			}
		});

		it("should require compound", () => {
			const invalidData = {
				referenceNo: "APT-001",
				compound: "A", // Too short
				neighborhood: "Test Neighborhood",
				saleType: "new",
				price: 1000000,
				areaSqm: 120,
				bedrooms: 3,
				bathrooms: 2,
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				isDelivered: false,
				listingUrl: "https://example.com/test",
				phoneNumber: "+1234567890",
				galleryImages: [],
				translations: [
					{
						locale: "en",
						title: "Test Title",
						description: "Test description that is long enough",
					},
				],
			};

			const result = apartmentFormSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});

	describe("Translation Validation", () => {
		it("should validate translation title length", () => {
			const invalidData = {
				referenceNo: "APT-001",
				compound: "Test Compound",
				neighborhood: "Test Neighborhood",
				saleType: "new",
				price: 1000000,
				areaSqm: 120,
				bedrooms: 3,
				bathrooms: 2,
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				isDelivered: false,
				listingUrl: "https://example.com/test",
				phoneNumber: "+1234567890",
				galleryImages: [],
				translations: [
					{
						locale: "en",
						title: "AB", // Too short
						description: "Test description that is long enough",
					},
				],
			};

			const result = apartmentFormSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});

		it("should validate translation description length", () => {
			const invalidData = {
				referenceNo: "APT-001",
				compound: "Test Compound",
				neighborhood: "Test Neighborhood",
				saleType: "new",
				price: 1000000,
				areaSqm: 120,
				bedrooms: 3,
				bathrooms: 2,
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				isDelivered: false,
				listingUrl: "https://example.com/test",
				phoneNumber: "+1234567890",
				galleryImages: [],
				translations: [
					{
						locale: "en",
						title: "Valid Title",
						description: "Short", // Too short
					},
				],
			};

			const result = apartmentFormSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});

		it("should validate locale enum", () => {
			const invalidData = {
				referenceNo: "APT-001",
				compound: "Test Compound",
				neighborhood: "Test Neighborhood",
				saleType: "new",
				price: 1000000,
				areaSqm: 120,
				bedrooms: 3,
				bathrooms: 2,
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				isDelivered: false,
				listingUrl: "https://example.com/test",
				phoneNumber: "+1234567890",
				galleryImages: [],
				translations: [
					{
						locale: "invalid", // Invalid locale
						title: "Valid Title",
						description: "Valid description that is long enough",
					},
				],
			};

			const result = apartmentFormSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});

	describe("Number Validation", () => {
		it("should validate positive price", () => {
			const invalidData = {
				referenceNo: "APT-001",
				compound: "Test Compound",
				neighborhood: "Test Neighborhood",
				saleType: "new",
				price: -1000, // Negative price
				areaSqm: 120,
				bedrooms: 3,
				bathrooms: 2,
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				isDelivered: false,
				listingUrl: "https://example.com/test",
				phoneNumber: "+1234567890",
				galleryImages: [],
				translations: [
					{
						locale: "en",
						title: "Valid Title",
						description: "Valid description that is long enough",
					},
				],
			};

			const result = apartmentFormSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});

		it("should validate minimum bedrooms and bathrooms", () => {
			const invalidData = {
				referenceNo: "APT-001",
				compound: "Test Compound",
				neighborhood: "Test Neighborhood",
				saleType: "new",
				price: 1000000,
				areaSqm: 120,
				bedrooms: 0, // Invalid
				bathrooms: 0, // Invalid
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				isDelivered: false,
				listingUrl: "https://example.com/test",
				phoneNumber: "+1234567890",
				galleryImages: [],
				translations: [
					{
						locale: "en",
						title: "Valid Title",
						description: "Valid description that is long enough",
					},
				],
			};

			const result = apartmentFormSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});

	describe("URL Validation", () => {
		it("should validate listing URL format", () => {
			const invalidData = {
				referenceNo: "APT-001",
				compound: "Test Compound",
				neighborhood: "Test Neighborhood",
				saleType: "new",
				price: 1000000,
				areaSqm: 120,
				bedrooms: 3,
				bathrooms: 2,
				finishingStatus: "unfinished",
				deliveryStatus: "ready",
				isDelivered: false,
				listingUrl: "invalid-url", // Invalid URL format
				phoneNumber: "+1234567890",
				galleryImages: [],
				translations: [
					{
						locale: "en",
						title: "Valid Title",
						description: "Valid description that is long enough",
					},
				],
			};

			const result = apartmentFormSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});
});
