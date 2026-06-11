<script setup lang="ts">
	import { computed } from 'vue';
	import { ticketService } from '~/services';

	const route = useRoute();

	const ticketParamId = computed(() => route.params.id as string);
	const { ticket, edit } = useTicket(ticketParamId);

	const form = reactive({
		attributes: {
			title: '',
			description: '',
			status: '',
		},
	});

	watch(
		ticket,
		(newVal) => {
			if (newVal) {
				Object.assign(form.attributes, ticketService.normalizeTicketData(newVal));
			}
		},
		{ immediate: true },
	);
	async function handleEditTicket() {
		await edit(form);
	}
</script>

<template>
	<div class="edit-ticket">
		<form class="flex flex-col gap-8" @submit.prevent="handleEditTicket">
			<base-input v-model="form.attributes.title" label="title" type="text" />
			<base-input v-model="form.attributes.description" type="textarea" />
			<base-input v-model="form.attributes.status" label="status" type="text" />

			<base-button type="submit" label="edit" />
		</form>
	</div>
</template>
