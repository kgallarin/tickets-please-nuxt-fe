<script setup lang="ts">
	definePageMeta({
		layout: 'blank',
		middleware: 'guest',
	});

	useSeoMeta({
		title: 'Login',
		description: 'Login to your account',
	});

	const form = reactive({
		email: '',
		password: '',
	});

	const { login, loginLoading, error } = useAuth();
	async function handleSubmit() {
		await login(form);
	}
</script>

<template>
	<div class="mx-auto flex h-screen w-full max-w-md items-center">
		<form class="flex w-full flex-col gap-y-2.5" @submit.prevent="handleSubmit">
			<div class="font-linowrite mb-8 flex flex-col gap-4 text-center text-xl capitalize">
				<p>Welcome!</p>
				<p class="font-inter text-sm text-red-400">{{ error }}</p>
			</div>

			<base-input v-model="form.email" label="email" type="email" />
			<base-input v-model="form.password" label="password" type="password" />

			<base-button class="mt-8" type="submit" label="login" :loading="loginLoading" />
			<NuxtLink to="/" class="mx-auto mt-8 max-w-fit text-sm text-blue-500"> go back </NuxtLink>
		</form>
	</div>
</template>
