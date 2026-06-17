import type { User } from '~~/types/User';

export type TicketStatus = 'A' | 'C' | 'H' | 'X' | null;
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
	status: TicketStatus;
	description: string;
	created_at: string;
	updated_at: string;
	author: User;
}

export interface TicketPayload {
	title: string;
	description: string;
	status: TicketStatus;
}

export interface TicketPayloadCreate {
	title: string;
	description: string;
	status: TicketStatus;
	relationships: {
		user: {
			data: {
				id: authUserId.value;
			};
		};
	};
}
