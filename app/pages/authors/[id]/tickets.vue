<script setup lang="ts">
	const route = useRoute();
	const { user } = useAuthUser();

	const userId = computed(() => route.params.id as string);
	const { normalizedAuthor, normalizedTickets, loading, destroyUserTicket } = useAuthor(userId);

	const handleDeleteTicket = async (ticketId: string) => await destroyUserTicket(ticketId);

	const router = useRouter();
	// async function handleEditTicket(id: string) {
	// 	await router.push(`/tickets/${id}/edit`);
	// }
	function handleGoBack() {
		return router.back();
	}

	function handleCreateTicket() {
		return navigateTo('/tickets/create');
	}
</script>

<template>
	<div>
		<div class="relative py-8">
			<a href="#" class="absolute top-1/2 left-2 -translate-x-1/2 -translate-y-1/2" @click.prevent.stop="handleGoBack">
				<icon :icon="['fas', 'arrow-left']" />
			</a>
			<h1 class="text-center text-lg">User with Tickets</h1>
			<base-button
				v-if="user?.id.toString() === userId"
				class="absolute top-1/2 right-0 -translate-y-1/2 border border-green-300 bg-transparent text-gray-800"
				@click.prevent.stop="handleCreateTicket"
			>
				<span>Add Ticket <icon :icon="['fas', 'plus']" /></span>
			</base-button>
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
