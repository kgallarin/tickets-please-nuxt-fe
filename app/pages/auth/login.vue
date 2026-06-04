<script setup lang="ts">
	definePageMeta({
		layout: 'blank',
	});

	useSeoMeta({
		title: 'Login',
		description: 'Login to your account',
	});

	const title = useState('title', () => 'Login');
</script>

<template>
	<div class="flex h-full w-full max-w-md">
		<Title>{{ title }}</Title>

		<div class="flex w-full flex-col gap-y-2.5">
			<div class="font-linowrite mb-8 text-center text-xl capitalize">Welcome back!</div>

			<base-input label="Email" type="email" />
			<base-input label="Password" type="password" />

			<base-button class="mt-8" label="login" />
		</div>
	</div>
</template>
x
