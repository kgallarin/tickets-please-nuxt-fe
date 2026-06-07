import { computed } from 'vue';

import type { User } from '~~/types/User';

export function useAuthUser() {
	const store = useAuthStore();

	return {
		user: computed((): User | null => store.user),
		isAuthenticated: computed((): boolean => store.isAuthenticated),
		isAdmin: computed((): boolean => store.isAdmin),
	};
}
