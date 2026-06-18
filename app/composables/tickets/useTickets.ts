import { type Ref } from 'vue';

import { ticketService } from '~/services/ticket.service';
import type { RawApiTicket, Ticket, TicketPayloadCreate } from '~~/types/Ticket';

export function useTickets<T>(page?: MaybeRefOrGetter<number>, limit?: MaybeRefOrGetter<number>, filters?: Ref<T>) {
	const { $apiFetch } = useNuxtApp();

	const {
		items: rawItems,
		meta,
		loading,
		error,
		refresh,
	} = useApiFetchList<RawApiTicket>((): string => 'v1/tickets', {
		params: filters,
		query: {
			page: computed(() => toValue(page)),
			limit: computed(() => toValue(limit)),
		},
		watch: [() => toValue(page), () => toValue(limit)],
	});

	async function create(payload: TicketPayloadCreate): Promise<Ticket | undefined> {
		const res = await ticketService.create(payload, $apiFetch);
		await refresh();
		return res.data;
	}

	async function destroy(id: string | Ref<string>): Promise<void> {
		await ticketService.delete(unref(id), $apiFetch);
		await refresh();
	}

	const items = computed((): Ticket[] => rawItems.value.map(ticketService.normalizeTicketData));
	const totalItems = computed(() => meta.value?.total ?? 0);
	const lastPage = computed(() => meta.value?.last_page ?? 0);

	return {
		items,
		totalItems,
		lastPage,
		loading,
		error,
		create,
		destroy,
	};
}
