<script setup lang="ts">
	type Author = {
		id: string;
		name: string;
	};
	type Ticket = {
		id: string;
		title: string;
		status: string;
		created_at: string;
		updated_at: string;
		author: Author;
	};

	defineProps<{ ticket?: Ticket }>();
</script>

<template>
	<div
		data-role="base-ticket"
		class="mx-auto h-32 w-64 bg-[url('/images/backgrounds/ticket.png')] bg-contain bg-no-repeat md:h-36 md:w-72"
	>
		<div class="ticket-inner flex h-full flex-col px-11 py-5">
			<div class="flex w-full flex-col items-center justify-between">
				<h1 class="text-xl">
					{{ ticket?.title }}
				</h1>

				<h3>
					{{ ticket?.status }}
				</h3>
			</div>

			<div class="mt-auto text-right">
				<span class="text-sm">{{ ticket?.author.name }}</span>
			</div>
		</div>
	</div>
</template>
