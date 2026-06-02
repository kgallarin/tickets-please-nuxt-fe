import { computed } from 'vue';

import { useFetch, useNuxtApp } from '#imports';
import type { ApiResponse, PaginatedApiResponse } from '@appTypes/Api';
import type { UseFetchOptions } from 'nuxt/app';

export function useApi<T>(url: string | (() => string), options?: UseFetchOptions<ApiResponse<T>>) {
	const { $apiFetch } = useNuxtApp();

	const { data, status, error, refresh, execute } = useFetch<ApiResponse<T>>(url, {
		// $apiFetch is typed as ofetch's $Fetch but Nuxt expects a narrower Nitro-typed $Fetch — cast it to satisfy the overload.
		// Once the overload fails, TypeScript loses the generic shape, causing the .data / .meta property errors — those will resolve with the cast fix.

		// The cast $apiFetch as UseFetchOptions<R>['$fetch'] tells TypeScript "trust that this fetcher returns R", which is true at runtime since $apiFetch is generic.
		// Once the overload resolves correctly, TypeScript can infer the full shape of data.value and the .data / .meta property errors disappear too.
		$fetch: $apiFetch as UseFetchOptions<ApiResponse<T>>['$fetch'],
		...options,
	});

	return {
		data: computed((): T | null => data.value?.data ?? null),
		loading: computed((): boolean => status.value === 'pending'),
		error,
		refresh,
		execute,
	};
}

export function useApiList<T>(url: string | (() => string), options?: UseFetchOptions<PaginatedApiResponse<T>>) {
	const { $apiFetch } = useNuxtApp();

	const { data, status, error, refresh, execute } = useFetch<PaginatedApiResponse<T>>(url, {
		$fetch: $apiFetch as UseFetchOptions<PaginatedApiResponse<T>>['$fetch'],
		...options,
	});

	return {
		items: computed((): T[] => data.value?.data ?? []),
		meta: computed(() => data.value?.meta ?? null),
		loading: computed((): boolean => status.value === 'pending'),
		error,
		refresh,
		execute,
	};
}
