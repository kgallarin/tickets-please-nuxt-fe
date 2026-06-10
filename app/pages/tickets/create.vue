<script setup lang="ts">
	const { create } = useTicket();
	const { user: authUser } = useAuthUser();
	const form = reactive({
		attributes: {
			title: '',
			description: '',
			status: '',
		},
		relationships: {
			user: {
				data: {
					id: authUser.value?.id,
				},
			},
		},
	});

	async function handleEditTicket() {
		await create(form);
	}
</script>

<template>
	<div class="edit-ticket">
		<form class="flex flex-col gap-8" @submit.prevent="handleEditTicket">
			<base-input v-model="form.attributes.title" label="title" type="text" />
			<base-input v-model="form.attributes.description" type="textarea" />
			<base-input v-model="form.attributes.status" label="status" type="text" />

			<base-button type="submit" label="create" />
		</form>
	</div>
</template>
