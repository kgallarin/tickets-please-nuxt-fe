<script setup lang="ts">
	import { z } from 'zod';
	import { toTypedSchema } from '@vee-validate/zod';
	import type { LoginPayload } from '~~/types/Auth';

	definePageMeta({
		layout: 'blank',
		middleware: 'guest',
	});

	useSeoMeta({
		title: 'Login',
		description: 'Login to your account',
	});

	const loginSchema = toTypedSchema(
		z.object({
			email: z.string().min(1, { message: 'Email is required ' }).email({ message: 'Must be a valid email address.' }),
			password: z.string().min(6, { message: 'Password must be at least 6 characters ' }),
		}),
	);

	const { defineField, errors, handleSubmit, submitCount } = useAppForm({
		schema: loginSchema,
	});

	const [email] = defineField('email');
	const [password] = defineField('password');

	const { login, loginLoading, error } = useAuth();

	const onSubmit = handleSubmit(async (values) => {
		await login(values as LoginPayload);
	});
</script>

<template>
	<div class="mx-auto flex h-screen w-full max-w-md items-center">
		<form class="flex w-full flex-col gap-y-2.5" @submit.prevent="onSubmit">
			<div class="font-linowrite mb-8 flex flex-col gap-4 text-center text-xl capitalize">
				<p>Welcome!</p>
				<p class="font-inter text-sm text-red-400">{{ error }}</p>
			</div>

			<base-input v-model="email" label="email" :error="submitCount > 0 && errors.email ? errors.email : ''" />

			<base-input
				v-model="password"
				label="password"
				type="password"
				:error="submitCount > 0 && errors.password ? errors.password : ''"
			/>

			<base-button class="mt-8" type="submit" label="login" :loading="loginLoading" />
			<NuxtLink to="/" class="mx-auto mt-8 max-w-fit text-sm text-blue-500"> go back </NuxtLink>
		</form>
	</div>
</template>
