import { useTranslations } from "next-intl";
import { IApartmentCardProps } from "./ApartmentCard.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin, Eye } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { useState } from "react";

export default function ApartmentCard({ apartment }: IApartmentCardProps) {
	const t = useTranslations("apartments.card");
	const [image, setImage] = useState(
		apartment.galleryImages?.[0] || "/placeholder-apartment.svg"
	);
	return (
		<Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden py-0">
			<div className="relative">
				<div className="aspect-video overflow-hidden">
					<Image
						src={image}
						alt={apartment?.title || apartment.referenceNo}
						onError={() => {
							setImage("/placeholder-apartment.svg");
						}}
						width={400}
						height={250}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				</div>

				{/* Status Badge */}
				<div className="absolute top-3 left-3">
					<Badge variant={apartment.isDelivered ? "default" : "secondary"}>
						{apartment.isDelivered ? t("delivered") : t("underConstruction")}
					</Badge>
				</div>

				{/* Price Badge */}
				<div className="absolute top-3 right-3">
					<Badge variant="default">
						{formatPrice(apartment.price)} {t("egp")}
					</Badge>
				</div>
			</div>

			<CardContent className="p-4">
				<div className="space-y-3">
					{/* Title */}
					<h3 className="font-semibold b3 line-clamp-2 group-hover:text-primary transition-colors">
						{apartment?.title || `${apartment.bedrooms} Bedroom Apartment`}
					</h3>

					{/* Location */}
					<div className="flex items-center text-muted-foreground text-sm">
						<MapPin className="w-4 h-4 mr-1" />
						<span>
							{apartment.compound}, {apartment.neighborhood}
						</span>
					</div>

					{/* Features */}
					<div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
						<div className="flex items-center gap-1">
							<Bed className="w-4 h-4" />
							<span>
								{apartment.bedrooms} {t("bedrooms")}
							</span>
						</div>
						<div className="flex items-center gap-1">
							<Bath className="w-4 h-4" />
							<span>
								{apartment.bathrooms} {t("bathrooms")}
							</span>
						</div>
						<div className="flex items-center gap-1">
							<Maximize className="w-4 h-4" />
							<span>
								{apartment.areaSqm} {t("sqm")}
							</span>
						</div>
					</div>

					{/* Description */}
					{apartment?.description && (
						<p className="text-sm text-muted-foreground line-clamp-2">
							{apartment.description}
						</p>
					)}
				</div>
			</CardContent>

			<CardFooter className="p-4 mt-auto">
				<Button asChild className="w-full" variant="outline">
					<Link href={`/${apartment.id}`}>
						<Eye className="w-4 h-4 mr-2" />
						{t("viewDetails")}
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
