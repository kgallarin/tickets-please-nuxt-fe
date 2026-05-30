<script lang="ts" setup>
	import BaseHeaderNav from '../components/BaseHeaderNav.vue';

	const tile = useState('title', () => 'Nuxt 3 + Tailwind CSS');
</script>
<template>
	<div class="min-h-screen bg-gray-100">
		<Title>{{ tile }}</Title>
		<!--    content here-->
		<base-header-nav />
		<slot />
	</div>
</template>
