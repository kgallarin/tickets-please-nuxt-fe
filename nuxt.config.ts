import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	css: ['~/assets/css/app.css', '@fortawesome/fontawesome-svg-core/styles.css'],
	build: {
		transpile: [
			'@fortawesome/vue-fontawesome',
			'@fortawesome/fontawesome-svg-core',
			'@fortawesome/free-solid-svg-icons',
			'@fortawesome/free-regular-svg-icons',
			'@fortawesome/free-brands-svg-icons',
		],
	},
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
		apiSecret: process.env.NUXT_API_SECRET,
		apiBaseUrl: process.env.NUXT_API_BASE_URL,
		public: {
			appUrl: process.env.NUXT_PUBLIC_APP_URL,
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
			include: ['@vue/devtools-core', '@vue/devtools-kit', '@vueuse/components'],
		},
	},
	alias: {
		'@components': fileURLToPath(new URL('./app/components', import.meta.url)),
		'@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
		'@utils': fileURLToPath(new URL('./utils', import.meta.url)),
	},
});
