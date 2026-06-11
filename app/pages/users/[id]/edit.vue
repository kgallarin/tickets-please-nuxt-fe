<script setup lang="ts">
	import { computed } from 'vue';
	import { userService } from '~/services/user.service';

	const form = reactive({
		attributes: {
			name: '',
			email: '',
			isAdmin: false,
		},
	});

	const route = useRoute();
	const userId = computed(() => route.params.id as string);
	const { user, edit } = useUser(userId);

	async function handleEditTicket() {
		await edit(form);
	}

	watch(
		user,
		(newVal) => {
			if (newVal) {
				Object.assign(form.attributes, userService.normalizeUserData(newVal));
			}
		},
		{ immediate: true },
	);
</script>

<template>
	<div class="create-user mx-auto max-w-md">
		<h1 class="py-8 text-center">Edit User</h1>
		<form class="flex flex-col gap-8" @submit.prevent="handleEditTicket">
			<base-input v-model="form.attributes.name" label="name" type="text" />
			<base-input v-model="form.attributes.email" label="email" type="text" />
			<base-switch v-model="form.attributes.isAdmin" label="Admin" />

			<base-button type="submit" label="edit" class="bg-gray-900 text-white" />
		</form>
	</div>
</template>
