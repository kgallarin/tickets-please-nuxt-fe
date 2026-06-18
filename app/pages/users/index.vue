<script setup lang="ts">
	import { toTypedSchema } from '@vee-validate/zod';
	import { z } from 'zod';

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
	const { items, loading, destroy } = useUsers();

	const executeDeleteUser = handleSubmit(async (values) => {
		try {
			await destroy(values.id as string);
		} catch (e) {
			setErrors({
				id: 'Cannot delete this user, it is linked to some tickets',
			});
			throw e;
		}
	});
	function handleDeleteUser(id: string) {
		setErrors({ id: undefined });
		setFieldValue('id', id);
		executeDeleteUser();
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
			@on-delete="handleDeleteUser"
			@on-edit="handleEditUser"
		/>
	</div>
</template>

<style scoped></style>
