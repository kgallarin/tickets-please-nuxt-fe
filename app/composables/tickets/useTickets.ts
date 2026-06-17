import { type Ref } from 'vue';

import { ticketService } from '~/services/ticket.service';
import type { ApiError } from '~~/types/Api';
import type { RawApiTicket, Ticket, TicketPayloadCreate } from '~~/types/Ticket';

interface ValidationErrorItem {
	status: number;
	message: string;
	key: string;
}
export function useTickets<T>(filters?: Ref<T>) {
	const { $apiFetch } = useNuxtApp();

	const formErrorFromResponse = ref<ApiError | null>(null);
	const validationErrors = ref<Record<string, string>>({});

	const {
		items: rawItems,
		loading,
		error,
		refresh,
	} = useApiFetchList<RawApiTicket>((): string => 'v1/tickets', {
		params: filters,
	});

	async function create(payload: TicketPayloadCreate): Promise<Ticket | undefined> {
		try {
			const res = await ticketService.create(payload, $apiFetch);
			await refresh();
			return res.data;
		} catch (e) {
			const err = e as ApiError;
			if ((err as ApiError).status === 422 && Array.isArray(err.data)) {
				// fresh for reactivity
				const newErrors: Record<string, string> = {};

				err.data.forEach((item: ValidationErrorItem) => {
					// match schema
					const field = item.key.split('data.').pop();
					if (field) {
						newErrors[field] = item.message;
					} else {
						formErrorFromResponse.value = err;
					}
				});

				validationErrors.value = newErrors;
			}
		}
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
		validationErrors,
		create,
		destroy,
	};
}
