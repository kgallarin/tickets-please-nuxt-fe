<script setup lang="ts">
	import type { NavLink } from '~~/types/App';
	import { computed } from 'vue';

	const props = withDefaults(
		defineProps<{
			navLinks?: NavLink[];
		}>(),
		{
			navLinks: () => [
				{
					label: 'Home',
					href: '/',
					auth: false,
				},
			],
		},
	);

	const filteredNavLinks = computed(() => {
		return props.navLinks.filter((item) => item.auth);
	});

	const emit = defineEmits<{
		navOnClick: [itemLabel: string];
	}>();
</script>

<template>
	<ClientOnly>
		<nav class="flex space-x-8">
			<div v-for="link in filteredNavLinks" :key="link.label" class="font-roboto text-sm">
				<NuxtLink v-if="link.href" :to="link.href" class="hover:underline">{{ link.label }}</NuxtLink>
				<a v-else href="#" @click.prevent.stop="emit('navOnClick', link.label)">{{ link.label }}</a>
			</div>
		</nav>
	</ClientOnly>
</template>
