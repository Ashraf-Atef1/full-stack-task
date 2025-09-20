import { ITranslationsProps } from "./Translations.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/shared/input-field/InputField.component";
import { useTranslations } from "next-intl";
import TextAreaField from "@/components/shared/textarea-field/TextAreaField.component";

export default function Translations({ form }: ITranslationsProps) {
	const t = useTranslations("createApartment");
	const {
		register,
		watch,
		formState: { errors },
	} = form;
	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("translations")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{watch("translations").map((translation, index) => (
					<div
						key={translation.locale}
						className="space-y-4 p-4 border rounded-lg"
					>
						<h4 className="font-semibold text-lg">
							{translation.locale === "en" ? "English" : "العربية"}
						</h4>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<InputField
								id={`translations.${index}.title`}
								label={`${t("title")} *`}
								{...register(`translations.${index}.title`)}
								required
								error={errors.translations?.[index]?.title?.message}
							/>

							<InputField
								id={`translations.${index}.slug`}
								label={t("slug")}
								{...register(`translations.${index}.slug`)}
								placeholder={
									watch(`translations.${index}.title`) || t("autoGenerate")
								}
								error={errors.translations?.[index]?.slug?.message}
							/>
						</div>

						<TextAreaField
							id={`translations.${index}.description`}
							label={`${t("description")} *`}
							{...register(`translations.${index}.description`)}
							required
							error={errors.translations?.[index]?.description?.message}
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<InputField
								id={`translations.${index}.seoTitle`}
								label={t("seoTitle")}
								{...register(`translations.${index}.seoTitle`)}
								error={errors.translations?.[index]?.seoTitle?.message}
								placeholder={
									watch(`translations.${index}.title`) || t("autoGenerate")
								}
							/>

							<TextAreaField
								id={`translations.${index}.seoDescription`}
								label={t("seoDescription")}
								{...register(`translations.${index}.seoDescription`)}
								error={errors.translations?.[index]?.seoDescription?.message}
								placeholder={
									watch(`translations.${index}.description`) ||
									t("autoGenerate")
								}
							/>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
