<script setup lang="ts">
	const appStore = useAppStore();
</script>

<template>
	<ClientOnly>
		<div>
			<div v-if="appStore.loading.global">Loading...</div>
			<div v-if="appStore.isMobile">Mobile View</div>
			<div v-else-if="appStore.isDesktop">Desktop View</div>
			<div v-else>Tablet View</div>
			alavie
		</div>
	</ClientOnly>
</template>

<style scoped></style>
