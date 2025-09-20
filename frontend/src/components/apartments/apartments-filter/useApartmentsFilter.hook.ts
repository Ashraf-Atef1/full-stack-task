import { usePathname, useRouter } from "@/i18n/routing";
import { ApartmentFilters } from "@/lib/api/types/apartment";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function useApartmentsFilter() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [filters, setFilters] = useState<ApartmentFilters>(
		Object.fromEntries(searchParams.entries()) as ApartmentFilters
	);
	const [prevTimeout, setPrevTimeout] = useState<NodeJS.Timeout | null>(null);

	const hasActiveFilters = !!Object.values(filters).filter((value) => value)
		.length;

	const updateFilter = (
		key: keyof ApartmentFilters,
		value: string | number | undefined
	) => {
		if (prevTimeout != null) clearTimeout(prevTimeout);
		let newFilters: Partial<ApartmentFilters> = { ...filters };
		if (!value) {
			delete newFilters[key];
		} else {
			newFilters = { ...newFilters, [key]: value };
		}
		const debounceTimeout = setTimeout(() => {
			router.push({
				pathname,
				query: { ...newFilters, page: 1 },
			});
			setPrevTimeout(null);
		}, 500);
		setFilters(newFilters);
		setPrevTimeout(debounceTimeout);
	};

	const handleSortChange = (value: string) => {
		const [field, order] = value.split("-") as [
			ApartmentFilters["sortBy"],
			ApartmentFilters["sortOrder"]
		];
		if (!field || !order) {
			delete filters.sortBy;
			delete filters.sortOrder;
			router.push({
				pathname,
				query: { ...filters, page: 1 },
			});
			setFilters(filters);
		} else {
			const newFilters = { ...filters, sortBy: field, sortOrder: order };
			router.push({
				pathname,
				query: { ...newFilters, page: 1 },
			});
			setFilters(newFilters);
		}
	};

	const clearFilters = () => {
		router.push({
			pathname,
			query: { page: 1 },
		});
		setFilters({});
		setIsOpen(false);
	};
	return {
		isOpen,
		filters,
		hasActiveFilters,
		setIsOpen,
		updateFilter,
		handleSortChange,
		clearFilters,
	};
}
