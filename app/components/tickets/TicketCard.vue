<script setup lang="ts">
	import type { Ticket } from '~~/types/Ticket';
	const props = defineProps<{ ticket?: Ticket }>();

	const router = useRouter();
	async function handleEditTicket() {
		await router.push(`/tickets/${props.ticket?.id}/edit`);
	}
</script>

<template>
	<div
		data-role="base-ticket"
		class="mx-auto h-32 w-64 cursor-pointer bg-[url('/images/backgrounds/ticket.png')] bg-contain bg-no-repeat md:h-36 md:w-72"
		@click="handleEditTicket"
	>
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
