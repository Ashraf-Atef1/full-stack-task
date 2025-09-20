import { useCreateApartment } from "../useCreateApartment.hook";

export interface IBasicInfoProps {
	form: ReturnType<typeof useCreateApartment>["form"];
}
