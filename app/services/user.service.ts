import type { $Fetch } from 'ofetch';
import type { RawApiUser, User } from '~~/types/User';

type ApiFetch = $Fetch;
const userURL = '/users';

export const userService = {
	async create<T>(payload: Record<string, T>, $fetch: ApiFetch) {
		return $fetch(userURL, {
			method: 'POST',
			body: payload,
		});
	},

	async update<T>(id: string, payload: Record<string, T>, $fetch: ApiFetch) {
		return $fetch(`${userURL}/${id}`, {
			method: 'PUT',
			body: payload,
		});
	},

	async delete(id: string, $fetch: ApiFetch) {
		return $fetch(`${userURL}/${id}`, {
			method: 'DELETE',
		});
	},

	canEdit(user: User): boolean {
		return user.isAdmin;
	},

	normalizeUserData(rawUser: RawApiUser): User {
		return {
			id: rawUser.id.toString(),
			name: rawUser.attributes.name,
			email: rawUser.attributes.email,
			isAdmin: rawUser.attributes.isAdmin,
		};
	},
};
