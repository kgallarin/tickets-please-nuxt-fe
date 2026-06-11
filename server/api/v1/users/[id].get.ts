import { H3Event } from 'h3';
import type { ApiResponse } from '~~/types/Api';
import type { RawApiUser } from '~~/types/User';

export default defineEventHandler(async (event: H3Event): Promise<ApiResponse<RawApiUser>> => {
	const fetch = createServerFetch(event);
	const id = event.context.params?.id;

	return fetch<ApiResponse<RawApiUser>>(`v1/users/${id}`);
});
