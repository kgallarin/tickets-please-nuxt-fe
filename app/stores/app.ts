import { defineStore } from 'pinia';

export interface AppState {
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
