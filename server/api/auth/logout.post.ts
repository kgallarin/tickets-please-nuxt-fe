import type { H3Event } from 'h3';
import { createServerFetch } from '~~/server/utils/proxyFetch';

export default defineEventHandler(async (event: H3Event) => {
	const fetch = createServerFetch(event);
	await fetch('auth/logout', { method: 'POST' });
	deleteCookie(event, 'access_token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
	});

	return { success: true };
});
