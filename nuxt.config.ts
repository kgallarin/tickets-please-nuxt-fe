import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@pinia/nuxt'],
	future: {
		compatibilityVersion: 4,
	},
	css: ['~/assets/css/app.css'],
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: ['@vue/devtools-core', '@vue/devtools-kit'],
		},
	},
	alias: {
		'@images': fileURLToPath(new URL('./app/assets/images', import.meta.url)),
		'@css': fileURLToPath(new URL('./app/assets/css', import.meta.url)),
		'@fonts': fileURLToPath(new URL('./app/assets/fonts', import.meta.url)),
		'@components': fileURLToPath(new URL('./app/components', import.meta.url)),
		'@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
	},
});
