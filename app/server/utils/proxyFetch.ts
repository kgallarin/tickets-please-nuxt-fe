import { type H3Event, getCookie } from 'h3';
import { $fetch } from 'ofetch';

export function createServerFetch(event: H3Event) {
	const token = getCookie(event, 'access_token');
	const config = useRuntimeConfig(event);

	return $fetch.create({
		baseURL: config.public.API_BASE_URL,
		timeout: 15_000,

		onRequest({ options }) {
			if (token) {
				const headers = new Headers(options.headers as HeadersInit);
				headers.set('Authorization', `Bearer ${token}`);

				options.headers = headers;
			}
		},
	});
}
