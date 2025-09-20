export interface IFileUploadProps {
	onUploadComplete: (urls: string[]) => void;
	maxFiles?: number;
	accept?: string;
	multiple?: boolean;
	className?: string;
}

export interface IUploadingFile {
	file: File;
	progress: number;
	url?: string;
	error?: string;
}

export interface IUseFileUploadProps {
	onUploadComplete: (urls: string[]) => void;
	maxFiles?: number;
	multiple?: boolean;
}
