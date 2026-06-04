<script setup lang="ts">
	useSeoMeta({
		titleTemplate: '%s | Tickets Please',
		ogType: 'website',
		ogSiteName: 'Tickets Please',
		robots: 'index, follow',
	});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>

	<div id="teleports" />
</template>

<style>
	.page-enter-active,
	.page-leave-active {
		transition: opacity 0.12s ease;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
	}
</style>
