export interface ITeamMemberData {
	id: string;
	name: string;
	role: string;
	photo?: { url: string; mime: string };
	linkedIn: string;
	phone: string;
	email: string;
	whatsapp: string;
}
