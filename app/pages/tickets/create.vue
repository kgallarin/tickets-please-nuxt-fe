<script setup lang="ts">
	import { computed } from 'vue';

	const { create } = useTickets();
	const { user: authUser } = useAuthUser();
	const authUserId = computed(() => authUser.value?.id);
	const form = reactive({
		attributes: {
			title: '',
			description: '',
			status: '',
		},
		relationships: {
			user: {
				data: {
					id: authUserId.value,
				},
			},
		},
	});

	async function handleEditTicket() {
		try {
			await create(form);
		} finally {
			navigateTo(`/authors/${authUserId.value}/tickets`);
		}
	}
</script>

<template>
	<div class="create-ticket mx-auto max-w-md">
		<h1 class="py-8 text-center">Create Ticket</h1>
		<form class="flex flex-col gap-8" @submit.prevent="handleEditTicket">
			<base-input v-model="form.attributes.title" label="title" type="text" />
			<base-input v-model="form.attributes.description" type="textarea" />
			<base-input v-model="form.attributes.status" label="status" type="text" />

			<base-button type="submit" label="create" />
		</form>
	</div>
</template>
