import { getTranslations } from "next-intl/server";
import ApartmentsPage from "@/components/apartments/Apartments.page";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		title: t("title"),
		description: t("description"),
	};
}

export default function Home() {
	return (
		<main className="min-h-screen">
			<ApartmentsPage />
		</main>
	);
}
