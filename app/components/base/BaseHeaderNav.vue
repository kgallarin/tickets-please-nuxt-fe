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
				{
					label: 'Authors',
					href: '/authors',
				},
			],
		},
	);
</script>

<template>
	<nav class="flex items-center justify-between border-b border-gray-100 p-4 px-8">
		<div>
			<NuxtLink to="/" class="font-linowrite">Tickets</NuxtLink>
		</div>
		<div class="mr-5">
			<ClientOnly>
				<ul class="flex space-x-4">
					<li v-for="link in navLinks" :key="link.href" class="font-roboto text-sm">
						<NuxtLink :to="link.href" class="hover:underline">{{ link.label }}</NuxtLink>
					</li>
				</ul>
			</ClientOnly>
		</div>
	</nav>
</template>
