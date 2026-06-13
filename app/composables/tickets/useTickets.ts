import { type Ref } from 'vue';

import { ticketService } from '~/services/ticket.service';
import type { RawApiTicket, Ticket, TicketPayload } from '~~/types/Ticket';

export function useTickets<T>(filters?: Ref<T>) {
	const { $apiFetch } = useNuxtApp();

	const {
		items: rawItems,
		loading,
		error,
		refresh,
	} = useApiFetchList<RawApiTicket>((): string => 'v1/tickets', {
		params: filters,
	});

	async function create(payload: TicketPayload): Promise<Ticket> {
		const res = await ticketService.create(payload, $apiFetch);
		await refresh();
		return res.data;
	}

	async function destroy(id: string | Ref<string>): Promise<void> {
		await ticketService.delete(unref(id), $apiFetch);
		await refresh();
	}

	const items = computed((): Ticket[] => rawItems.value.map(ticketService.normalizeTicketData));
	return {
		items,
		loading,
		error,
		create,
		destroy,
	};
}
