"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import BackButton from "../shared/back-button/BackButton.component";
import BasicInfo from "./basic-info/BasicInfo.component";
import { useCreateApartment } from "./useCreateApartment.hook";
import PropertyDetails from "./property-details/PropertyDetails.component";
import PaymentInfo from "./payment-info/PaymentInfo.component";
import Translations from "./translations/Translations.component";
import FileUploads from "./file-uploads/FileUploads.component";
import { Link } from "@/i18n/routing";

export default function CreateApartmentPage() {
	const t = useTranslations("createApartment");
	const tCommon = useTranslations("common");
	const { form, onSubmit, isSubmitting, setGalleryImages, setFloorPlanImage } =
		useCreateApartment();

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			{/* Header */}
			<div className="mb-6">
				<BackButton />
				<h1 className="text-3xl font-bold">{t("title")}</h1>
			</div>

			<form onSubmit={onSubmit} className="space-y-8">
				{/* Basic Information */}
				<BasicInfo form={form} />

				{/* Property Details */}
				<PropertyDetails form={form} />

				{/* Payment Information */}
				<PaymentInfo form={form} />

				{/* Translations */}
				<Translations form={form} />

				{/* File Uploads */}
				<FileUploads
					setGalleryImages={setGalleryImages}
					setFloorPlanImage={setFloorPlanImage}
				/>

				{/* Submit Button */}
				<div className="flex gap-4">
					<Button type="submit" disabled={isSubmitting} className="flex-1">
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								{tCommon("creating")}
							</>
						) : (
							tCommon("create")
						)}
					</Button>
					<Button type="button" variant="outline" asChild>
						<Link href="/">{tCommon("cancel")}</Link>
					</Button>
				</div>
			</form>
		</div>
	);
}
