import type { $Fetch } from 'ofetch';
import type { AuthorPayload } from '~~/types/Author';

type ApiFetch = $Fetch;
const authorURL = 'v1/authors';
export const authorService = {
	async create(payload: AuthorPayload, $fetch: ApiFetch) {
		return $fetch(authorURL, {
			method: 'POST',
			body: {
				data: {
					...payload,
				},
			},
		});
	},

	async update(id: string, payload: AuthorPayload, $fetch: ApiFetch) {
		return $fetch(`${authorURL}/${id}`, {
			method: 'PUT',
			body: {
				data: {
					...payload,
				},
			},
		});
	},

	async edit(id: string, payload: AuthorPayload, $fetch: ApiFetch) {
		return $fetch(`${authorURL}/${id}`, {
			method: 'PATCH',
			body: {
				data: {
					...payload,
				},
			},
		});
	},

	async delete(id: string, $fetch: ApiFetch) {
		return $fetch(`${authorURL}/${id}`, {
			method: 'DELETE',
		});
	},

	async deleteAuthorTicketSingle(authorId: MaybeRef<string>, ticketId: MaybeRef<string>, $fetch: ApiFetch) {
		return $fetch(`v1/authors/${unref(authorId)}/tickets/${unref(ticketId)}`, {
			method: 'DELETE',
		});
	},
};
