import { type H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig();
	// const path = event.path.replace('/api/', '');
	const target = `${config.public.API_BASE_URL}/${event.path}`;
	console.log('proxy →', event.path, '→', target);
	// const body = await readBody(event).catch(() => undefined);

	return proxyRequest(event, target, {
		fetch,
		headers: {
			'X-Internal-Key': config.apiSecret as string,
			'Content-Type': 'application/json',
		},
	});
});
