<script setup lang="ts">
	import type { Ticket } from '@appTypes/Ticket';

	const title = useState<string>('title');

	const { items } = useApiList<Ticket>('http://127.0.0.1:8000/api/v1/tickets');
</script>

<template>
	<Title> Home | {{ title }}</Title>
	<div class="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<template v-if="items">
			<base-ticket v-for="ticket in items" :key="ticket.id" :ticket="ticket" />
		</template>
		<!--		<base-ticket :ticket="ticketSample" />-->
		<!--		<base-ticket :ticket="ticketSample" />-->

		<!--		<base-ticket :ticket="ticketSample" />-->
	</div>
</template>
