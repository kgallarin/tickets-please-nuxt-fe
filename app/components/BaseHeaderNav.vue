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
	<nav class="flex items-center justify-between border-b border-gray-100 p-4">
		<div>
			<NuxtLink to="/" class="font-linowrite">Tickets</NuxtLink>
		</div>
		<div class="mr-5">
			<ClientOnly>
				<ul class="flex space-x-4">
					<li v-for="link in navLinks" :key="link.href">
						<NuxtLink :to="link.href"> {{ link.label }}</NuxtLink>
					</li>
				</ul>
			</ClientOnly>
		</div>
	</nav>
</template>
