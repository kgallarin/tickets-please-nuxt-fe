import { computed } from 'vue';

import { authorService } from '~/services/author.service';
import { userService } from '~/services/user.service';
import type { AuthorPayload } from '~~/types/Author';
import type { RawApiUser, User } from '~~/types/User';

export function useAuthors<T>(filters?: Ref<T>) {
	const { $apiFetch } = useNuxtApp();
	const {
		items: rawAuthorsItems,
		loading,
		error,
		refresh,
	} = useApiFetchList<RawApiUser>((): string => `v1/authors`, {
		params: filters,
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

	return {
		items,
		loading,
		error,
		create,
		destroy,
	};
}
