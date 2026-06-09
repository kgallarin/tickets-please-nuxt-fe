import type { H3Event } from 'h3';
import { createServerFetch } from '~~/server/utils/proxyFetch';
import type { ApiResponse } from '~~/types/Api';
import type { RawApiTicket } from '~~/types/Ticket';

export default defineEventHandler(async (event: H3Event): Promise<ApiResponse<RawApiTicket>> => {
	const fetch = createServerFetch(event);
	const id = event.context.params?.id;

	return fetch<ApiResponse<RawApiTicket>>(`v1/tickets/${id}`);
});
