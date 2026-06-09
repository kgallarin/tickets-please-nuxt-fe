import { createError } from '#imports';
import { getCookie } from 'h3';
import type { H3Event } from 'h3';
import type { FetchContext, ResponseType } from 'ofetch';
import type { ApiError } from '~~/types/Api';

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

		onResponseError({ response }) {
			const error = response._data as ApiError;

			switch (response.status) {
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
						data: error?.data ?? {},
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
