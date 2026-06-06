import { useCookie } from '#imports';
import { defineStore } from 'pinia';
import type { User } from '~~/types/User';

export interface AuthState {
	user: User | null;
	token: string | null;
	loading: {
		global: boolean;
		login: boolean;
		logout: boolean;
	};
}

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => ({
		user: null,
		token: null,
		loading: {
			global: false,
			login: false,
			logout: false,
		},
	}),

	getters: {
		isAuthenticated: (state: AuthState): boolean => !!state.token,
		isAdmin: (state: AuthState): boolean => !!state.user?.isAdmin,
	},

	actions: {
		setSession(user: User, token: string): void {
			this.user = user;
			this.token = token;
		},

		clearSession(): void {
			this.user = null;
			this.token = null;
		},
	},
});
