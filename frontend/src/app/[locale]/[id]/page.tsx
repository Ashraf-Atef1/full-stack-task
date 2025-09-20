import { notFound } from "next/navigation";
import { getApartmentById } from "@/lib/api/apartment.route";
import ApartmentDetailsPage from "@/components/apartment-details/ApartmentDetails.Page";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({ params }: PageProps) {
	const { id } = await params;

	try {
		const apartment = await getApartmentById(parseInt(id));

		return {
			title: apartment.title,
			description: apartment.description,
			openGraph: {
				title: apartment.title || apartment.referenceNo,
				description: apartment.description || "",
				images: apartment.galleryImages?.slice(0, 1) || [],
			},
		};
	} catch {
		return {
			title: "Apartment Not Found",
			description: "The requested apartment could not be found.",
		};
	}
}

export default async function ApartmentPage({ params }: PageProps) {
	const { id } = await params;

	try {
		const apartment = await getApartmentById(parseInt(id));
		return <ApartmentDetailsPage apartment={apartment} />;
	} catch {
		notFound();
	}
}
