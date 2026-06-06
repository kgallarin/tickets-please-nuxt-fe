<script setup lang="ts">
	import type { NavLink } from '~~/types/App';

	withDefaults(
		defineProps<{
			navLinks?: NavLink[];
		}>(),
		{
			navLinks: () => [
				{
					label: 'Home',
					href: '/',
				},
			],
		},
	);

	const slot = useSlots();
</script>

<template>
	<ClientOnly>
		<ul class="flex space-x-4">
			<li v-for="link in navLinks" :key="link.href" class="font-roboto text-sm">
				<NuxtLink :to="link.href" class="hover:underline">{{ link.label }}</NuxtLink>
			</li>
			<slot v-if="slot.default" />
		</ul>
	</ClientOnly>
</template>
