import { userService } from '~/services/user.service';
import type { RawApiUser, User, UserPayload } from '~~/types/User';

export function useUser(id: string | Ref<string>) {
	const { $apiFetch } = useNuxtApp();

	const { data: user, loading, error, refresh } = useApiFetchSingle<RawApiUser>(`v1/users/${unref(id)}`);

	async function update(payload: UserPayload): Promise<User> {
		const res = await userService.update(unref(id), payload, $apiFetch);
		await refresh();
		return res.data;
	}

	async function edit(payload: UserPayload): Promise<User> {
		const res = await userService.edit(unref(id), payload, $apiFetch);
		await refresh();
		return res.data;
	}

	return {
		user,
		loading,
		error,
		refresh,
		update,
		edit,
	};
}
