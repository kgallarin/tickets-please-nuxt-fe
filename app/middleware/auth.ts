import { useCookie } from '#imports';

export default defineNuxtRouteMiddleware(() => {
	// httpOnly cookies are readable server-side but not client-side.
	// On server: check the cookie directly. On client: rely on the store
	// which is populated via SSR hydration or after login.
	const isAuthenticated = import.meta.server
		? !!useCookie('access_token').value
		: useAuthStore().isAuthenticated;

	if (!isAuthenticated) return navigateTo('/auth/login');
});
