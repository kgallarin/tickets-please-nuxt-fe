import { type Ref, computed } from 'vue';

import { userService } from '~/services/user.service';
import type { RawApiUser, User, UserPayload } from '~~/types/User';

export function useUsers<T>(filters?: Ref<T>) {
	const { $apiFetch } = useNuxtApp();
	const {
		items: rawItems,
		loading,
		error,
		refresh,
	} = useApiFetchList<RawApiUser>((): string => 'v1/users', {
		params: filters,
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

	return {
		items,
		loading,
		error,
		create,
		destroy,
	};
}
