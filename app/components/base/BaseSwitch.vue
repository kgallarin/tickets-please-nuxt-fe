<script setup lang="ts">
	const model = defineModel({
		type: Boolean,
		default: false,
	});

	withDefaults(
		defineProps<{
			label?: string;
		}>(),
		{
			label: 'base switch',
		},
	);
</script>

<template>
	<label class="flex cursor-pointer items-center justify-between gap-4">
		<span v-if="label" class="text-sm text-gray-900 capitalize">
			{{ label }}
		</span>
		<div class="relative inline-flex items-center">
			<input v-model="model" type="checkbox" class="peer sr-only" />
			<div
				class="peer-focus:rint-2 peer peer h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500/50 peer-focus:outline-none dark:bg-gray-700"
			></div>
			<div
				class="top 0.5 border-gray absolute left-0.5 h-5 w-5 rounded-full border border-gray-300 bg-white transition-transform duration-200 peer-checked:translate-x-full dark:border-none"
			></div>
		</div>
	</label>
</template>

<style scoped></style>
