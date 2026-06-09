import { getQuery } from 'h3';
import { createServerFetch } from '~~/server/utils/proxyFetch';
import type { PaginatedApiResponse } from '~~/types/Api';
import type { RawApiTicket } from '~~/types/Ticket';

export default defineEventHandler(async (event): Promise<PaginatedApiResponse<RawApiTicket>> => {
	const fetch = createServerFetch(event);
	const query = getQuery(event);

	return fetch<PaginatedApiResponse<RawApiTicket>>('v1/tickets', {
		query,
	});
});
