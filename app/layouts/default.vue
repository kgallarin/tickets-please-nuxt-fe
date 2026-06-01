<script lang="ts" setup>
	const tile = useState('title', () => 'Nuxt 3 + Tailwind CSS');
</script>
<template>
	<div class="mx-auto min-h-screen">
		<Title>{{ tile }}</Title>
		<base-header-nav />
		<div class="mx-auto px-4">
			<slot />
		</div>
	</div>
</template>
