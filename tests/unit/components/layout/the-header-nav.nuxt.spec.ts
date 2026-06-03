import BaseHeaderNav from '@components/base/BaseHeaderNav.vue';
import { renderSuspended } from '@nuxt/test-utils/runtime';
import '@testing-library/jest-dom';
import { type RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

const renderBaseHeaderNav = async (): Promise<RenderResult> => {
	return renderSuspended(BaseHeaderNav);
};
describe('BaseHeaderNav', (): void => {
	test('renders home link', async (): Promise<void> => {
		const { getByText } = await renderBaseHeaderNav();

		expect(getByText('Home')).toBeInTheDocument();
	});
});
