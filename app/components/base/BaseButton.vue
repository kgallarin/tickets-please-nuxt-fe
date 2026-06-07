<script setup lang="ts">
	withDefaults(
		defineProps<{
			label?: string;
			loading?: boolean;
			type?: 'button' | 'submit' | 'reset';
		}>(),
		{
			label: '',
			loading: false,
			type: 'button',
		},
	);
</script>

<template>
	<button
		:type="type"
		class="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-sm text-white hover:bg-gray-400"
		:disabled="loading"
	>
		{{ loading ? 'loading' : label }}
	</button>
</template>
