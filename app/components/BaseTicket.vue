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
	<div data-role="base-ticket" class="mx-auto min-h-33 w-66 bg-[url(@images/ticket.png)] bg-contain bg-no-repeat">
		<div class="ticket-inner flex h-full flex-col px-11 py-5">
			<div class="flex w-full flex-col items-center justify-between">
				<h1 class="font-linowrite text-xl">
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
