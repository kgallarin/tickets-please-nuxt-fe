<script setup lang="ts">
	import { computed, useAttrs } from 'vue';

	const attrs = useAttrs();
	const defaultStyles = 'cursor-pointer rounded-md bg-gray-400 px-4 py-2 text-sm text-white hover:bg-gray-100';

	const buttonStyles = computed(() => cn(defaultStyles, attrs.class));

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
	<button :type="type" :class="buttonStyles" :disabled="loading">
		<span v-if="label">{{ loading ? 'loading' : label }}</span>
		<slot v-else />
	</button>
</template>
