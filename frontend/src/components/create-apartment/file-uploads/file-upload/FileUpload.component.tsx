"use client";
import { IFileUploadProps } from "./FileUpload.types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useFileUpload } from "./useFileUpload.hook";
import { useTranslations } from "next-intl";

export default function FileUpload({
	onUploadComplete,
	maxFiles = 10,
	accept = "image/*",
	multiple = true,
	className = "",
}: IFileUploadProps) {
	const t = useTranslations("common");
	const {
		fileInputRef,
		uploadedUrls,
		uploadingFiles,
		handleFileSelect,
		removeUploadedImage,
		removeUploadingFile,
	} = useFileUpload({
		onUploadComplete,
		maxFiles,
		multiple,
	});

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Upload Button */}
			<div>
				<input
					ref={fileInputRef}
					type="file"
					accept={accept}
					multiple={multiple}
					onChange={handleFileSelect}
					className="hidden"
				/>

				<Button
					type="button"
					variant="outline"
					onClick={() => fileInputRef.current?.click()}
					disabled={uploadedUrls.length >= maxFiles}
					className="w-full h-32 border-dashed border-2"
				>
					<div className="flex flex-col items-center gap-2">
						<Upload className="w-8 h-8 text-muted-foreground" />
						<span>
							{uploadedUrls.length >= maxFiles
								? `${t("maximumFilesReached")} ${maxFiles}`
								: `${t("clickToUpload")} ${
										multiple ? t("images") : t("image")
								  }`}
						</span>
						<span className="text-sm text-muted-foreground">
							{uploadedUrls.length}/{maxFiles} {t("filesUploaded")}
						</span>
					</div>
				</Button>
			</div>

			{/* Uploading Files */}
			{uploadingFiles.length > 0 && (
				<div className="space-y-2">
					<h4 className="text-sm font-medium">{t("uploading")}</h4>
					{uploadingFiles.map((uploadingFile, index) => (
						<div
							key={index}
							className="flex items-center gap-3 p-3 border rounded-lg"
						>
							<ImageIcon className="w-8 h-8 text-muted-foreground" />
							<div className="flex-1">
								<p className="text-sm font-medium truncate">
									{uploadingFile.file.name}
								</p>
								{uploadingFile.error ? (
									<p className="text-sm text-red-500">{uploadingFile.error}</p>
								) : (
									<Progress value={uploadingFile.progress} className="mt-1" />
								)}
							</div>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => removeUploadingFile(uploadingFile.file)}
							>
								<X className="w-4 h-4" />
							</Button>
						</div>
					))}
				</div>
			)}

			{/* Uploaded Images */}
			{uploadedUrls.length > 0 && (
				<div className="space-y-2">
					<h4 className="text-sm font-medium">{t("uploadedImages")}</h4>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{uploadedUrls.map((url, index) => (
							<div key={index} className="relative group">
								<div className="aspect-square overflow-hidden rounded-lg border">
									<Image
										src={url}
										alt={`Uploaded image ${index + 1}`}
										width={200}
										height={200}
										className="w-full h-full object-cover"
									/>
								</div>
								<Button
									type="button"
									variant="destructive"
									size="sm"
									onClick={() => removeUploadedImage(url)}
									className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<X className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
