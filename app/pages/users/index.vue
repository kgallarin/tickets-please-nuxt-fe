<script setup lang="ts">
	useSeoPage({
		title: 'Authors',
		description: 'List of users',
	});

	definePageMeta({
		middleware: 'auth',
	});

	const { items, loading, destroy } = useUsers();

	async function handleDeleteUser(id: string) {
		await destroy(id);
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
			@on-delete="handleDeleteUser"
			@on-edit="handleEditUser"
		/>
	</div>
</template>

<style scoped></style>
