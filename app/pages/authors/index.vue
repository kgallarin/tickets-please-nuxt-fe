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
	<user-row v-for="item in items" :key="item.id" />
</template>

<style scoped></style>
