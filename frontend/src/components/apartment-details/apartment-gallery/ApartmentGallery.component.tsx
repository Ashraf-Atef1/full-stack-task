"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IApartmentGalleryProps } from "./ApartmentGallery.types";

export function ApartmentGallery({
	images: apartmentImages,
	title,
}: IApartmentGalleryProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [images, setImages] = useState(apartmentImages);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const openLightbox = (index: number) => {
		setCurrentImageIndex(index);
		setIsLightboxOpen(true);
	};

	const closeLightbox = () => {
		setIsLightboxOpen(false);
	};

	if (images.length === 0) {
		return (
			<div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
				<span className="text-muted-foreground">No images available</span>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-4">
				{/* Main Image */}
				<div className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer">
					<Image
						src={images[currentImageIndex]}
						alt={`${title} - Image ${currentImageIndex + 1}`}
						onError={() => setImages(["/placeholder-apartment.svg"])}
						fill
						className="object-cover transition-transform group-hover:scale-105"
						onClick={() => openLightbox(currentImageIndex)}
					/>

					{/* Navigation Arrows */}
					{images.length > 1 && (
						<>
							<Button
								variant="secondary"
								size="icon"
								className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={(e) => {
									e.stopPropagation();
									prevImage();
								}}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="secondary"
								size="icon"
								className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={(e) => {
									e.stopPropagation();
									nextImage();
								}}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</>
					)}

					{/* Image Counter */}
					{images.length > 1 && (
						<div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
							{currentImageIndex + 1} / {images.length}
						</div>
					)}
				</div>

				{/* Thumbnail Strip */}
				{images.length > 1 && (
					<div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
						{images.map((image, index) => (
							<div
								key={index}
								className={`aspect-square overflow-hidden rounded-md cursor-pointer border-2 transition-all ${
									index === currentImageIndex
										? "border-primary"
										: "border-transparent hover:border-muted-foreground"
								}`}
								onClick={() => setCurrentImageIndex(index)}
							>
								<Image
									src={image}
									alt={`${title} - Thumbnail ${index + 1}`}
									onError={() => setImages(["/placeholder-apartment.svg"])}
									width={100}
									height={100}
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Lightbox */}
			{isLightboxOpen && (
				<div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
					<div className="relative w-full h-full flex items-center justify-center p-4">
						{/* Close Button */}
						<Button
							variant="secondary"
							size="icon"
							className="absolute top-4 right-4 z-10"
							onClick={closeLightbox}
						>
							<X className="h-4 w-4" />
						</Button>

						{/* Main Lightbox Image */}
						<div className="relative max-w-4xl max-h-full">
							<Image
								src={images[currentImageIndex]}
								alt={`${title} - Image ${currentImageIndex + 1}`}
								width={1200}
								height={800}
								className="max-w-full max-h-full object-contain"
							/>
						</div>

						{/* Navigation in Lightbox */}
						{images.length > 1 && (
							<>
								<Button
									variant="secondary"
									size="icon"
									className="absolute left-4 top-1/2 transform -translate-y-1/2"
									onClick={prevImage}
								>
									<ChevronLeft className="h-4 w-4" />
								</Button>
								<Button
									variant="secondary"
									size="icon"
									className="absolute right-4 top-1/2 transform -translate-y-1/2"
									onClick={nextImage}
								>
									<ChevronRight className="h-4 w-4" />
								</Button>
							</>
						)}

						{/* Image Counter in Lightbox */}
						<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
							{currentImageIndex + 1} / {images.length}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
