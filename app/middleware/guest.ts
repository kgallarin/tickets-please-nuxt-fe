import { useCookie } from '#imports';

export default defineNuxtRouteMiddleware(() => {
	const token = useCookie('access_token');

	if (token.value) return navigateTo('/');
});
