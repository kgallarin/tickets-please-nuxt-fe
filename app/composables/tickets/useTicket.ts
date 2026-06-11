import { type Ref } from 'vue';

import { ticketService } from '~/services';
import type { RawApiTicket, Ticket, TicketPayload } from '~~/types/Ticket';

export function useTicket(id: string | Ref<string>) {
	const { $apiFetch } = useNuxtApp();

	const { data: ticket, loading, error, refresh } = useApiFetchSingle<RawApiTicket>(`v1/tickets/${unref(id)}`);

	async function update(payload: TicketPayload): Promise<Ticket> {
		const res = await ticketService.update(unref(id), payload, $apiFetch);

		return res.data;
	}

	async function edit(payload: TicketPayload): Promise<Ticket> {
		const res = await ticketService.edit(unref(id), payload, $apiFetch);

		return res.data;
	}

	return { ticket, loading, error, refresh, update, edit };
}
