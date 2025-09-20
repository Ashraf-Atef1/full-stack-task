import InputField from "@/components/shared/input-field/InputField.component";
import SelectList from "@/components/shared/select-list/SelectList.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { IBasicInfoProps } from "./BasicInfo.types";

export default function BasicInfo({ form }: IBasicInfoProps) {
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
				<CardTitle>{t("basicInfo")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputField
						id="referenceNo"
						label={t("referenceNo") + " *"}
						{...register("referenceNo")}
						required
						error={errors.referenceNo?.message}
					/>
					<InputField
						id="compound"
						label={t("compound") + " *"}
						{...register("compound")}
						required
						error={errors.compound?.message}
					/>
					<InputField
						id="neighborhood"
						label={t("neighborhood") + " *"}
						{...register("neighborhood")}
						required
						error={errors.neighborhood?.message}
					/>
					<InputField
						id="developer"
						label={t("developer")}
						{...register("developer")}
						error={errors.developer?.message}
					/>
					<SelectList
						label={t("saleType")}
						onValueChange={(value) =>
							setValue(
								"saleType",
								value as "new" | "resale" | "under-construction"
							)
						}
						placeholder="Select sale type"
						value={watch("saleType")}
						values={[
							{ label: "New", value: "new" },
							{ label: "Resale", value: "resale" },
							{
								label: "Under Construction",
								value: "under-construction",
							},
						]}
						error={errors.saleType?.message}
					/>
					<InputField
						id="listingUrl"
						label={t("listingUrl")}
						{...register("listingUrl")}
						error={errors.listingUrl?.message}
					/>
					<InputField
						id="phoneNumber"
						label={t("phoneNumber")}
						type="tel"
						{...register("phoneNumber")}
						error={errors.phoneNumber?.message}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
