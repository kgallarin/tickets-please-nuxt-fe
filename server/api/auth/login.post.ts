import { readBody } from 'h3';
import type { H3Event } from 'h3';
import { createServerFetch } from '~~/server/utils/proxyFetch';
import type { AuthResponse } from '~~/types/Auth';

export default defineEventHandler(async (event: H3Event) => {
	const body = await readBody(event);
	const fetch = createServerFetch(event);
	const res = await fetch<AuthResponse>('auth/login', { method: 'POST', body });

	setCookie(event, 'access_token', res.data.token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
	});

	return res;
});
