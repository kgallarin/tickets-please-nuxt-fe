import type { H3Event } from 'h3';
import { createServerFetch } from '~~/server/utils/proxyFetch';
import type { ApiResponse } from '~~/types/Api';
import type { User } from '~~/types/User';

export default defineEventHandler(async (event: H3Event): Promise<ApiResponse<User>> => {
	const fetch = createServerFetch(event);
	return fetch<ApiResponse<User>>('v1/me');
});
