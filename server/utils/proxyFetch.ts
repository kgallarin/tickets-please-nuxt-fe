import { createError } from '#imports';
import { getCookie } from 'h3';
import type { H3Event } from 'h3';
import type { FetchContext, ResponseType } from 'ofetch';
import type { ApiError } from '~~/types/Api';

export function createServerFetch(event: H3Event) {
	// On the server, we CAN read httpOnly cookies — the browser cannot
	const token = getCookie(event, 'access_token');
	const config = useRuntimeConfig(event);

	return $fetch.create({
		baseURL: `${config.apiBaseUrl}/api`,
		timeout: 15_000,
		headers: {
			'x-internal-key': config.apiSecret, // protects public routes (unused)
		},

		onRequest<T>({ options }: FetchContext<T, ResponseType>): void {
			const headers = new Headers(options.headers as HeadersInit);
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			options.headers = headers;
		},

		onResponseError({ response }) {
			const error = response._data as ApiError;

			switch (response.status) {
				case 403:
					throw createError({
						status: 403,
						message: 'Not allowed',
					});

				case 422:
					throw createError({
						status: 422,
						message: response._data?.message ?? 'Validation error',
						// Direct Laravel structure or fallback to finding the root error object/array
						data: error?.errors ?? error.data ?? {},
					});

				case 500:
					throw createError({
						status: 500,
						message: 'Internal server error',
					});
			}
		},
	});
}
