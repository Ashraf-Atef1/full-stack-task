import { useCreateApartment } from "../useCreateApartment.hook";

export interface ITranslationsProps {
	form: ReturnType<typeof useCreateApartment>["form"];
}
