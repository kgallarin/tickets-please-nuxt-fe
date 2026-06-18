import { computed } from 'vue';

import { authorService } from '~/services/author.service';
import { userService } from '~/services/user.service';
import type { AuthorPayload } from '~~/types/Author';
import type { RawApiUser, User } from '~~/types/User';

export function useAuthors<T>(page?: MaybeRefOrGetter<number>, limit?: MaybeRefOrGetter<number>, filters?: Ref<T>) {
	const { $apiFetch } = useNuxtApp();
	const {
		items: rawAuthorsItems,
		meta,
		loading,
		error,
		refresh,
	} = useApiFetchList<RawApiUser>((): string => `v1/authors`, {
		params: filters,
		query: {
			page: computed(() => toValue(page)),
			limit: computed(() => toValue(limit)),
		},
		watch: [() => toValue(page), () => toValue(limit)],
	});

	async function create(payload: AuthorPayload): Promise<User> {
		const res = await authorService.create(payload, $apiFetch);
		await refresh();
		return res.data;
	}

	async function destroy(id: string | Ref<string>): Promise<void> {
		await authorService.delete(unref(id), $apiFetch);
		await refresh();
	}

	const items = computed((): User[] => rawAuthorsItems.value.map(userService.normalizeUserData));
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
