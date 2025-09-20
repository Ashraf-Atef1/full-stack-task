"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IFloorPlanProps } from "./FloorPlan.types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function FloorPlan({ apartment }: IFloorPlanProps) {
	const t = useTranslations("apartments.details");
	const [image, setImage] = useState(
		apartment.floorPlanUrl || "/placeholder-apartment.svg"
	);
	if (!apartment.floorPlanUrl) return null;
	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("floorPlan")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="aspect-video bg-muted rounded-lg overflow-hidden">
					<Image
						src={image}
						alt="Floor Plan"
						onError={() => setImage("/placeholder-apartment.svg")}
						width={800}
						height={450}
						className="w-full h-full object-cover"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
