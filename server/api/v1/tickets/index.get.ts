import { getQuery } from 'h3';
import { createServerFetch } from '~~/server/utils/proxyFetch';
import type { PaginatedApiResponse } from '~~/types/Api';
import type { Ticket } from '~~/types/Ticket';

export default defineEventHandler(async (event): Promise<PaginatedApiResponse<Ticket>> => {
	const fetch = createServerFetch(event);
	const query = getQuery(event);

	return fetch<PaginatedApiResponse<Ticket>>('v1/tickets', {
		query,
	});
});
