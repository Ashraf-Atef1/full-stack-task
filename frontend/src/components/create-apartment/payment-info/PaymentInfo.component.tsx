import { useTranslations } from "next-intl";
import { IPaymentInfoProps } from "./PaymentInfo.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/shared/input-field/InputField.component";

export default function PaymentInfo({ form }: IPaymentInfoProps) {
	const t = useTranslations("createApartment");
	const {
		register,
		formState: { errors },
	} = form;

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("paymentInfo")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<InputField
						id="downPayment"
						label={t("downPayment")}
						type="number"
						min={0}
						{...register("downPayment", { valueAsNumber: true })}
						error={errors.downPayment?.message}
					/>

					<InputField
						id="monthlyInstallment"
						label={t("monthlyInstallment")}
						type="number"
						min={0}
						{...register("monthlyInstallment", { valueAsNumber: true })}
						error={errors.monthlyInstallment?.message}
					/>

					<InputField
						id="installmentDurationYears"
						label={t("installmentDurationYears")}
						type="number"
						min={0}
						max={30}
						{...register("installmentDurationYears", {
							valueAsNumber: true,
						})}
						error={errors.installmentDurationYears?.message}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
