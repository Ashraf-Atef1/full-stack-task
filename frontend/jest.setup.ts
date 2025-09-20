import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
			forward: jest.fn(),
			refresh: jest.fn(),
		};
	},
	useSearchParams() {
		return new URLSearchParams();
	},
	usePathname() {
		return "/";
	},
	useParams() {
		return { locale: "en" };
	},
}));

// Mock next-intl
jest.mock("next-intl", () => ({
	useTranslations: () => (key: string) => key,
	useLocale: () => "en",
	useMessages: () => ({}),
}));

jest.mock("next-intl/server", () => ({
	getTranslations: () => (key: string) => key,
	getLocale: () => "en",
}));

// Mock utility functions
jest.mock("@/lib/utils", () => ({
	cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
	formatPrice: (price: number) => price.toLocaleString(),
	formatArea: (area: number) => `${area} sqm`,
	formatCurrency: (amount: number, currency = "EGP") =>
		`${amount.toLocaleString()} ${currency}`,
}));

// Mock environment variables
process.env.API_BASE_URL = "http://localhost:1337";

// Mock fetch globally
global.fetch = jest.fn();

// Setup IntersectionObserver mock
global.IntersectionObserver = class IntersectionObserver {
	root: Element | null = null;
	rootMargin: string = "0px";
	thresholds: ReadonlyArray<number> = [0];

	constructor() {}

	observe() {
		return null;
	}

	disconnect() {
		return null;
	}

	unobserve() {
		return null;
	}

	takeRecords(): IntersectionObserverEntry[] {
		return [];
	}
} as typeof IntersectionObserver;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	constructor() {}
	observe() {
		return null;
	}
	disconnect() {
		return null;
	}
	unobserve() {
		return null;
	}
};

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});
