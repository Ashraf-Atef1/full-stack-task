import { useCreateApartment } from "../useCreateApartment.hook";

export interface IPaymentInfoProps {
	form: ReturnType<typeof useCreateApartment>["form"];
}
