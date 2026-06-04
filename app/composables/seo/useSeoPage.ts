import type { SeoPageOptions } from '~~/types/Seo';

export function useSeoPage(options: SeoPageOptions) {
	const title = toRef(options.title);
	const description = toRef(options.description);
	const ogImage = toRef(options.ogImage ?? '/og-default.png');

	useSeoMeta({
		title,
		description,
		ogTitle: title,
		ogDescription: description,
		ogImage,
		robots: options.noIndex ? 'noIndex, nofollow' : 'index, follow',
	});

	const config = useRuntimeConfig();
	const route = useRoute();

	useHead({
		link: [
			{
				rel: 'canonical',
				href: computed((): string => `${config.public.NUXT_PUBLIC_APP_URL}${route.path}`),
			},
		],
	});
}
