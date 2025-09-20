"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/Header/theme-toggle/ThemeToggle.component";
import { Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { actionItems, navItems } from "./Header.data";
import MobileNav from "./mobile-nav/MobileNav.component";

export function Header() {
	const t = useTranslations("navigation");
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleLocale = () => {
		const newLocale = locale === "en" ? "ar" : "en";
		router.replace(pathname, { locale: newLocale });
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<Image
							src="/logo.svg"
							alt="Nawy"
							width={120}
							height={32}
							className="h-8 w-auto"
							priority
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-6">
						{navItems.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.href}
									href={item.href}
									className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
									style={
										pathname === item.href
											? { fontWeight: 600, color: "var(--foreground)" }
											: undefined
									}
								>
									<Icon className="h-4 w-4" />
									<span>{t(item.label)}</span>
								</Link>
							);
						})}
					</nav>

					{/* Action Buttons */}
					<div className="hidden md:flex items-center space-x-4">
						{actionItems.map((item) => (
							<Button key={item.href} variant={item.variant} size="sm" asChild>
								<Link href={item.href}>{t(item.label)}</Link>
							</Button>
						))}
					</div>

					{/* Right Side Controls */}
					<div className="flex items-center space-x-2">
						{/* Language Switcher */}
						<Button
							variant="ghost"
							size="sm"
							onClick={toggleLocale}
							className="hidden md:flex items-center space-x-2"
							aria-label="Switch language"
						>
							<Languages className="h-4 w-4" />
							<span className="text-sm font-medium">
								{locale === "en" ? "العربية" : "English"}
							</span>
						</Button>

						{/* Theme Toggle */}
						<ThemeToggle />

						{/* Mobile Menu Button */}
						<Button
							variant="ghost"
							size="sm"
							className="md:hidden"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle mobile menu"
						>
							{isMobileMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMobileMenuOpen && (
					<MobileNav
						isMobileMenuOpen={isMobileMenuOpen}
						setIsMobileMenuOpen={setIsMobileMenuOpen}
						toggleLocale={toggleLocale}
					/>
				)}
			</div>
		</header>
	);
}
