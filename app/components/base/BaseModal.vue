<script setup lang="ts">
	import {
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogOverlay,
		AlertDialogPortal,
		AlertDialogRoot,
		AlertDialogTitle,
		AlertDialogTrigger,
	} from 'reka-ui';

	interface Props {
		title: string;
		description: string;
		actionLabel?: string;
		cancelLabel?: string;
		variant?: 'danger' | 'info';
	}

	withDefaults(defineProps<Props>(), {
		actionLabel: 'confirm',
		cancelLabel: 'cancel',
		variant: 'info',
	});

	const open = defineModel<boolean>('open', { default: false });

	const emit = defineEmits<{
		confirm: [];
		cancel: [];
	}>();
</script>

<template>
	<alert-dialog-root v-model:open="open" :disable-outside-pointer-events="true">
		<!--	trigger-->
		<alert-dialog-trigger as-child>
			<slot name="modal-trigger" />
		</alert-dialog-trigger>

		<alert-dialog-portal>
			<!--	 overlay-->
			<alert-dialog-overlay
				class="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-200"
			/>
			<!--	content:centered -->
			<alert-dialog-content
				:disable-outside-pointer-events="true"
				class="rouned-xl data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out fixed top-1/2 left-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 border-neutral-200 border-b-neutral-800 bg-white p-6 shadow-xl focus:outline-none"
			>
				<!--	title-->
				<alert-dialog-title class="x text-xl font-semibold text-neutral-900">
					{{ title }}
				</alert-dialog-title>

				<!--	 description -->
				<alert-dialog-description class="mt-2 text-sm leading-normal text-neutral-600">
					{{ description }}
				</alert-dialog-description>

				<!--	 actions -->
				<div class="mt-6 flex justify-end gap-3">
					<alert-dialog-cancel as-child @click="emit('cancel')">
						<base-button>
							{{ cancelLabel }}
						</base-button>
					</alert-dialog-cancel>

					<alert-dialog-action as-child @click="emit('confirm')">
						<base-button>
							{{ actionLabel }}
						</base-button>
					</alert-dialog-action>
				</div>
			</alert-dialog-content>
		</alert-dialog-portal>
	</alert-dialog-root>
</template>
