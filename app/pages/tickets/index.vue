<script setup lang="ts">
	useSeoPage({
		title: 'Tickets',
		description: 'Browse tickets',
	});

	definePageMeta({ middleware: 'auth' });
	const router = useRouter();

	const { items, destroy } = useTickets();

	const handleDeleteTicket = async (id: string) => await destroy(id);
	async function handleEditTicket(id: string) {
		await router.push(`/tickets/${id}/edit`);
	}
</script>

<template>
	<div class="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<template v-if="items">
			<ticket-card
				v-for="ticket in items"
				:key="ticket.id"
				:ticket="ticket"
				@on-edit="handleEditTicket"
				@on-delete="handleDeleteTicket"
			/>
		</template>
	</div>
</template>
