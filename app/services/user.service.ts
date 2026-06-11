import type { $Fetch } from 'ofetch';
import type { RawApiUser, User, UserPayload } from '~~/types/User';

type ApiFetch = $Fetch;
const userURL = 'v1/users';

export const userService = {
	async create(payload: UserPayload, $fetch: ApiFetch) {
		return $fetch(userURL, {
			method: 'POST',
			body: {
				data: {
					...payload,
				},
			},
		});
	},

	async update(id: string, payload: UserPayload, $fetch: ApiFetch) {
		return $fetch(`${userURL}/${id}`, {
			method: 'PUT',
			body: payload,
		});
	},

	async edit(id: string, payload: UserPayload, $fetch: ApiFetch) {
		return $fetch(`${userURL}/${id}`, {
			method: 'PATCH',
			body: {
				data: {
					...payload,
				},
			},
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
