import { type Ref } from 'vue';

import type { Ticket } from '~~/types/Ticket';

export function useTicket(id: Ref<string>) {
	const { data: ticket, loading, error } = useApiFetchSingle<Ticket>((): string => `tickets/${id.value}`);

	return { ticket, loading, error };
}
