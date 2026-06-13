<script setup lang="ts">
	import type { User } from '~~/types/User';

	const props = withDefaults(
		defineProps<{
			user: User;
			actions?: ('view' | 'edit' | 'delete')[];
			editButtonLabel?: string;
			deleteButtonLabel?: string;
			viewButtonLabel?: string;
		}>(),
		{
			actions: () => ['view', 'edit', 'delete'],
			editButtonLabel: 'edit',
			deleteButtonLabel: 'delete',
			viewButtonLabel: 'view',
		},
	);

	const emit = defineEmits<{
		onEdit: [id: string];
		onDelete: [id: string];
		onView: [id: string];
	}>();
	function handleEditUser() {
		// navigateTo(`users/${props.user.id}/edit`);
		emit('onEdit', props.user.id);
	}

	function handleDeleteUser() {
		emit('onDelete', props.user.id);
	}

	function handleViewUser() {
		emit('onView', props.user.id);
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
			<base-button
				v-if="actions?.includes('view')"
				:label="viewButtonLabel"
				class="border border-blue-500 bg-transparent text-gray-800"
				@click.prevent.stop="handleViewUser"
			/>
			<base-button
				v-if="actions?.includes('edit')"
				:label="editButtonLabel"
				class="border border-orange-500 bg-transparent text-gray-800"
				@click.prevent.stop="handleEditUser"
			/>
			<base-button
				v-if="actions?.includes('delete')"
				class="border border-red-500 bg-transparent text-gray-800"
				:label="deleteButtonLabel"
				@click.prevent.stop="handleDeleteUser"
			/>
		</div>
	</div>
</template>
