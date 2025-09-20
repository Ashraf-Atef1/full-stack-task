import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IBasicInfoProps } from "./BasicInfo.types";
import { useTranslations } from "next-intl";
import { Bath, Bed, MapPin, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BasicInfo({ apartment }: IBasicInfoProps) {
	const tCard = useTranslations("apartments.card");
	return (
		<Card>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div>
						<CardTitle className="text-2xl mb-2">
							{apartment?.title || `${apartment.bedrooms} Bedroom Apartment`}
						</CardTitle>
						<div className="flex items-center text-muted-foreground mb-4 gap-2">
							<MapPin className="w-4 h-4 mr-1" />
							<span>
								{apartment.compound}, {apartment.neighborhood}
							</span>
						</div>
					</div>
				</div>

				{/* Key Features */}
				<div className="flex flex-wrap gap-4 text-sm">
					<div className="flex items-center gap-1">
						<Bed className="w-4 h-4" />
						<span>
							{apartment.bedrooms} {tCard("bedrooms")}
						</span>
					</div>
					<div className="flex items-center gap-1">
						<Bath className="w-4 h-4" />
						<span>
							{apartment.bathrooms} {tCard("bathrooms")}
						</span>
					</div>
					<div className="flex items-center gap-1">
						<Maximize className="w-4 h-4" />
						<span>
							{apartment.areaSqm} {tCard("sqm")}
						</span>
					</div>
					<Badge variant={apartment.isDelivered ? "default" : "secondary"}>
						{apartment.isDelivered
							? tCard("delivered")
							: tCard("underConstruction")}
					</Badge>
				</div>
			</CardHeader>

			<CardContent>
				{apartment?.description && (
					<div>
						<h3 className="font-semibold mb-3">{tCard("description")}</h3>
						<p className="text-muted-foreground leading-relaxed">
							{apartment.description}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
