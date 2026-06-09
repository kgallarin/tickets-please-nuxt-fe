import { type Ref, computed } from 'vue';

import { userService } from '~/services/user.service';
import type { RawApiUser, User } from '~~/types/User';

export function useUsers<T>(filters?: Ref<T>) {
	const {
		items: rawItems,
		loading,
		error,
	} = useApiFetchList<RawApiUser>('v1/users', {
		params: filters,
	});

	const items = computed((): User[] => rawItems.value.map(userService.normalizeUserData));

	return {
		items,
		loading,
		error,
	};
}
