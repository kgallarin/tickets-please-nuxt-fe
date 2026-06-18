<script setup lang="ts">
	useSeoPage({
		title: 'Home',
		description: 'Browse tickets',
	});

	const router = useRouter();

	const { page, limit, paginationRange } = usePagination(() => totalItems.value, {
		defaultLimit: 8,
	});

	const { items, totalItems, destroy } = useTickets(
		() => page.value,
		() => limit.value,
	);

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
	<base-pagination v-model="page" :total="totalItems" :limit="limit" :range="paginationRange" />
</template>
