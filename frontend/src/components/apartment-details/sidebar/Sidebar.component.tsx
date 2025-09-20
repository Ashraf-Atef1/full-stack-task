import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, ExternalLink, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatPrice, formatCurrency } from "@/lib/utils";
import { ISidebarProps } from "./Sidebar.types";

export default function SideBar({ apartment }: ISidebarProps) {
	const t = useTranslations("apartments.details");
	return (
		<div className="lg:col-span-1 space-y-6">
			{/* Pricing Card */}
			<Card className="sticky top-24">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<DollarSign className="w-5 h-5" />
						{t("pricing")}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="text-center">
						<div className="text-3xl font-bold text-primary">
							{formatCurrency(apartment.price)}
						</div>
						<div className="text-sm text-muted-foreground">
							{formatPrice(Math.round(apartment.price / apartment.areaSqm))}{" "}
							{t("egp/sqm")}
						</div>
					</div>

					{apartment.downPayment && (
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">{t("downPayment")}:</span>
							<span className="font-medium">
								{formatCurrency(apartment.downPayment)}
							</span>
						</div>
					)}

					{apartment.monthlyInstallment && (
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">
								{t("monthlyInstallment")}:
							</span>
							<span className="font-medium">
								{formatCurrency(apartment.monthlyInstallment)}
							</span>
						</div>
					)}

					{apartment.installmentDurationYears && (
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">
								{t("installmentDuration")}:
							</span>
							<span className="font-medium">
								{apartment.installmentDurationYears} {t("years")}
							</span>
						</div>
					)}
					{apartment.listingUrl && (
						<Button variant="outline" className="w-full" size="lg">
							<a
								href={apartment.listingUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex justify-center items-center gap-2"
							>
								<ExternalLink className="w-4 h-4 mr-2" />
								{t("listing")}
							</a>
						</Button>
					)}
					{apartment.listingUrl && (
						<Button variant="outline" className="w-full" size="lg">
							<a
								href={`tel:${apartment.phoneNumber}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex justify-center items-center gap-2"
							>
								<PhoneCall className="w-4 h-4 mr-2" />
								{t("call")}
							</a>
						</Button>
					)}
				</CardContent>
			</Card>

			{/* Property Info */}
			<Card>
				<CardContent className="pt-6">
					<div className="space-y-2 text-sm">
						<div className="flex items-center gap-2 text-muted-foreground">
							<Calendar className="w-4 h-4" />
							<span>
								{t("listedOn")}{" "}
								{new Date(apartment.createdAt).toLocaleDateString()}
							</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<Calendar className="w-4 h-4" />
							<span>
								{t("updatedOn")}{" "}
								{new Date(apartment.updatedAt).toLocaleDateString()}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
