<script setup lang="ts">
	const route = useRoute();

	const userId = computed(() => route.params.id as string);
	const { normalizedAuthor, normalizedTickets, loading, destroyUserTicket } = useAuthor(userId);

	const handleDeleteTicket = async (ticketId: string) => await destroyUserTicket(ticketId);

	// const router = useRouter();
	// async function handleEditTicket(id: string) {
	// 	await router.push(`/tickets/${id}/edit`);
	// }
</script>

<template>
	<div>
		<div class="py-8">
			<h1 class="text-center text-lg">User with Tickets</h1>
		</div>
		<div class="divide-y divide-gray-400">
			<div v-if="loading">loading...</div>
			<div v-else class="flex flex-col py-4 text-center">
				<p class="font-linowrite text-2xl">
					{{ normalizedAuthor.name }}
				</p>
				<p>
					{{ normalizedAuthor.email }}
				</p>
				<p>Admin: {{ normalizedAuthor.isAdmin ? 'Yes' : 'No' }}</p>
			</div>
			<div class="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<ticket-card
					v-for="ticket in normalizedTickets"
					:key="ticket.id"
					:ticket="ticket"
					@on-delete="handleDeleteTicket"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
