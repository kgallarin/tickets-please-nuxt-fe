import { type Ref } from 'vue';

import { ticketService } from '~/services/ticket.service';
import type { RawApiTicket, Ticket } from '~~/types/Ticket';

export function useTickets<T>(filters?: Ref<T>) {
	const config = useRuntimeConfig();
	const {
		items: rawItems,
		loading,
		error,
	} = useApiFetchList<RawApiTicket>(`${config.public.API_BASE_URL}/tickets`, {
		params: filters,
	});

	const items = computed((): Ticket[] => rawItems.value.map(ticketService.normalizeTicketData));
	return {
		items,
		loading,
		error,
	};
}
