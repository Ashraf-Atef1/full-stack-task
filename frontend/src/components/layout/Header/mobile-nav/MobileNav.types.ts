export interface IMobileNav {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (isOpen: boolean) => void;
	toggleLocale: () => void;
}
