import { navigateTo } from '#imports';
import { authService } from '~/services';
import type { ApiError } from '~~/types/Api';
import type { LoginPayload } from '~~/types/Auth';

export function useAuth() {
	const { $apiFetch } = useNuxtApp();
	const store = useAuthStore();

	const token = useCookie('access_token');

	const error = ref<string | null>(null);

	async function login(payload: LoginPayload): Promise<void> {
		error.value = null;

		store.setLoading({ type: 'login', flag: true });
		try {
			const res = await authService.login(payload, $apiFetch);
			token.value = res.data.token;
			store.setSession(res.data.user, res.data.token);

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
			token.value = null;
			store.clearSession();

			await navigateTo('/auth/login');

			store.setLoading({ type: 'logout', flag: false });
		}
	}

	async function fetchCurrentUser(): Promise<void> {
		if (!token.value) return;

		try {
			const res = await authService.fetchCurrentUser($apiFetch);
			store.setSession(res.data, token.value);
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
