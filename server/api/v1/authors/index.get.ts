import { H3Event } from 'h3';
import type { PaginatedApiResponse } from '~~/types/Api';
import type { User } from '~~/types/User';

export default defineEventHandler(async (event: H3Event) => {
	const fetch = createServerFetch(event);
	const query = getQuery(event);

	return fetch<PaginatedApiResponse<User>>('v1/authors', {
		query,
	});
});
