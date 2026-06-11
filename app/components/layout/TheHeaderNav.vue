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
			label: 'login',
			href: '/auth/login',
			auth: !isAuthenticated.value,
		},
		{
			label: 'tickets',
			href: '/tickets',
			auth: isAuthenticated.value,
		},
		{
			label: 'authors',
			href: '/authors',
			auth: isAuthenticated.value,
		},
		{
			label: 'create ticket',
			href: '/tickets/create',
			auth: isAuthenticated.value,
		},
	]);

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
				<li v-if="isAuthenticated" class="font-roboto m-0 text-sm">
					<a href="#" @click="handleLogout"> Logout </a>
				</li>
			</base-header-nav>
		</div>
	</nav>
</template>

<style scoped></style>
