import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const fetch = createServerFetch(event);
	const body = await readBody(event);

	return fetch('v1/users', {
		method: 'POST',
		body,
	});
});
