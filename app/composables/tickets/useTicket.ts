import { type Ref } from 'vue';

import { ticketService } from '~/services';
import type { RawApiTicket, Ticket, TicketPayload } from '~~/types/Ticket';

export function useTicket() {
	const { $apiFetch } = useNuxtApp();

	function fetchUser(id: string | Ref<string>) {
		const { data, loading, error, refresh } = useApiFetchSingle<RawApiTicket>(`v1/tickets/${unref(id)}`);

		return {
			data,
			loading,
			error,
			refresh,
		};
	}

	async function create(payload: TicketPayload): Promise<Ticket> {
		const res = await ticketService.create(payload, $apiFetch);

		return res.data;
	}
	async function update(id: string | Ref<string>, payload: TicketPayload): Promise<Ticket> {
		const res = await ticketService.update(unref(id), payload, $apiFetch);

		return res.data;
	}

	async function edit(id: string | Ref<string>, payload: TicketPayload): Promise<Ticket> {
		const res = await ticketService.edit(unref(id), payload, $apiFetch);

		return res.data;
	}
	// cons

	return { fetchUser, create, update, edit };
}
