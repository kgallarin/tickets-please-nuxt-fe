import { defineStore } from 'pinia';
import type { User } from '~~/types/User';

export interface AuthState {
	user: User | null;
	loading: {
		global: boolean;
		login: boolean;
		logout: boolean;
	};
}

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => ({
		user: null,
		loading: {
			global: false,
			login: false,
			logout: false,
		},
	}),

	getters: {
		isAuthenticated: (state: AuthState): boolean => !!state.user,
		isAdmin: (state: AuthState): boolean => !!state.user?.isAdmin,
	},

	actions: {
		setSession(user: User): void {
			this.user = user;
		},

		clearSession(): void {
			this.user = null;
		},
	},
});
