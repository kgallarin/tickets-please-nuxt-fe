<script setup lang="ts">
	withDefaults(
		defineProps<{
			label?: string;
			type?: string;
			error?: string;
		}>(),
		{
			label: '',
			type: 'text',
			error: '',
		},
	);
	const model = defineModel<string | number>();
</script>

<template>
	<div class="flex flex-col gap-y-1.5">
		<label :for="($attrs.id as string) || label" class="font-roboto block w-full text-sm font-medium capitalize">
			{{ label }}
		</label>
		<textarea
			v-if="type === 'textarea'"
			:id="($attrs.id as string) || label"
			v-model="model"
			v-bind="$attrs"
			minlength="10"
			cols="15"
			rows="5"
			class="rounded-md border p-4"
			:class="error ? 'border-red-500' : 'border-gray-300'"
		/>
		<input
			v-else
			:id="($attrs.id as string) || label"
			v-model="model"
			:type="type"
			v-bind="$attrs"
			class="block w-full rounded-md border px-3 py-2"
			:class="error ? 'border-red-500' : 'border-gray-300'"
		/>
	</div>
</template>
