import { usePathname, useRouter } from "@/i18n/routing";
import { getApartments } from "@/lib/api/apartment.route";
import { ApartmentFilters } from "@/lib/api/types/apartment";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

export function useApartments() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const filters = Object.fromEntries(
		searchParams.entries()
	) as ApartmentFilters;

	const {
		data: apartmentResponse,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["apartments", searchParams.toString(), locale],
		queryFn: () => getApartments(filters),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const apartments = apartmentResponse?.apartments || [];
	const totalPages = apartmentResponse?.totalPages || 1;
	const total = apartmentResponse?.total || 0;
	const compounds = [...new Set(apartments.map((apt) => apt.compound))];
	const neighborhoods = [...new Set(apartments.map((apt) => apt.neighborhood))];
	const saleTypes = [...new Set(apartments.map((apt) => apt.saleType))];

	const handlePageChange = (page: number) => {
		router.push({
			pathname,
			query: { ...filters, page },
		});
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return {
		data: apartmentResponse,
		isLoading,
		error,
		refetch,
		apartments,
		totalPages,
		total,
		compounds,
		neighborhoods,
		saleTypes,
		currentPage: filters.page ? Number(filters.page) : 1,
		handlePageChange,
	};
}
