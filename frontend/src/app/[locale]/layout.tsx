import { DM_Sans, DM_Mono } from "next/font/google";
import "../globals.css";
import { RootProvider } from "@/provider/RootProvider.component";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header/Header.component";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});
const dmMono = DM_Mono({
	variable: "--font-dm-mono",
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const messages = await getMessages();
	const metadata = messages.metadata;

	return {
		title: {
			template: "%s | Nawy",
			default: metadata.title,
		},
		description: metadata.description,
		keywords: metadata.keywords,
		openGraph: {
			title: metadata.openGraphTitle,
			description: metadata.openGraphDescription,
			locale: locale,
			type: "website",
			siteName: "Nawy",
		},
		twitter: {
			card: "summary_large_image",
			title: metadata.twitterTitle,
			description: metadata.twitterDescription,
		},
		robots: {
			index: true,
			follow: true,
		},
		alternates: {
			canonical: `/${locale}`,
			languages: {
				en: "/en",
				ar: "/ar",
			},
		},
	};
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	const dir = locale === "ar" ? "rtl" : "ltr";
	const messages = await getMessages();
	setRequestLocale(locale);
	return (
		<html lang={locale} dir={dir}>
			<body className={`${dmSans.variable} ${dmMono.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<RootProvider>
						<Header />
						{children}
					</RootProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
