<script setup lang="ts">
	import type { User } from '~~/types/User';

	const props = defineProps<{
		user: User;
	}>();

	const emit = defineEmits<{
		onEdit: [id: string];
		onDelete: [id: string];
	}>();
	function handleEditUser() {
		// navigateTo(`users/${props.user.id}/edit`);
		emit('onEdit', props.user.id);
	}

	function handleDeleteUser() {
		emit('onDelete', props.user.id);
	}
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
		<div class="flex flex-1 justify-center space-x-2">
			<base-button label="edit" class="bg-blue-400" @click.prevent.stop="handleEditUser" />
			<base-button label="delete" @click.prevent.stop="handleDeleteUser" />
		</div>
	</div>
</template>
