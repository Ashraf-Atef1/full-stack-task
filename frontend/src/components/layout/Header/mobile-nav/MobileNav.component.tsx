import { useLocale, useTranslations } from "next-intl";
import { actionItems, navItems } from "../Header.data";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { IMobileNav } from "./MobileNav.types";

export default function MobileNav({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	toggleLocale,
}: IMobileNav) {
	const t = useTranslations("navigation");
	const locale = useLocale();

	if (!isMobileMenuOpen) return null;
	return (
		<div className="md:hidden border-t py-4">
			<nav className="flex flex-col space-y-3">
				{navItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.href}
							href={item.href}
							className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<Icon className="h-4 w-4" />
							<span>{t(item.label)}</span>
						</Link>
					);
				})}

				{/* Mobile Action Buttons */}
				<div className="space-y-2 pt-2 border-t">
					{actionItems.map((item) => (
						<Button
							key={item.href}
							variant={item.variant}
							size="sm"
							className="w-full justify-start"
							asChild
						>
							<Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
								{item.label}
							</Link>
						</Button>
					))}
				</div>

				{/* Mobile Language Switcher */}
				<Button
					variant="ghost"
					size="sm"
					onClick={() => {
						toggleLocale();
						setIsMobileMenuOpen(false);
					}}
					className="flex items-center space-x-3 justify-start px-2 py-2 h-auto"
				>
					<Languages className="h-4 w-4" />
					<span className="text-sm font-medium">
						{locale === "en" ? "العربية" : "English"}
					</span>
				</Button>
			</nav>
		</div>
	);
}
