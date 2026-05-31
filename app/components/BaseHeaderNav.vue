<script setup lang="ts">
	type NavLink = { label: string; href: string };

	withDefaults(
		defineProps<{
			navLinks?: NavLink[];
		}>(),
		{
			navLinks: () => [
				{
					label: 'Home',
					href: '/',
				},
			],
		},
	);
</script>

<template>
	<nav class="flex items-center justify-between bg-white p-6 shadow">
		<div>
			<NuxtLink to="/">Logo</NuxtLink>
		</div>
		<div>
			<ClientOnly>
				<ul class="flex space-x-8">
					<li v-for="link in navLinks" :key="link.href">
						<NuxtLink :to="link.href"> {{ link.label }}</NuxtLink>
					</li>
				</ul>
			</ClientOnly>
		</div>
	</nav>
</template>
