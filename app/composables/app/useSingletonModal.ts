interface GlobalModalConfig {
	title: string;
	description: string;
	actionLabel?: string;
	cancelLabel?: string;
	onConfirm?: () => void | Promise<void>;
}

const isOpen = ref(false);
const config = ref<GlobalModalConfig | null>(null);
const isSubmitting = ref(false);

export function useGlobalModal() {
	function triggerModal(options: GlobalModalConfig) {
		config.value = options;
		isOpen.value = true;
	}

	function closeAlert() {
		if (isSubmitting.value) return; // prevent closing while busy
		isOpen.value = false;
		setTimeout(() => {
			// timeout for animations
			config.value = null;
		}, 200);
	}

	async function executeConfirm() {
		if (config.value?.onConfirm) {
			isSubmitting.value = true;
			await config.value.onConfirm();
			isSubmitting.value = false;
		}

		closeAlert();
	}

	return {
		isOpen,
		config,
		isSubmitting,
		triggerModal,
		closeAlert,
		executeConfirm,
	};
}
