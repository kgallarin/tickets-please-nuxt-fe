import { createError, navigateTo, useRequestHeaders } from '#imports';
import { type $Fetch, $fetch, type FetchContext, type FetchOptions, type ResponseType } from 'ofetch';
import type { ApiError } from '~~/types/Api';

export function createApiFetch(overrides: FetchOptions = {}): $Fetch {
	const config = useRuntimeConfig();

	// Captured during plugin setup (Nuxt context is active here).
	// Forwarded on server-side calls so Nitro's proxyFetch can read the
	// httpOnly access_token cookie and attach the Authorization header.
	const ssrHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};

	return $fetch.create({
		baseURL: import.meta.server ? `${config.public.APP_URL}/api` : '/api',
		timeout: 15_000,

		onRequest<T>({ options }: FetchContext<T, ResponseType>): void {
			const headers = new Headers(options.headers as HeadersInit);

			if (import.meta.server && ssrHeaders.cookie) {
				headers.set('cookie', ssrHeaders.cookie);
			}

			options.headers = headers;
		},

		// errors
		onResponseError({ response }) {
			const error = response._data as ApiError;

			switch (response.status) {
				case 401:
					// Redirect to login only on the client — navigateTo during SSR
					// would hijack the server response and cause redirect loops.
					if (import.meta.client) {
						navigateTo('auth/login');
					}
					break;

				case 403:
					throw createError({
						status: 403,
						message: 'Not allowed',
					});

				case 422:
					// validation errors
					throw createError({
						status: 422,
						message: error?.message ?? 'Validation error',
						data: error?.errors ?? {},
					});

				case 500:
					throw createError({
						status: 500,
						message: 'Internal server error',
					});
			}
		},

		...overrides,
	});
}
