<script setup lang="ts">
	import { computed } from 'vue';
	import { z } from 'zod';
	import { toTypedSchema } from '@vee-validate/zod';
	import type { TicketPayloadCreate, TicketStatus } from '~~/types/Ticket';

	const { create } = useTickets();
	const { user: authUser } = useAuthUser();

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

	const createTicketSchema = toTypedSchema(
		z.object({
			attributes: z.object({
				title: z
					.string({ message: 'This field is required' })
					.min(4, { message: 'Title must be at least 4 characters' }),
				description: z
					.string({ message: 'This field is required' })
					.min(5, 'Description must have at least 5 characters.'),
				status: z
					.enum(['A', 'C', 'H', 'X'], {
						errorMap: () => ({
							message: 'Input must be either A, C, H or X',
						}),
					})
					.nullable() as z.ZodType<TicketStatus>,
			}),
		}),
	);

	const authUserId = computed(() => authUser.value?.id);
	const { defineField, errors, handleSubmit, submitCount, setApiErrorsToForm } = useAppForm({
		schema: createTicketSchema,
	});

	const [title] = defineField('attributes.title');
	const [description] = defineField('attributes.description');
	const [status] = defineField('attributes.status');

	const onSubmit = handleSubmit(async (values) => {
		try {
			await create({
				...values,
				relationships: {
					user: {
						data: {
							id: authUserId.value,
						},
					},
				},
			} as TicketPayloadCreate);

			navigateTo('/tickets');
		} catch (e) {
			setApiErrorsToForm(e);
		}
	});
</script>

<template>
	<div class="create-ticket mx-auto max-w-md">
		<h1 class="py-8 text-center">Create Ticket</h1>
		<form class="flex flex-col gap-8" @submit.prevent="onSubmit">
			<base-input
				v-model="title"
				label="title"
				type="text"
				:error="submitCount > 0 && errors['attributes.title'] ? errors['attributes.title'] : ''"
			/>
			<base-input
				v-model="description"
				type="textarea"
				:error="submitCount > 0 && errors['attributes.description'] ? errors['attributes.description'] : ''"
			/>
			<base-select
				id="ticket-status"
				v-model="status"
				label="Status"
				placeholder="Select status"
				:options="ticketStatusOptions"
				:error="submitCount > 0 && errors['attributes.status'] ? errors['attributes.status'] : ''"
			/>

			<base-button type="submit" label="create" />
		</form>
	</div>
</template>
