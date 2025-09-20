import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FileUpload from "./file-upload/FileUpload.component";
import { useTranslations } from "next-intl";
import { IFileUploadsProps } from "./FileUploads.types";

export default function FileUploads({
	setGalleryImages,
	setFloorPlanImage,
}: IFileUploadsProps) {
	const t = useTranslations("createApartment");

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("images")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<Label className="text-base font-medium mb-2 block">
						{t("galleryImages")}
					</Label>
					<FileUpload
						multiple={true}
						accept="image/*"
						onUploadComplete={setGalleryImages}
					/>
				</div>

				<div>
					<Label className="text-base font-medium mb-2 block">
						{t("floorPlan")}
					</Label>
					<FileUpload
						multiple={false}
						accept="image/*"
						onUploadComplete={setFloorPlanImage}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
