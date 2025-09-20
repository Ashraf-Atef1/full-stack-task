"use server";
import axios from "axios";
import { getLocale } from "next-intl/server";
import {
	Apartment,
	ApartmentFilters,
	ApartmentListResponse,
	CreateApartmentDto,
} from "./types/apartment";

const axiosInstance = axios.create({
	baseURL: process.env.API_BASE_URL || "http://localhost:3000",
});

interface FileUploadResponse {
	url: string;
	filename: string;
	originalName: string;
	size: number;
}

interface MultipleFileUploadResponse {
	files: FileUploadResponse[];
}

export async function getApartments(
	filters: ApartmentFilters = {}
): Promise<ApartmentListResponse> {
	const currentLocale = await getLocale();
	const response = await axiosInstance.get("/apartments", {
		params: {
			lang: currentLocale,
			...filters,
			limit: 6,
		},
	});
	return response.data;
}

export async function getApartmentById(id: number): Promise<Apartment> {
	const currentLocale = await getLocale();
	const response = await axiosInstance.get(`/apartments/${id}`, {
		params: { lang: currentLocale },
	});
	return response.data;
}

export async function uploadApartmentImage(
	file: File
): Promise<FileUploadResponse> {
	const formData = new FormData();
	formData.append("file", file);

	const response = await axiosInstance.post(
		"/uploads/apartment-image",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return response.data;
}

export async function uploadApartmentImages(
	files: File[]
): Promise<MultipleFileUploadResponse> {
	const formData = new FormData();
	files.forEach((file) => {
		formData.append("files", file);
	});

	const response = await axiosInstance.post(
		"/uploads/apartment-images",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return response.data;
}

export async function createApartment(
	apartmentData: CreateApartmentDto
): Promise<Apartment> {
	const response = await axiosInstance.post("/apartments", apartmentData, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
}
