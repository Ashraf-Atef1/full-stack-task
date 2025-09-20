import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function BackButton() {
	const locale = useLocale();
	const t = useTranslations("common");

	return (
		<div className="mb-6">
			<Button variant="ghost" asChild className="mb-2">
				<Link href="/">
					{locale === "ar" ? (
						<ArrowRight className="w-4 h-4 ml-2" />
					) : (
						<ArrowLeft className="w-4 h-4 mr-2" />
					)}
					{t("back")}
				</Link>
			</Button>
		</div>
	);
}
