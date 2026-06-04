import { getQuery } from 'h3';
import { createServerFetch } from '~/server/utils/proxyFetch';
import type { PaginatedApiResponse } from '~~/types/Api';
import type { Ticket } from '~~/types/Ticket';

export default defineEventHandler(async (event): Promise<PaginatedApiResponse<Ticket>> => {
	const fetch = createServerFetch(event);
	const config = useRuntimeConfig();
	const query = getQuery(event);

	return fetch<PaginatedApiResponse<Ticket>>(`${config.public.API_BASE_URL}/${config.public.API_VERSION}/tickets?`, {
		query,
	});
});
