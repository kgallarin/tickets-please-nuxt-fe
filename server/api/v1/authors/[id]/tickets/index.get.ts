import { H3Event } from 'h3';
import type { PaginatedApiResponse } from '~~/types/Api';
import type { RawApiTicket } from '~~/types/Ticket';

export default defineEventHandler(async (event: H3Event) => {
	const fetch = createServerFetch(event);
	const query = getQuery(event);
	const id = event.context.params?.id;

	return fetch<PaginatedApiResponse<RawApiTicket>>(`v1/authors/${id}/tickets`, {
		query,
	});
});
