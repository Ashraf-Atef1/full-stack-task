export interface IClientData {
	id: string;
	name: string;
	role: string;
	content: string;
	photo: { url: string; mime: string };
}

export interface ICompanyData {
	id: string;
	image: { url: string; mime: string };
	alt: string;
	url: string;
}
