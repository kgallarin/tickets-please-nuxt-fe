import type { TicketPayload } from '~~/types/Ticket';

export interface AuthorPayload extends TicketPayload {
	relationships: {
		user: {
			data: {
				id: string;
			};
		};
	};
}
