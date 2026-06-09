<script setup lang="ts">
	useSeoPage({
		title: 'Authors',
		description: 'List of authors',
	});

	definePageMeta({
		middleware: 'guest',
	});
</script>

<template>
	<user-row />
</template>

<style scoped></style>
