<script setup lang="ts">
	const ticketSample = {
		id: '1',
		title: 'Sample Ticket',
		status: 'X',
		created_at: '2023-01-01',
		updated_at: '2023-01-01',
		author: {
			id: '1',
			name: 'Sample Author',
		},
	};
</script>

<template>
	<div class="mt-4 grid grid-cols-1 gap-4">
		<base-ticket :ticket="ticketSample" />
		<base-ticket :ticket="ticketSample" />

		<base-ticket :ticket="ticketSample" />
	</div>
</template>
