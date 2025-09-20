import { useCreateApartment } from "../useCreateApartment.hook";

export interface IPropertyDetailsProps {
	form: ReturnType<typeof useCreateApartment>["form"];
}
