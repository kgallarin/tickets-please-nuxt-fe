import { createApiFetch } from '@utils/apiFetch';
import { defineNuxtPlugin } from 'nuxt/app';
import type { $Fetch } from 'ofetch';

declare module '#app' {
	interface NuxtApp {
		$apiFetch: $Fetch;
	}
}

export default defineNuxtPlugin((): { provide: { apiFetch: $Fetch } } => {
	const apiFetch = createApiFetch();

	return {
		provide: {
			apiFetch,
		},
	};
});
