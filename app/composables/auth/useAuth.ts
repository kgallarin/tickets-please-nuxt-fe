import { navigateTo } from '#imports';
import { authService } from '~/services';
import type { ApiError } from '~~/types/Api';
import type { LoginPayload } from '~~/types/Auth';

export function useAuth() {
	const { $apiFetch } = useNuxtApp();
	const store = useAuthStore();

	const error = ref<string | null>(null);

	async function login(payload: LoginPayload): Promise<void> {
		error.value = null;

		store.setLoading({ type: 'login', flag: true });
		try {
			const res = await authService.login(payload, $apiFetch);
			store.setSession(res.data.user);

			await navigateTo('/');
		} catch (e) {
			if (e) {
				error.value = (e as ApiError).data?.message ?? 'Login failed.';
			}
		} finally {
			store.setLoading({ type: 'login', flag: false });
		}
	}

	async function logout(): Promise<void> {
		store.setLoading({ type: 'logout', flag: true });

		try {
			await authService.logout($apiFetch);
		} finally {
			store.clearSession();
			store.setLoading({ type: 'logout', flag: false });
		}
		await navigateTo('/auth/login', { replace: true });
	}

	async function fetchCurrentUser(): Promise<void> {
		try {
			const res = await authService.fetchCurrentUser($apiFetch);
			store.setSession(res.data);
		} catch {
			store.clearSession();
		}
	}

	return {
		login,
		logout,
		fetchCurrentUser,
		loginLoading: computed((): boolean => store.getLoading('login')),
		logoutLoading: computed((): boolean => store.getLoading('logout')),
		error,
	};
}
