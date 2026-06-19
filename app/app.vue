<script setup lang="ts">
	import { ConfigProvider } from 'reka-ui';

	useSeoMeta({
		titleTemplate: '%s | Tickets Please',
		ogType: 'website',
		ogSiteName: 'Tickets Please',
		robots: 'index, follow',
	});

	const { isOpen, config, executeConfirm, closeAlert } = useGlobalModal();
</script>

<template>
	<ConfigProvider>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</ConfigProvider>

	<base-modal
		v-model:open="isOpen"
		:title="config?.title || 'important'"
		:description="config?.description || ''"
		:action-label="config?.actionLabel || ''"
		:cancel-label="config?.cancelLabel || 'Cancel'"
		@confirm="executeConfirm"
		@cancel="closeAlert"
	/>

	<!--	<div id="teleports" />-->
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
