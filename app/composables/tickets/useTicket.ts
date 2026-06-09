import { type Ref } from 'vue';

import { ticketService } from '~/services';
import type { RawApiTicket, Ticket, UpdateTicketPayload } from '~~/types/Ticket';

export function useTicket(id: string | Ref<string>) {
	const { $apiFetch } = useNuxtApp();

	const { data: ticket, loading, error } = useApiFetchSingle<RawApiTicket>(`v1/tickets/${unref(id)}`);

	async function update(payload: UpdateTicketPayload): Promise<Ticket> {
		const res = await ticketService.update(unref(id), payload, $apiFetch);

		return res.data;
	}

	async function edit(payload: UpdateTicketPayload): Promise<Ticket> {
		const res = await ticketService.edit(unref(id), payload, $apiFetch);

		return res.data;
	}
	// cons

	return { ticket, update, edit, loading, error };
}
