<script setup lang="ts">
	useSeoPage({
		title: 'Authors',
		description: 'List of authors',
	});

	definePageMeta({
		middleware: 'auth',
	});

	const { items } = useUsers();
</script>

<template>
	<div>
		<div class="font-linowrite mt-4 flex w-full divide-x divide-gray-100 border-b border-gray-200 pb-3">
			<div class="flex-1 text-center">Name</div>
			<div class="flex-1 text-center">Email</div>
			<div class="flex-1 text-center">Admin</div>
		</div>
		<user-row v-for="item in items" :key="item.id" :user="item" />
	</div>
</template>

<style scoped></style>
