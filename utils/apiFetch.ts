import { createError, navigateTo, useCookie } from '#imports';
import { type $Fetch, $fetch, type FetchOptions } from 'ofetch';
import type { ApiError } from '~~/types/Api';

export function createApiFetch(overrides: FetchOptions = {}): $Fetch {
	const config = useRuntimeConfig();
	const token = useCookie('access_token');
	return $fetch.create({
		baseURL: '/api',
		timeout: 15_000,

		onRequest({ options }) {
			const headers = new Headers(options.headers as HeadersInit);

			if (token.value) {
				headers.set('Authorization', `Bearer ${token.value}`);
				options.headers = headers;
			}
		},

		// errors
		onResponseError({ response }) {
			const error = response._data as ApiError;

			switch (response.status) {
				case 401:
					// token expired, redirect to login
					useCookie('access_token').value = null;
					navigateTo('/login');
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
