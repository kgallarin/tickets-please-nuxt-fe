<script setup lang="ts">
	import type { NavLink } from '~~/types/App';
	const navLinks: NavLink[] = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Authors',
			href: '/authors',
		},
		{
			label: 'Create Ticket',
			href: '/tickets/create',
		},
	];

	const { logout } = useAuth();

	async function handleLogout() {
		await logout();
	}
</script>

<template>
	<nav class="flex items-center justify-between border-b border-gray-100 p-4 px-8">
		<div>
			<NuxtLink to="/" class="font-linowrite">Tickets</NuxtLink>
		</div>

		<div class="mr-5">
			<base-header-nav :nav-links="navLinks">
				<li class="font-roboto m-0 text-sm">
					<a href="#" @click="handleLogout"> Logout </a>
				</li>
			</base-header-nav>
		</div>
	</nav>
</template>

<style scoped></style>
