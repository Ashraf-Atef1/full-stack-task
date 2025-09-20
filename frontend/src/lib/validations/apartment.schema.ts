import { z } from "zod";

// Translation schema
const apartmentTranslationSchema = z.object({
	locale: z.enum(["en", "ar"]),
	title: z
		.string()
		.min(3, "Title must be at least 3 characters")
		.max(200, "Title must be less than 200 characters"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters")
		.max(1000, "Description must be less than 1000 characters"),
	slug: z.string().optional(),
	seoTitle: z
		.string()
		.max(60, "SEO title must be less than 60 characters")
		.optional(),
	seoDescription: z
		.string()
		.max(160, "SEO description must be less than 160 characters")
		.optional(),
	seoKeywords: z.array(z.string()).optional(),
});

// Main apartment schema
export const apartmentFormSchema = z.object({
	// Basic Information
	referenceNo: z
		.string()
		.min(3, "Reference number is required")
		.max(50, "Reference number must be less than 50 characters"),
	compound: z
		.string()
		.min(2, "Compound name is required")
		.max(100, "Compound name must be less than 100 characters"),
	neighborhood: z
		.string()
		.min(2, "Neighborhood is required")
		.max(100, "Neighborhood must be less than 100 characters"),
	developer: z
		.string()
		.max(100, "Developer name must be less than 100 characters")
		.optional(),
	saleType: z.enum(["new", "resale", "under-construction"], {
		message: "Please select a valid sale type",
	}),
	listingUrl: z
		.string()
		.url("Please enter a valid URL")
		.optional()
		.or(z.literal("")),
	phoneNumber: z
		.string()
		.regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
		.optional()
		.or(z.literal("")),

	// Property Details
	price: z.number().min(0, "Price must be a positive number"),
	areaSqm: z.number().min(1, "Area must be at least 1 square meter"),
	bedrooms: z
		.number()
		.min(1, "Must have at least 1 bedroom")
		.max(10, "Cannot have more than 10 bedrooms"),
	bathrooms: z
		.number()
		.min(1, "Must have at least 1 bathroom")
		.max(10, "Cannot have more than 10 bathrooms"),
	finishingStatus: z.enum(
		["unfinished", "semi-finished", "fully-finished", "luxury-finished"],
		{
			message: "Please select a valid finishing status",
		}
	),
	deliveryStatus: z.enum(["ready", "under-construction", "off-plan"], {
		message: "Please select a valid delivery status",
	}),
	isDelivered: z.boolean().default(false),

	// Payment Information
	downPayment: z
		.number()
		.min(0, "Down payment must be a positive number")
		.optional(),
	monthlyInstallment: z
		.number()
		.min(0, "Monthly installment must be a positive number")
		.optional(),
	installmentDurationYears: z
		.number()
		.min(0, "Installment duration must be a positive number")
		.max(30, "Installment duration cannot exceed 30 years")
		.optional(),

	galleryImages: z.array(z.string()).default([]),
	floorPlanUrl: z.string().optional(),

	// Translations
	translations: z
		.array(apartmentTranslationSchema)
		.min(1, "At least one translation is required"),
});

export type ApartmentFormData = z.infer<typeof apartmentFormSchema>;
