<script setup lang="ts">
	import type { NavLink } from '~~/types/App';
	import { computed } from 'vue';

	const { isAuthenticated } = useAuthUser();
	const { user: me } = useAuthUser();

	const navLinks: ComputedRef<NavLink[]> = computed(() => [
		{
			label: 'home',
			href: '/',
			auth: isAuthenticated.value,
		},
		// {
		// 	label: 'tickets',
		// 	href: '/tickets',
		// 	auth: isAuthenticated.value,
		// },
		{
			label: 'users',
			href: '/users',
			auth: isAuthenticated.value,
		},

		{
			label: 'login',
			href: '/auth/login',
			auth: !isAuthenticated.value,
		},
		// {
		// 	label: 'authors',
		// 	href: '/authors',
		// 	auth: isAuthenticated.value,
		// },
	]);
	const dropdownNav: ComputedRef<NavLink[]> = computed(() => [
		{
			label: 'create user',
			href: `/users/create`,
			auth: true,
		},
		{
			label: 'create ticket',
			href: `/tickets/create`,
			auth: true,
		},
		{
			label: 'my tickets',
			href: `/authors/${me.value?.id}/tickets`,
			auth: true,
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

	function handleDropdownNavClick(itemLabel: string) {
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

		<div class="mr-5 flex items-center">
			<base-nav-list :nav-links="navLinks" />
			<base-drop-down
				v-if="isAuthenticated"
				:nav-links="dropdownNav"
				class="pl-8"
				@on-drop-down-nav-click="handleDropdownNavClick"
			>
				<div class="flex items-center">
					<span class="font-roboto mr-2 text-sm">
						{{ me?.name }}
					</span>
					<div class="h-8 w-8 rounded-full border border-b-gray-600">
						<img src="" alt="" />
					</div>
				</div>
			</base-drop-down>
		</div>
	</nav>
</template>
