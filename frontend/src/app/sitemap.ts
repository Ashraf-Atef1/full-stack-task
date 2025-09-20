import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";
	const locales = ["en", "ar"];

	// Static routes for the apartment website
	const routes: {
		url: string;
		changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
		priority: MetadataRoute.Sitemap[0]["priority"];
	}[] = [
		// Main pages that actually exist
		{ url: "", changeFrequency: "daily", priority: 1.0 }, // Homepage ([locale]/page.tsx)
		{ url: "/create", changeFrequency: "weekly", priority: 0.7 }, // Create apartment page ([locale]/create/page.tsx)
	];

	// Fetch apartments for dynamic pages
	const apartments = await getApartments();

	const sitemap: MetadataRoute.Sitemap = [];

	// Add static pages for each locale
	locales.forEach((locale) => {
		routes.forEach((route) => {
			sitemap.push({
				url: `${baseUrl}/${locale}${route.url}`,
				lastModified: new Date(),
				changeFrequency: route.changeFrequency,
				priority: route.priority,
			});
		});
	});

	// Add dynamic apartment pages
	apartments.forEach((apartment) => {
		locales.forEach((locale) => {
			// Individual apartment page ([locale]/[id]/page.tsx)
			sitemap.push({
				url: `${baseUrl}/${locale}/${apartment.id}`,
				lastModified: new Date(apartment.updatedAt),
				changeFrequency: "weekly",
				priority: 0.8,
			});
		});
	});

	return sitemap;
}

// Interface for apartment data
interface Apartment {
	id: number;
	referenceNo: string;
	updatedAt: string;
	translations?: Array<{
		locale: string;
		slug?: string;
		updatedAt?: string;
	}>;
}

// Function to fetch apartments from API
async function getApartments(): Promise<Apartment[]> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
		const response = await fetch(`${apiUrl}/apartments`, {
			next: { revalidate: 3600 }, // Revalidate every hour
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			console.warn("Failed to fetch apartments for sitemap");
			return [];
		}

		const apartments = await response.json();
		return Array.isArray(apartments) ? apartments : [];
	} catch (error) {
		console.warn("Error fetching apartments for sitemap:", error);
		return [];
	}
}
