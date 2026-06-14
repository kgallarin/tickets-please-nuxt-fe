import type { $Fetch } from 'ofetch';
import type { ApiResponse } from '~~/types/Api';
import type { AuthResponse, LoginPayload } from '~~/types/Auth';
import type { RawApiUser } from '~~/types/User';

type ApiFetch = $Fetch;

export const authService = {
	async login(payload: LoginPayload, $fetch: ApiFetch): Promise<AuthResponse> {
		return $fetch('auth/login', { method: 'POST', body: payload });
	},

	async logout($fetch: ApiFetch): Promise<void> {
		return $fetch('auth/logout', { method: 'POST' });
	},

	async fetchCurrentUser($fetch: ApiFetch): Promise<ApiResponse<RawApiUser>> {
		return $fetch('v1/me');
	},

	async refreshToken(token: string, $fetch: ApiFetch): Promise<{ token: string }> {
		return $fetch('auth/refresh', { method: 'POST', body: { token } });
	},
};
