import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISpecificationsProps } from "./Specifications.types";
import { useTranslations } from "next-intl";

export default function Specifications({ apartment }: ISpecificationsProps) {
	const t = useTranslations("apartments.details");
	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("specifications")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-muted-foreground">{t("referenceNo")}:</span>
							<span className="font-medium">{apartment.referenceNo}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">{t("compound")}:</span>
							<span className="font-medium">{apartment.compound}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">
								{t("neighborhood")}:
							</span>
							<span className="font-medium">{apartment.neighborhood}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">{t("developer")}:</span>
							<span className="font-medium">{apartment.developer}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">{t("saleType")}:</span>
							<span className="font-medium">{apartment.saleType}</span>
						</div>
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-muted-foreground">{t("area")}:</span>
							<span className="font-medium">
								{apartment.areaSqm} {t("sqm")}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">{t("bedrooms")}:</span>
							<span className="font-medium">{apartment.bedrooms}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">{t("bathrooms")}:</span>
							<span className="font-medium">{apartment.bathrooms}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">
								{t("finishingStatus")}:
							</span>
							<span className="font-medium">{apartment.finishingStatus}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">
								{t("deliveryStatus")}:
							</span>
							<span className="font-medium">{apartment.deliveryStatus}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
