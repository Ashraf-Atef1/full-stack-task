import { useCreateApartment } from "../useCreateApartment.hook";

export interface IFileUploadsProps {
	setGalleryImages: ReturnType<typeof useCreateApartment>["setGalleryImages"];
	setFloorPlanImage: ReturnType<typeof useCreateApartment>["setFloorPlanImage"];
}
