import { computed } from 'vue';

import { useFetch, useNuxtApp } from '#imports';
import type { UseFetchOptions } from 'nuxt/app';
import type { ApiResponse, PaginatedApiResponse } from '~~/types/Api';

export function useApiFetchSingle<T>(url: string | (() => string), options?: UseFetchOptions<ApiResponse<T>>) {
	const { $apiFetch } = useNuxtApp();

	const { data, status, error, refresh, execute } = useFetch<ApiResponse<T>>(url, {
		$fetch: $apiFetch as UseFetchOptions<ApiResponse<T>>['$fetch'],
		...options,
		dedupe: 'defer',
	});

	return {
		data: computed((): T | null => data.value?.data ?? null),
		loading: computed((): boolean => status.value === 'pending'),
		error,
		refresh,
		execute,
	};
}

export function useApiFetchList<T>(url: string | (() => string), options?: UseFetchOptions<PaginatedApiResponse<T>>) {
	const { $apiFetch } = useNuxtApp();

	const { data, status, error, refresh, execute } = useFetch<PaginatedApiResponse<T>>(url, {
		$fetch: $apiFetch as UseFetchOptions<PaginatedApiResponse<T>>['$fetch'],
		...options,
		dedupe: 'defer',
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
