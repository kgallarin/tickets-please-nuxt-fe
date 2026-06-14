<script setup lang="ts">
	import { computed } from 'vue';
	import { ticketService } from '~/services';

	const route = useRoute();
	const router = useRouter();

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

	function handleGoBack() {
		return router.back();
	}
	async function handleEditTicket() {
		await edit(form);
		handleGoBack();
	}
</script>

<template>
	<div class="edit-ticket mx-auto max-w-md">
		<div class="relative">
			<a href="#" class="absolute top-1/2 left-0 -translate-y-1/2" @click.prevent.stop="handleGoBack">
				<icon :icon="['fa', 'arrow-left']" />
			</a>
			<h1 class="py-8 text-center">Edit Ticket</h1>
		</div>
		<form class="flex flex-col gap-8" @submit.prevent="handleEditTicket">
			<base-input v-model="form.attributes.title" label="title" type="text" />
			<base-input v-model="form.attributes.description" type="textarea" />
			<base-input v-model="form.attributes.status" label="status" type="text" />

			<base-button type="submit" label="edit" />
		</form>
	</div>
</template>
