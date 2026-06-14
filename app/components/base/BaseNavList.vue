<script setup lang="ts">
	import type { NavLink } from '~~/types/App';
	import { computed } from 'vue';

	const props = withDefaults(
		defineProps<{
			navLinks?: NavLink[];
			navClasses?: string;
		}>(),
		{
			navLinks: () => [
				{
					label: 'Home',
					href: '/',
					auth: false,
				},
			],
			navClasses: '',
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
			<div v-for="link in filteredNavLinks" :key="link.label" class="font-roboto w-full text-sm">
				<NuxtLink v-if="link.href" :to="link.href" :class="navClasses" class="hover:underline">
					{{ link.label }}
				</NuxtLink>
				<a
					v-else
					href="#"
					:class="navClasses"
					class="hover:underline"
					@click.prevent.stop="emit('navOnClick', link.label)"
				>
					{{ link.label }}
				</a>
			</div>
		</nav>
	</ClientOnly>
</template>
