"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ApartmentsFilter from "./apartments-filter/ApartmentsFilter.component";
import { useApartments } from "./useApartments.hook";
import ApartmentCard from "./apartment-card/ApartmentCard.component";
import Pagination from "./pagination/Pagination.component";

export default function ApartmentsPage() {
	const t = useTranslations("apartments");
	const tCommon = useTranslations("common");
	const {
		apartments,
		isLoading,
		error,
		refetch,
		totalPages,
		total,
		compounds,
		neighborhoods,
		saleTypes,
		currentPage,
		handlePageChange,
	} = useApartments();

	if (error) {
		return (
			<div className="min-h-screen bg-background">
				<div className="container mx-auto px-4 py-8">
					<div className="text-center py-12">
						<p className="text-lg text-muted-foreground mb-4">{t("error")}</p>
						<Button onClick={() => refetch()}>{tCommon("retry")}</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<section className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
						{t("title")}
					</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Filters Sidebar */}
					<div className="lg:col-span-1">
						<ApartmentsFilter
							compounds={compounds}
							neighborhoods={neighborhoods}
							saleTypes={saleTypes}
						/>
					</div>

					{/* Apartments Grid */}
					<main className="lg:col-span-3">
						{isLoading ? (
							<div className="flex items-center justify-center py-12">
								<Loader2 className="h-8 w-8 animate-spin mr-2" />
								<span className="text-lg text-muted-foreground">
									{t("loading")}
								</span>
							</div>
						) : apartments.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-lg text-muted-foreground">
									{t("noResults")}
								</p>
							</div>
						) : (
							<>
								{/* Results Count */}
								<div className="mb-6 flex justify-between items-center">
									<p className="text-sm text-muted-foreground">
										{total} {total === 1 ? "apartment" : "apartments"} found
									</p>
									<p className="text-sm text-muted-foreground">
										Page {currentPage} of {totalPages}
									</p>
								</div>

								{/* Apartments Grid */}
								<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
									{apartments.map((apartment) => (
										<ApartmentCard key={apartment.id} apartment={apartment} />
									))}
								</div>

								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									handlePageChange={handlePageChange}
								/>
							</>
						)}
					</main>
				</div>
			</div>
		</section>
	);
}
