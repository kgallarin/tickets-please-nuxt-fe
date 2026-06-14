<script setup lang="ts">
	import type { NavLink } from '~~/types/App';

	const isDropDownOpen = ref(false);
	import { vOnClickOutside } from '@vueuse/components';
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

	const emit = defineEmits<{
		onDropDownNavClick: [itemLabel: string];
	}>();
	function handleDropDownNavEmits(itemLabel: string) {
		emit('onDropDownNavClick', itemLabel);
	}

	function handleClickOutside() {
		return (isDropDownOpen.value = false);
	}
</script>

<template>
	<div v-on-click-outside="handleClickOutside" class="relative">
		<button
			class="font-roboto cursor-pointer bg-transparent text-sm"
			@click.prevent.stop="isDropDownOpen = !isDropDownOpen"
		>
			<slot />
		</button>
		<div
			v-show="isDropDownOpen"
			class="ring-opacity-5 absolute right-0 z-10 mt-2 flex w-56 max-w-fit origin-top-right flex-col overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
			@click="isDropDownOpen = false"
		>
			<base-nav-list
				:nav-links="props.navLinks"
				class="flex flex-col"
				nav-classes="px-4 py-2 hover:bg-gray-200 block w-full"
				@nav-on-click="handleDropDownNavEmits"
			/>
		</div>
	</div>
</template>

<style scoped></style>
