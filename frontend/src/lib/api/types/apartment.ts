export interface ApartmentTranslation {
	id: number;
	locale: string;
	title: string;
	description: string;
	slug: string;
	seoTitle?: string;
	seoDescription?: string;
	seoKeywords?: string[];
	createdAt: string;
	updatedAt: string;
}

export interface Apartment {
	id: number;
	referenceNo: string;
	compound: string;
	neighborhood: string;
	developer: string;
	saleType: string;
	price: number;
	areaSqm: number;
	bedrooms: number;
	bathrooms: number;
	finishingStatus: string;
	deliveryStatus: string;
	downPayment?: number;
	monthlyInstallment?: number;
	installmentDurationYears?: number;
	isDelivered: boolean;
	listingUrl: string;
	phoneNumber?: string;
	galleryImages?: string[];
	floorPlanUrl?: string;
	createdAt: string;
	updatedAt: string;
	locale: string;
	title: string;
	description: string;
	slug: string;
	seoTitle?: string;
	seoDescription?: string;
	seoKeywords?: string[];
}

export interface ApartmentFilters {
	search?: string;
	priceMin?: number;
	priceMax?: number;
	areaMin?: number;
	areaMax?: number;
	bedrooms?: number;
	bathrooms?: number;
	compound?: string;
	neighborhood?: string;
	saleType?: string;
	deliveryStatus?: string;
	isDelivered?: boolean;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	page?: number;
}

export interface ApartmentListResponse {
	apartments: Apartment[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface CreateApartmentDto {
	referenceNo: string;
	compound: string;
	neighborhood: string;
	developer: string;
	saleType: string;
	price: number;
	areaSqm: number;
	bedrooms: number;
	bathrooms: number;
	finishingStatus: string;
	deliveryStatus: string;
	downPayment?: number;
	monthlyInstallment?: number;
	installmentDurationYears?: number;
	isDelivered: boolean;
	listingUrl: string;
	galleryImages?: string[];
	floorPlanUrl?: string;
	translations: Omit<ApartmentTranslation, "id" | "createdAt" | "updatedAt">[];
}
