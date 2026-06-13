import { computed } from 'vue';

import { ticketService } from '~/services';
import { authorService } from '~/services/author.service';
import { userService } from '~/services/user.service';
import type { AuthorPayload } from '~~/types/Author';
import type { RawApiTicket, Ticket } from '~~/types/Ticket';
import type { RawApiUser, User } from '~~/types/User';

export function useAuthor(id: MaybeRef<string>) {
	const { $apiFetch } = useNuxtApp();

	const {
		data: author,
		loading,
		error,
		refresh,
	} = useApiFetchSingle<RawApiUser>((): string => `v1/authors/${unref(id)}`);

	const {
		items: tickets,
		loading: ticketsLoading,
		error: ticketsError,
		refresh: ticketsRefresh,
	} = useApiFetchList<RawApiTicket>((): string => `v1/authors/${unref(id)}/tickets`);

	async function destroyUserTicket(ticketId: MaybeRef<string>) {
		const res = await authorService.deleteAuthorTicketSingle(unref(id), unref(ticketId), $apiFetch);
		await ticketsRefresh();
		return res.data;
	}

	async function update(payload: AuthorPayload) {
		const res = await authorService.update(unref(id), payload, $apiFetch);
		await refresh();
		return res.data;
	}

	async function edit(payload: AuthorPayload) {
		const res = await authorService.edit(unref(id), payload, $apiFetch);
		await refresh();
		return res.data;
	}

	const normalizedTickets = computed((): Ticket[] => tickets.value.map(ticketService.normalizeTicketData));

	const normalizedAuthor = computed((): User => userService.normalizeUserData(author.value as RawApiUser));

	return {
		normalizedAuthor,
		loading,
		error,
		normalizedTickets,
		ticketsLoading,
		ticketsError,
		destroyUserTicket,
		ticketsRefresh,
		update,
		edit,
	};
}
