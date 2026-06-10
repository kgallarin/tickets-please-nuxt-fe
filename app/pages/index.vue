<script setup lang="ts">
	useSeoPage({
		title: 'Home',
		description: 'Browse tickets',
	});

	definePageMeta({ middleware: 'auth' });

	const { items } = useTickets();
</script>

<template>
	<div class="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">Welcome home!</div>
</template>
