import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const fetch = createServerFetch(event);
	const id = event.context.params?.id;
	const ticketId = event.context.params?.ticketId;
	const body = await readBody(event);

	return fetch(`v1/authors/${id}/tickets/${ticketId}`, {
		method: 'DELETE',
		body,
	});
});
