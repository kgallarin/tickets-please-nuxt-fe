<script setup lang="ts">
	import BaseSwitch from '@components/base/BaseSwitch.vue';

	const { create } = useUsers();
	const form = reactive({
		attributes: {
			name: '',
			email: '',
			password: '',
			isAdmin: false,
		},
	});

	async function handleCreateUser() {
		await create(form);
	}
</script>

<template>
	<div class="create-user mx-auto max-w-md">
		<h1 class="py-8 text-center">Create User</h1>
		<form class="flex flex-col gap-8" @submit.prevent="handleCreateUser">
			<base-input v-model="form.attributes.name" label="name" type="text" />
			<base-input v-model="form.attributes.email" label="email" type="text" />
			<base-input v-model="form.attributes.password" label="password" type="text" />
			<base-switch v-model="form.attributes.isAdmin" label="Admin" />

			<base-button type="submit" label="create" />
		</form>
	</div>
</template>
