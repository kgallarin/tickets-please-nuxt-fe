import BaseTicket from '@/components/BaseTicket.vue';
import type { Ticket } from '@appTypes/Ticket';
import { renderSuspended } from '@nuxt/test-utils/runtime';
import '@testing-library/jest-dom';
import { type RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

const renderBaseTicket = async (props: { ticket: Ticket }): Promise<RenderResult> => {
	return renderSuspended(BaseTicket, {
		global: {},
		props,
	});
};

const defaultTicketProp: Ticket = {
	id: '1',
	title: 'Sample Ticket',
	status: 'Open',
	created_at: '2023-01-01T00:00:00Z',
	updated_at: '2023-01-01T00:00:00Z',
	author: {
		id: 1,
		email: 'john.doe@example.com',
		name: 'John Doe',
		isAdmin: false,
	},
};

describe('BaseTicket', (): void => {
	test('renders without crashing', async (): Promise<void> => {
		await renderBaseTicket({ ticket: defaultTicketProp });

		expect(document.querySelector('[data-role="base-ticket"]')).toBeInTheDocument();
	});

	test('renders ticket props with correct values', async (): Promise<void> => {
		const { getByText } = await renderBaseTicket({ ticket: defaultTicketProp });

		expect(getByText('Sample Ticket')).toBeInTheDocument();
		expect(getByText('John Doe')).toBeInTheDocument();
	});
});
