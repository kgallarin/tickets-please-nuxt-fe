import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const fetch = createServerFetch(event);
	const body = await readBody(event);
	const id = event.context.params?.id;

	return fetch(`v1/tickets/${id}`, { method: 'PATCH', body });
});
