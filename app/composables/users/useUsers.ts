import { type Ref, computed } from 'vue';

import { userService } from '~/services/user.service';
import type { RawApiUser, User, UserPayload } from '~~/types/User';

export function useUsers<T>(page?: MaybeRefOrGetter<number>, limit?: MaybeRefOrGetter<number>, filters?: Ref<T>) {
	const { $apiFetch } = useNuxtApp();
	const {
		items: rawItems,
		meta,
		loading,
		error,
		refresh,
	} = useApiFetchList<RawApiUser>((): string => 'v1/users', {
		params: filters,
		query: {
			page: computed(() => toValue(page)),
			limit: computed(() => toValue(limit)),
		},
		watch: [() => toValue(page), () => toValue(limit)],
	});

	async function create(payload: UserPayload): Promise<User> {
		const res = await userService.create(payload, $apiFetch);
		await refresh();
		return res.data;
	}

	async function destroy(id: string | Ref<string>): Promise<void> {
		await userService.delete(unref(id), $apiFetch);
		await refresh();
	}

	const items = computed((): User[] => rawItems.value.map(userService.normalizeUserData));
	const totalItems = computed(() => meta.value?.total ?? 0);
	const lastPage = computed(() => meta.value?.last_page ?? 0);

	return {
		items,
		totalItems,
		lastPage,
		loading,
		error,
		create,
		destroy,
	};
}
