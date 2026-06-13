import { H3Event } from 'h3';
import type { ApiResponse } from '~~/types/Api';
import type { User } from '~~/types/User';

export default defineEventHandler(async (event: H3Event) => {
	const fetch = createServerFetch(event);
	const id = event.context.params?.id;

	return fetch<ApiResponse<User>>(`v1/authors/${id}`);
});
