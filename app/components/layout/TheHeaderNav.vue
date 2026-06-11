<script setup lang="ts">
	import type { NavLink } from '~~/types/App';
	import { computed } from 'vue';

	const { isAuthenticated } = useAuthUser();

	const navLinks: ComputedRef<NavLink[]> = computed(() => [
		{
			label: 'home',
			href: '/',
			auth: true,
		},
		{
			label: 'tickets',
			href: '/tickets',
			auth: isAuthenticated.value,
		},
		{
			label: 'create ticket',
			href: '/tickets/create',
			auth: isAuthenticated.value,
		},
		{
			label: 'users',
			href: '/users',
			auth: isAuthenticated.value,
		},
		{
			label: 'create user',
			href: '/users/create',
			auth: isAuthenticated.value,
		},
		{
			label: 'login',
			href: '/auth/login',
			auth: !isAuthenticated.value,
		},
		{
			label: 'logout',
			href: null,
			auth: isAuthenticated.value,
		},
	]);

	const { logout } = useAuth();

	async function handleLogout() {
		await logout();
	}

	function handleHeaderNavEmit(itemLabel: string) {
		switch (itemLabel) {
			case 'logout':
				handleLogout();
				break;

			default:
				return;
		}
	}
</script>

<template>
	<nav class="flex items-center justify-between border-b border-gray-100 p-4 px-8">
		<div>
			<NuxtLink to="/" class="font-linowrite">Tickets</NuxtLink>
		</div>

		<div class="mr-5">
			<base-header-nav :nav-links="navLinks" @nav-on-click="handleHeaderNavEmit" />
		</div>
	</nav>
</template>
