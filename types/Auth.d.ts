import type { User } from '~~/types/User';

export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface AuthResponse {
	data: {
		token: string;
		user: User;
		abilities: string[];
	};
	message: string;
	status: number;
}
