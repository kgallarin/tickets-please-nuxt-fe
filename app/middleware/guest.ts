import { useCookie } from '#imports';

export default defineNuxtRouteMiddleware(() => {
	const isAuthenticated = import.meta.server
		? !!useCookie('access_token').value
		: useAuthStore().isAuthenticated;

	if (isAuthenticated) return navigateTo('/');
});
