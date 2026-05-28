import { type PiniaPluginContext } from 'pinia';

function loading({ store }: PiniaPluginContext): void {
	const hasLoading = Object.prototype.hasOwnProperty.call(store, 'loading');
	const hasGetLoading = Object.prototype.hasOwnProperty.call(store, 'getLoading');
	const hasSetLoading = Object.prototype.hasOwnProperty.call(store, 'setLoading');

	if (hasLoading && !hasGetLoading) {
		store.getLoading = (type: string): boolean => store.loading[type];
	}

	if (hasLoading && !hasSetLoading) {
		store.setLoading = function ({ type, flag }: { type: string; flag: boolean }): void {
			store.loading[type] = flag;
		};
	}
}

export default defineNuxtPlugin((): void => {
	const $pinia = usePinia();

	if ($pinia) {
		$pinia.use(loading);
	}
});
