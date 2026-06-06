import { getCookie } from 'h3';
import type { H3Event } from 'h3';
import type { FetchContext, ResponseType } from 'ofetch';

export function createServerFetch(event: H3Event) {
	// On the server, we CAN read httpOnly cookies — the browser cannot
	const token = getCookie(event, 'access_token');
	const config = useRuntimeConfig();
	return $fetch.create({
		baseURL: `${config.API_BASE_URL}/api`,
		timeout: 15_000,

		onRequest<T>({ options }: FetchContext<T, ResponseType>): void {
			if (token) {
				const headers = new Headers(options.headers as HeadersInit);
				headers.set('Authorization', `Bearer ${token}`);
				options.headers = headers;
			}
		},
	});
}
