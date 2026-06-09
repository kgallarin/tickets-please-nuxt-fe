export default defineNuxtPlugin(async (): Promise<void> => {
	const token = useCookie('access_token');
	if (!token.value) return;

	const { fetchCurrentUser } = useAuth();
	await fetchCurrentUser();
});
