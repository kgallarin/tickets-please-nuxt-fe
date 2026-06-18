<script setup lang="ts">
	import { computed } from 'vue';

	// Define the shape of our options
	interface SelectOption {
		label: string;
		value: string | number;
		disabled?: boolean;
	}

	const modelValue = defineModel<string | number | null>({ default: null });

	const props = withDefaults(
		defineProps<{
			id: string;
			label?: string;
			options: SelectOption[];
			placeholder?: string;
			error?: string;
			hint?: string;
			disabled?: boolean;
			required?: boolean;
		}>(),
		{
			label: '',
			error: '',
			hint: '',
			placeholder: 'Select an option',
			disabled: false,
			required: false,
		},
	);

	const selectClasses = computed(() => {
		return [
			'block w-full rounded-lg border px-3 py-2.5 text-sm transition-colors duration-200',
			'focus:outline-none focus:ring-2',
			props.error
				? 'border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200'
				: 'border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-primary-100 dark:border-gray-600 ',
			props.disabled ? 'cursor-not-allowed bg-gray-100 opacity-60 ' : 'cursor-pointer',
		];
	});
</script>

<template>
	<div class="flex w-full flex-col gap-1.5">
		<label v-if="label" :for="id" class="text-sm font-medium capitalize">
			{{ label }}
			<span v-if="required" class="text-red-500" aria-hidden="true">*</span>
		</label>

		<div class="relative w-full">
			<icon :icon="['fas', 'chevron-down']" class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-900" />
			<select
				v-model="modelValue"
				:disabled="disabled"
				:required="required"
				:aria-invalid="!!error"
				:aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
				:class="selectClasses"
				class="appearance-none"
			>
				<option value="" disabled selected hidden>
					{{ placeholder }}
				</option>

				<option
					v-for="option in options"
					:key="option.value"
					:value="option.value"
					:disabled="option.disabled"
					class="dark:bg-gray-800"
				>
					{{ option.label }}
				</option>
			</select>
		</div>

		<p v-if="hint && !error" :id="`${id}-hint`" class="text-xs text-gray-500 dark:text-gray-400">
			{{ hint }}
		</p>

		<p v-if="error" :id="`${id}-error`" class="text-xs text-red-400" role="alert">
			{{ error }}
		</p>
	</div>
</template>
