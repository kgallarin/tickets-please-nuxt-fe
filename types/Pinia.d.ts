import 'pinia';

declare module 'pinia' {
	export interface PiniaCustomProperties {
		getLoading: (type: string) => boolean;
		setLoading: (payload: { type: string; flag: boolean }) => void;
	}
}
