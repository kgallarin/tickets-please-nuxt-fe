import type { User } from '~~/types/User';

export interface RawApiTicket {
	type: string;
	id: number;
	attributes: {
		title: string;
		status: string;
		description: string;
		created_at: string;
		updated_at: string;
	};
	relationships: {
		author: {
			data: User;
		};
	};
}

export interface Ticket {
	id: string;
	title: string;
	status: string;
	description: string;
	created_at: string;
	updated_at: string;
	author: User;
}

export interface TicketPayload {
	attributes: {
		title: string;
		description: string;
		status: string;
	};
}
