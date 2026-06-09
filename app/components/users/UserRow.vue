<script setup lang="ts">
	import type { User } from '~~/types/User';

	defineProps<{
		user: User;
	}>();
</script>

<template>
	<div class="divide font-sm mt-4 flex w-full border-b border-gray-200 pb-3">
		<div class="flex-1 text-center">
			{{ user.name }}
		</div>
		<div class="flex-1 text-center">
			{{ user.email }}
		</div>
		<div class="flex-1 text-center">
			{{ user.isAdmin }}
		</div>
	</div>
</template>
