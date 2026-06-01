<script lang="ts" setup>
	const tile = useState('title', () => 'Nuxt 3 + Tailwind CSS');
</script>
<template>
	<div class="mx-auto min-h-screen">
		<Title>{{ tile }}</Title>
		<base-header-nav />
		<div class="mx-auto mt-8 w-full px-4 md:max-w-2xl lg:max-w-5xl">
			<slot />
		</div>
	</div>
</template>
