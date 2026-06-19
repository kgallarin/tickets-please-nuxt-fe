<script setup lang="ts">
	import { toTypedSchema } from '@vee-validate/zod';
	import { z } from 'zod';
	import type { ApiError } from '~~/types/Api';

	useSeoPage({
		title: 'Authors',
		description: 'List of users',
	});

	definePageMeta({
		middleware: 'auth',
	});

	const deleteUserSchema = toTypedSchema(
		z.object({
			id: z.string(),
		}),
	);
	const { setErrors, setFieldValue, formValues, handleSubmit, errors } = useAppForm({
		schema: deleteUserSchema,
		initialValues: { id: '' },
	});

	const { page, limit, paginationRange } = usePagination(() => totalItems.value, {
		defaultLimit: 5,
	});
	const { items, loading, totalItems, destroy } = useUsers(
		() => page.value,
		() => limit.value,
	);

	const executeDeleteUser = handleSubmit(async (values) => {
		await destroy(values.id as string);
	});

	const { triggerModal } = useGlobalModal();

	function handleDeleteUser(id: string) {
		triggerModal({
			title: 'Are you sure?',
			description: 'Deleting user cannot be undone',
			actionLabel: 'Confirm',
			cancelLabel: 'Cancel',
			onConfirm: async () => {
				setErrors({ id: undefined });
				setFieldValue('id', id);
				try {
					await executeDeleteUser();
				} catch (e) {
					const error = e as ApiError;
					setErrors({
						id: `${error?.message}: Cannot delete this user, it is linked to some tickets`,
					});
				}
			},
		});
	}

	async function handleRouteToViewAuthorTickets(id: string) {
		navigateTo(`/authors/${id}/tickets`);
	}

	function handleEditUser(id: string) {
		navigateTo(`users/${id}/edit`);
	}
</script>

<template>
	<div>
		<div class="font-linowrite mt-4 flex w-full divide-x divide-gray-100 border-b border-gray-200 pb-3">
			<div class="flex-1 text-center">Name</div>
			<div class="flex-1 text-center">Email</div>
			<div class="flex-1 text-center">Admin</div>
			<div class="flex-1 text-center">Actions</div>
		</div>

		<div v-if="loading" class="py-8 text-center">loading...</div>
		<user-row
			v-for="item in items"
			v-else
			:key="item.id"
			:user="item"
			:error="
				formValues.id === item.id
					? {
							id: item.id,
							message: errors.id,
						}
					: undefined
			"
			view-button-label="tickets"
			@on-delete="handleDeleteUser"
			@on-edit="handleEditUser"
			@on-view="handleRouteToViewAuthorTickets"
		/>

		<base-pagination v-model="page" :total="totalItems" :limit="limit" :range="paginationRange" />
	</div>
</template>

<style scoped></style>
