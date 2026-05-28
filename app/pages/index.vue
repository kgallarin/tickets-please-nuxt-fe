<script setup lang="ts">
	const appStore = useAppStore();
</script>

<template>
	<div>
		<div v-if="appStore.loading.global">Loading...</div>
		alavie
	</div>
</template>

<style scoped></style>
