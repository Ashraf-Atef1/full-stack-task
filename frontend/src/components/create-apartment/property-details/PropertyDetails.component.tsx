import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPropertyDetailsProps } from "./PropertyDetails.types";
import InputField from "@/components/shared/input-field/InputField.component";
import { useTranslations } from "next-intl";
import SelectList from "@/components/shared/select-list/SelectList.component";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function PropertyDetails({ form }: IPropertyDetailsProps) {
	const t = useTranslations("createApartment");
	const {
		register,
		watch,
		setValue,
		formState: { errors },
	} = form;

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("propertyDetails")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<InputField
						id="price"
						label={t("price")}
						type="number"
						min={0}
						{...register("price", { valueAsNumber: true })}
						error={errors.price?.message}
					/>

					<InputField
						id="areaSqm"
						label={`${t("area")} (${t("sqm")}) *`}
						type="number"
						min={0}
						{...register("areaSqm", { valueAsNumber: true })}
						error={errors.areaSqm?.message}
					/>

					<SelectList
						label={t("bedrooms")}
						onValueChange={(value) => setValue("bedrooms", Number(value))}
						placeholder="Select bedrooms number"
						value={watch("bedrooms").toString()}
						values={[1, 2, 3, 4, 5, 6].map((num) => ({
							label: num.toString(),
							value: num.toString(),
						}))}
						error={errors.bedrooms?.message}
					/>

					<SelectList
						label={t("bathrooms")}
						onValueChange={(value) => setValue("bathrooms", Number(value))}
						placeholder="Select bathrooms number"
						value={watch("bathrooms").toString()}
						values={[1, 2, 3, 4, 5, 6].map((num) => ({
							label: num.toString(),
							value: num.toString(),
						}))}
						error={errors.bathrooms?.message}
					/>

					<SelectList
						label={t("finishingStatus")}
						onValueChange={(value) =>
							setValue(
								"finishingStatus",
								value as
									| "unfinished"
									| "semi-finished"
									| "fully-finished"
									| "luxury-finished"
							)
						}
						placeholder="Select finishing status"
						value={watch("finishingStatus")}
						values={[
							{ label: "Unfinished", value: "unfinished" },
							{ label: "Semi-finished", value: "semi-finished" },
							{ label: "Fully finished", value: "fully-finished" },
							{ label: "Luxury finished", value: "luxury-finished" },
						]}
						error={errors.finishingStatus?.message}
					/>

					<SelectList
						label={t("deliveryStatus")}
						onValueChange={(value) =>
							setValue(
								"deliveryStatus",
								value as "ready" | "under-construction" | "off-plan"
							)
						}
						placeholder="Select delivery status"
						value={watch("deliveryStatus")}
						values={[
							{ label: "Ready", value: "ready" },
							{
								label: "Under Construction",
								value: "under-construction",
							},
							{ label: "Off Plan", value: "off-plan" },
						]}
						error={errors.deliveryStatus?.message}
					/>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox
						id="isDelivered"
						checked={watch("isDelivered")}
						onCheckedChange={(checked) => setValue("isDelivered", !!checked)}
					/>
					<Label htmlFor="isDelivered">{t("isDelivered")}</Label>
				</div>
			</CardContent>
		</Card>
	);
}
