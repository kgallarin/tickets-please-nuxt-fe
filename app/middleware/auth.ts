export default defineNuxtRouteMiddleware(() => {
	const { isAuthenticated } = useAuthUser();
	if (!isAuthenticated.value) return navigateTo('/auth/login');
});
