import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: [
					"/api/", // Disallow API routes
					"/_next/", // Disallow Next.js internal files
					"/admin/", // Disallow admin areas if any
					"/dashboard/", // Disallow user dashboard areas
				],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/api/", "/_next/", "/admin/"],
			},
			{
				userAgent: "Bingbot",
				allow: "/",
				disallow: ["/api/", "/_next/"],
			},
		],
		sitemap: `${
			process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000"
		}/sitemap.xml`,
	};
}
