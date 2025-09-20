import { useRef, useState } from "react";
import { IUploadingFile, IUseFileUploadProps } from "./FileUpload.types";
import {
	uploadApartmentImage,
	uploadApartmentImages,
} from "@/lib/api/apartment.route";
import { enqueueSnackbar } from "notistack";
import { useTranslations } from "next-intl";

export function useFileUpload({
	onUploadComplete,
	maxFiles = 10,
	multiple = true,
}: IUseFileUploadProps) {
	const [uploadingFiles, setUploadingFiles] = useState<IUploadingFile[]>([]);
	const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const t = useTranslations("errors");

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);

		if (files.length === 0) return;

		// Validate file count
		if (uploadedUrls.length + files.length > maxFiles) {
			enqueueSnackbar(`${maxFiles} ${t("maxFiles")}`, {
				variant: "error",
			});
			return;
		}

		// Validate file types
		const invalidFiles = files.filter(
			(file) => !file.type.startsWith("image/")
		);
		if (invalidFiles.length > 0) {
			enqueueSnackbar(t("onlyImage"), {
				variant: "error",
			});
			return;
		}

		// Validate file sizes (5MB limit)
		const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
		if (oversizedFiles.length > 0) {
			enqueueSnackbar(t("maxFileSize"), {
				variant: "error",
			});
			return;
		}

		uploadFiles(files);
	};

	const uploadFiles = async (files: File[]) => {
		const newUploadingFiles: IUploadingFile[] = files.map((file) => ({
			file,
			progress: 0,
		}));

		setUploadingFiles((prev) => [...prev, ...newUploadingFiles]);

		try {
			if (multiple && files.length > 1) {
				// Upload multiple files at once
				const result = await uploadApartmentImages(files);
				const urls = result.files.map((f) => f.url);

				setUploadedUrls((prev) => [...prev, ...urls]);
				onUploadComplete([...uploadedUrls, ...urls]);

				setUploadingFiles((prev) =>
					prev.filter((uf) => !files.includes(uf.file))
				);
			} else {
				// Upload files individually
				for (let i = 0; i < files.length; i++) {
					const file = files[i];

					try {
						setUploadingFiles((prev) =>
							prev.map((uf) =>
								uf.file === file ? { ...uf, progress: 50 } : uf
							)
						);

						const result = await uploadApartmentImage(file);

						setUploadingFiles((prev) =>
							prev.map((uf) =>
								uf.file === file
									? { ...uf, progress: 100, url: result.url }
									: uf
							)
						);

						setUploadedUrls((prev) => {
							const newUrls = [...prev, result.url];
							onUploadComplete(newUrls);
							return newUrls;
						});

						// Remove from uploading list after a short delay
						setTimeout(() => {
							setUploadingFiles((prev) =>
								prev.filter((uf) => uf.file !== file)
							);
						}, 1000);
					} catch {
						setUploadingFiles((prev) =>
							prev.map((uf) =>
								uf.file === file ? { ...uf, error: "Upload failed" } : uf
							)
						);
					}
				}
			}
		} catch (error) {
			console.error("Upload error:", error);
			setUploadingFiles((prev) =>
				prev.map((uf) => ({ ...uf, error: "Upload failed" }))
			);
		}
	};

	const removeUploadedImage = (urlToRemove: string) => {
		const newUrls = uploadedUrls.filter((url) => url !== urlToRemove);
		setUploadedUrls(newUrls);
		onUploadComplete(newUrls);
	};

	const removeUploadingFile = (fileToRemove: File) => {
		setUploadingFiles((prev) => prev.filter((uf) => uf.file !== fileToRemove));
	};

	return {
		fileInputRef,
		uploadedUrls,
		uploadingFiles,
		handleFileSelect,
		removeUploadedImage,
		removeUploadingFile,
	};
}
