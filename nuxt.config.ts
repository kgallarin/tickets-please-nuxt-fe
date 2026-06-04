import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	css: ['~/assets/css/app.css'],
	modules: [
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					Roboto: '300..700',
					Inter: '300..700',
				},
				display: 'swap',
				preconnect: true,
				preload: true,
				download: false,
			},
		],
		'@pinia/nuxt',
	],
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.PUBLIC_API_BASE_URL,
			API_VERSION: process.env.PUBLIC_API_VERSION,
		},
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	imports: {
		dirs: ['composables/**'],
	},
	future: {
		compatibilityVersion: 4,
	},
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: ['@vue/devtools-core', '@vue/devtools-kit'],
		},
	},
	alias: {
		'@components': fileURLToPath(new URL('./app/components', import.meta.url)),
		'@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
		'@utils': fileURLToPath(new URL('./utils', import.meta.url)),
	},
});
