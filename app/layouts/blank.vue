<script setup lang="ts">
	const title = useState('title', () => 'Tickets Please');
</script>

<template>
	<div class="flex min-h-screen items-center justify-center px-4">
		<Title>{{ title }}</Title>
		<slot />
	</div>
</template>
