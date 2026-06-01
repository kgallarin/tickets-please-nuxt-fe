<script setup lang="ts">
	const title = useState<string>('title');
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
	<Title> Home | {{ title }}</Title>
	<div class="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<base-ticket :ticket="ticketSample" />
		<base-ticket :ticket="ticketSample" />

		<base-ticket :ticket="ticketSample" />
	</div>
</template>
