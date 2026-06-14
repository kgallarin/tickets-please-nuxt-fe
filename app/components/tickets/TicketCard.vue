<script setup lang="ts">
	import type { Ticket } from '~~/types/Ticket';
	const props = defineProps<{ ticket?: Ticket }>();
	const emit = defineEmits<{
		onDelete: [id: string];
		onEdit: [id: string];
	}>();

	const { isAuthenticated } = useAuthUser();

	function handleEmitDelete() {
		if (!props.ticket?.id || !isAuthenticated.value) return;
		emit('onDelete', props.ticket?.id);
	}

	function handleEmitEdit() {
		if (!props.ticket?.id || !isAuthenticated.value) return;
		emit('onEdit', props.ticket?.id);
	}

	const showDelete = ref(false);
</script>

<template>
	<div
		data-role="base-ticket"
		class="relative mx-auto h-32 w-64 cursor-pointer bg-[url('/images/backgrounds/ticket.png')] bg-contain bg-no-repeat md:h-36 md:w-72"
		@click.prevent.stop="handleEmitEdit"
		@mouseenter="showDelete = true"
		@mouseleave="showDelete = false"
	>
		<div
			v-if="showDelete && isAuthenticated"
			class="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-2"
			@click.prevent.stop="handleEmitDelete"
		>
			<icon :icon="['fas', 'close']" class="text-xs text-white" />
		</div>
		<div class="ticket-inner flex h-full flex-col px-11 py-5">
			<div class="flex w-full flex-col items-center justify-between">
				<h1 class="text-xl">
					{{ ticket?.title }}
				</h1>

				<h3>
					{{ ticket?.status }}
				</h3>
			</div>

			<div class="mt-auto text-right">
				<span class="text-sm">{{ ticket?.author.name }}</span>
			</div>
		</div>
	</div>
</template>
