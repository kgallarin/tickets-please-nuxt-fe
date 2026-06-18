<script setup lang="ts">
	const props = defineProps<{
		modelValue: number;
		total: number;
		limit: number;
		range: (number | string)[];
	}>();

	const emit = defineEmits<{
		(e: 'update:modelValue', value: number): void;
	}>();

	const totalPages = computed(() => Math.ceil(props.total / props.limit));

	function setPage(page: number | string) {
		if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
			emit('update:modelValue', page);
		}
	}
</script>

<template>
	<div v-if="totalPages > 1" class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
		<div class="flex flex-1 justify-between sm:hidden">
			<base-button :disabled="modelValue === 1" @click.prevent.stop="setPage(modelValue - 1)"> Previous </base-button>
			<base-button :disabled="modelValue === totalPages" @click.prevent.stop="setPage(modelValue + 1)">
				Next
			</base-button>
		</div>

		<div class="sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<p class="text-sm text-gray-700">
					Showing page
					<span class="">
						{{ modelValue }}
					</span>
					of
					<span>
						{{ totalPages }}
					</span>
					pages
				</p>
			</div>

			<div>
				<nav class="isolate inline-flex gap-2 -space-x-px rounded-md" aria-label="pagination">
					<template v-for="(pageItem, index) in range" :key="index">
						<span
							v-if="typeof pageItem === 'string'"
							class="relative inline-flex cursor-default items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 select-none ring-inset"
						>
							...
						</span>

						<base-button
							v-else
							:class="[
								pageItem === modelValue
									? 'z-10 bg-gray-900 text-white'
									: 'bg-white text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 hover:text-gray-900',
								'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:text-yellow-500',
							]"
							@click.prevent.stop="setPage(pageItem)"
						>
							{{ pageItem }}
						</base-button>
					</template>
				</nav>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
