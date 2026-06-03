import { createApiFetch } from '@utils/apiFetch';
import type { $Fetch } from 'ofetch';
import { defineNuxtPlugin } from 'nuxt/app';

declare module '#app' {
	interface NuxtApp {
		$apiFetch: $Fetch;
	}
}

export default defineNuxtPlugin(() => {
	const apiFetch = createApiFetch();

	return {
		provide: {
			apiFetch,
		},
	};
});
