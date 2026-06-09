export interface User {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

export interface RawApiUser {
	id: number;
	attributes: {
		name: string;
		email: string;
		isAdmin: boolean;
	};
	links: {
		self: string;
	};
}
