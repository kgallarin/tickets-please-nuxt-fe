<script setup lang="ts">
	import { computed } from 'vue';
	import { ticketService } from '~/services';
	import { z } from 'zod';
	import { toTypedSchema } from '@vee-validate/zod';
	import type { TicketPayload, TicketStatus } from '~~/types/Ticket';

	const route = useRoute();
	const router = useRouter();

	const ticketStatusOptions = [
		{
			label: 'active',
			value: 'A',
			disabled: false,
		},
		{
			label: 'completed',
			value: 'C',
			disabled: false,
		},
		{
			label: 'on-hold',
			value: 'H',
			disabled: false,
		},
		{
			label: 'inactive',
			value: 'X',
			disabled: false,
		},
	];

	const ticketParamId = computed(() => route.params.id as string);
	const { ticket, edit } = useTicket(ticketParamId);

	const editTicketSchema = toTypedSchema(
		z.object({
			title: z.string().min(4, { message: 'Title must be at least 4 characters' }),
			description: z.string().min(5, 'Description must have at least 5 characters.'),
			status: z
				.enum(['A', 'C', 'H', 'X'], {
					errorMap: () => ({
						message: 'Input must be either A, C, H or X',
					}),
				})
				.nullable() as z.ZodType<TicketStatus>,
		}),
	);

	const { defineField, errors, handleSubmit, submitCount, resetForm } = useAppForm({
		schema: editTicketSchema,
	});

	const [title] = defineField('title');
	const [description] = defineField('description');
	const [status] = defineField('status');

	watch(
		ticket,
		(newVal) => {
			if (newVal) {
				resetForm({
					values: ticketService.normalizeTicketData(newVal),
				});
			}
		},
		{ immediate: true },
	);

	function handleGoBack() {
		return router.back();
	}

	const onSubmit = handleSubmit(async (values) => {
		await edit(values as TicketPayload);
		handleGoBack();
	});
</script>

<template>
	<div class="edit-ticket mx-auto max-w-md">
		<div class="relative">
			<a href="#" class="absolute top-1/2 left-0 -translate-y-1/2" @click.prevent.stop="handleGoBack">
				<icon :icon="['fa', 'arrow-left']" />
			</a>
			<h1 class="py-8 text-center">Edit Ticket</h1>
		</div>
		<form class="flex flex-col gap-8" @submit.prevent="onSubmit">
			<base-input
				v-model="title"
				label="title"
				type="text"
				:error="submitCount > 0 && errors.title ? errors.title : ''"
			/>
			<base-input
				v-model="description"
				type="textarea"
				:error="submitCount > 0 && errors.description ? errors.description : ''"
			/>
			<base-select
				id="ticket-status"
				v-model="status"
				select-classes=""
				label="Status"
				placeholder="Select status"
				:options="ticketStatusOptions"
				:error="submitCount > 0 && errors.status ? errors.status : ''"
			/>

			<base-button type="submit" label="edit" />
		</form>
	</div>
</template>
