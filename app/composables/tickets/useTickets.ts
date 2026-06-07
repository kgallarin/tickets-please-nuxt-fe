import { type Ref } from 'vue';

import { ticketService } from '~/services/ticket.service';
import type { RawApiTicket, Ticket } from '~~/types/Ticket';

export function useTickets<T>(filters?: Ref<T>) {
	const {
		items: rawItems,
		loading,
		error,
	} = useApiFetchList<RawApiTicket>('v1/tickets', {
		params: filters,
	});

	const items = computed((): Ticket[] => rawItems.value.map(ticketService.normalizeTicketData));
	return {
		items,
		loading,
		error,
	};
}
