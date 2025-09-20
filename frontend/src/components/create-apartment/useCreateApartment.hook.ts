import { useRouter } from "@/i18n/routing";
import { createApartment } from "@/lib/api/apartment.route";
import { CreateApartmentDto } from "@/lib/api/types/apartment";
import { apartmentFormSchema } from "@/lib/validations/apartment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useCreateApartment() {
	const router = useRouter();
	const [galleryImages, setGalleryImages] = useState<string[]>([]);
	const [floorPlanImage, setFloorPlanImage] = useState<string[]>([]);
	const t = useTranslations("errors");
	const form = useForm({
		resolver: zodResolver(apartmentFormSchema),
		defaultValues: {
			referenceNo: "",
			compound: "",
			neighborhood: "",
			developer: "",
			saleType: "new",
			price: 0,
			areaSqm: 0,
			bedrooms: 1,
			bathrooms: 1,
			finishingStatus: "unfinished",
			deliveryStatus: "ready",
			downPayment: 0,
			monthlyInstallment: 0,
			installmentDurationYears: 0,
			isDelivered: false,
			listingUrl: "",
			phoneNumber: "",
			galleryImages: [],
			floorPlanUrl: "",
			translations: [
				{
					locale: "en",
					title: "",
					description: "",
					slug: "",
					seoTitle: "",
					seoDescription: "",
					seoKeywords: [],
				},
				{
					locale: "ar",
					title: "",
					description: "",
					slug: "",
					seoTitle: "",
					seoDescription: "",
					seoKeywords: [],
				},
			],
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
	} = form;

	const generateSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-+|-+$/g, "");
	};

	const onSubmit = handleSubmit(async (data) => {
		try {
			// Update form data with images
			const formDataWithImages = {
				...data,
				galleryImages,
				floorPlanUrl: floorPlanImage[0] || undefined,
				translations: data.translations.map((trans) => ({
					...trans,
					slug: trans.slug || generateSlug(trans.title),
					seoTitle: trans.seoTitle || trans.title,
					seoDescription: trans.seoDescription || trans.description,
					seoKeywords:
						trans.seoKeywords && trans.seoKeywords.length > 0
							? trans.seoKeywords
							: [trans.title],
				})),
			};
			const createdApartment = await createApartment(
				formDataWithImages as CreateApartmentDto
			);

			// Redirect to the created apartment
			router.push(`/${createdApartment.id}`);
		} catch (error) {
			console.error("Error creating apartment:", error);
			enqueueSnackbar(t("createApartmentFailed"), {
				variant: "error",
			});
		}
	});
	return {
		form,
		onSubmit,
		errors,
		isSubmitting,
		register,
		setValue,
		watch,
		galleryImages,
		setGalleryImages,
		floorPlanImage,
		setFloorPlanImage,
	};
}
