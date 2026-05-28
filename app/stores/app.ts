import type { Ref } from 'vue';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { defineStore, skipHydrate } from 'pinia';

export interface AppState {
	breakpoints: IBreakpoints;
	loading: {
		global: boolean;
	};
}

const state = (): AppState => ({
	loading: {
		global: false,
	},
});

const getters = {};

const mutations = {};

const actions = {};

export const useAppStore = defineStore('app', {
	state,
	getters,
	actions: {
		...actions,
		...mutations,
	},
});
