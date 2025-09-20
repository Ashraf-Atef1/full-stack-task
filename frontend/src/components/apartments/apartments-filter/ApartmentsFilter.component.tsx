"use client";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import SelectList from "../../shared/select-list/SelectList.component";
import InputField from "../../shared/input-field/InputField.component";
import useApartmentsFilter from "./useApartmentsFilter.hook";
import { IApartmentFiltersProps } from "./ApartmentsFilter.types";

export default function ApartmentsFilter({
	compounds = [],
	neighborhoods = [],
	saleTypes = [],
}: IApartmentFiltersProps) {
	const t = useTranslations("apartments.filters");
	const {
		isOpen,
		filters,
		hasActiveFilters,
		setIsOpen,
		updateFilter,
		handleSortChange,
		clearFilters,
	} = useApartmentsFilter();

	return (
		<div className="space-y-4">
			{/* Mobile Toggle Button */}
			<div className="md:hidden">
				<Button
					variant="outline"
					onClick={() => setIsOpen(!isOpen)}
					className="w-full"
				>
					<Filter className="w-4 h-4 mr-2" />
					{t("label")}
					{hasActiveFilters && (
						<span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
							{
								Object.values(filters).filter(
									(v) => v !== undefined && v !== ""
								).length
							}
						</span>
					)}
				</Button>
			</div>

			{/* Filters Panel */}
			<Card className={`${isOpen ? "block" : "hidden"} md:block`}>
				<CardHeader className="pb-4">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg">{t("label")}</CardTitle>
						{hasActiveFilters && (
							<Button
								variant="ghost"
								size="sm"
								onClick={clearFilters}
								className="text-muted-foreground hover:text-foreground"
							>
								<X className="w-4 h-4 mr-1" />
								{t("clearFilters")}
							</Button>
						)}
					</div>
				</CardHeader>

				<CardContent className="grid md:grid-cols-2 lg:grid-cols-1 gap-x-2 gap-y-4">
					{/* Search */}

					<SelectList
						label={t("sortBy.label")}
						placeholder={t("sortBy.label")}
						value={
							filters.sortBy && filters.sortOrder
								? `${filters.sortBy}-${filters.sortOrder}`
								: undefined
						}
						onValueChange={(value: string) => handleSortChange(value)}
						values={[
							{ label: t("sortBy.priceAsc"), value: "price-asc" },
							{ label: t("sortBy.priceDesc"), value: "price-desc" },
							{ label: t("sortBy.areaAsc"), value: "areaSqm-asc" },
							{ label: t("sortBy.areaDesc"), value: "areaSqm-desc" },
							{ label: t("sortBy.newest"), value: "createdAt-desc" },
							{ label: t("sortBy.oldest"), value: "createdAt-asc" },
						]}
						allowClear
					/>
					<InputField
						label={t("search")}
						id="search"
						placeholder={t("searchPlaceholder")}
						value={filters.search || ""}
						onChange={(e) => updateFilter("search", e.target.value)}
					/>

					{/* Price Range */}

					<InputField
						label={t("priceRange") + " (Min)"}
						id="priceMin"
						type="number"
						min={0}
						placeholder="Min price"
						value={filters.priceMin || ""}
						onChange={(e) =>
							updateFilter(
								"priceMin",
								e.target.value ? Number(e.target.value) : undefined
							)
						}
					/>
					<InputField
						label={t("priceRange") + " (Max)"}
						id="priceMax"
						type="number"
						min={0}
						placeholder="Max price"
						value={filters.priceMax || ""}
						onChange={(e) =>
							updateFilter(
								"priceMax",
								e.target.value ? Number(e.target.value) : undefined
							)
						}
					/>

					{/* Area Range */}

					<InputField
						label={t("area") + " (Min)"}
						id="areaMin"
						type="number"
						placeholder="Min area"
						value={filters.areaMin || ""}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							updateFilter(
								"areaMin",
								e.target.value ? Number(e.target.value) : undefined
							)
						}
					/>
					<InputField
						label={t("area") + " (Max)"}
						id="areaMax"
						type="number"
						placeholder="Max area"
						value={filters.areaMax || ""}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							updateFilter(
								"areaMax",
								e.target.value ? Number(e.target.value) : undefined
							)
						}
					/>

					{/* Bedrooms & Bathrooms */}

					<SelectList
						label={t("bedrooms")}
						placeholder="Any"
						value={filters.bedrooms?.toString()}
						onValueChange={(value: string) =>
							updateFilter("bedrooms", value ? Number(value) : undefined)
						}
						values={[
							{ label: "1", value: "1" },
							{ label: "2", value: "2" },
							{ label: "3", value: "3" },
							{ label: "4", value: "4" },
							{ label: "5+", value: "5" },
						]}
						allowClear
					/>

					<SelectList
						label={t("bathrooms")}
						placeholder="Any"
						value={filters.bathrooms?.toString()}
						onValueChange={(value: string) =>
							updateFilter("bathrooms", value ? Number(value) : undefined)
						}
						values={[
							{ label: "1", value: "1" },
							{ label: "2", value: "2" },
							{ label: "3", value: "3" },
							{ label: "4+", value: "4" },
						]}
						allowClear
					/>

					{/* Location Filters */}

					{compounds.length > 0 && (
						<SelectList
							label={t("compound")}
							placeholder="Any"
							value={filters.compound}
							onValueChange={(value: string) =>
								updateFilter("compound", value || undefined)
							}
							values={compounds.map((compound) => ({
								label: compound,
								value: compound,
							}))}
							allowClear
						/>
					)}

					{neighborhoods.length > 0 && (
						<SelectList
							label={t("neighborhood")}
							placeholder="Any"
							value={filters.neighborhood || ""}
							onValueChange={(value: string) =>
								updateFilter("neighborhood", value || undefined)
							}
							values={neighborhoods.map((neighborhood) => ({
								label: neighborhood,
								value: neighborhood,
							}))}
							allowClear
						/>
					)}

					{/* Sale Type */}
					{saleTypes.length > 0 && (
						<SelectList
							label={t("saleType")}
							placeholder="Any sale type"
							value={filters.saleType || ""}
							onValueChange={(value: string) =>
								updateFilter("saleType", value || undefined)
							}
							values={saleTypes.map((saleType) => ({
								label: saleType,
								value: saleType,
							}))}
							allowClear
						/>
					)}

					{/* Apply Button for Mobile */}
					<div className="md:hidden pt-4">
						<Button onClick={() => setIsOpen(false)} className="w-full">
							{t("applyFilters")}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
