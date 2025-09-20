import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
	return new Intl.NumberFormat("en-US").format(price);
}

export function formatArea(area: number): string {
	return `${area} sqm`;
}

export function formatCurrency(
	amount: number,
	currency: string = "EGP"
): string {
	return `${formatPrice(amount)} ${currency}`;
}
