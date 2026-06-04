<script setup lang="ts">
	withDefaults(
		defineProps<{
			label?: string;
			loading?: boolean;
		}>(),
		{
			label: '',
			loading: false,
		},
	);
</script>

<template>
	<button
		class="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-sm text-white hover:bg-gray-400"
		:disabled="loading"
	>
		{{ loading ? 'loading' : label }}
	</button>
</template>
