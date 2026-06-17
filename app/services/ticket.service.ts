import { type $Fetch } from 'ofetch';
import type { RawApiTicket, Ticket, TicketPayload, TicketStatus } from '~~/types/Ticket';
import type { User } from '~~/types/User';

type ApiFetch = $Fetch;
const ticketURL = 'v1/tickets';

export const ticketService = {
	// mutations only here
	async create(payload: TicketPayload, $fetch: ApiFetch) {
		return $fetch(ticketURL, {
			method: 'POST',
			body: {
				data: {
					...payload,
				},
			},
		});
	},

	async edit(id: string, payload: TicketPayload, $fetch: ApiFetch) {
		return $fetch(`${ticketURL}/${id}`, {
			method: 'PATCH',
			body: {
				data: {
					attributes: {
						...payload,
					},
				},
			},
		});
	},

	async update(id: string, payload: TicketPayload, $fetch: ApiFetch) {
		return $fetch(`${ticketURL}/${id}`, {
			method: 'PUT',
			body: payload,
		});
	},

	async delete(id: string, $fetch: ApiFetch) {
		return $fetch(`${ticketURL}/${id}`, {
			method: 'DELETE',
		});
	},

	canEdit(ticket: Ticket, user: User): boolean {
		return user.isAdmin || ticket.author.id === user.id;
	},

	normalizeTicketData(rawTicket: RawApiTicket): Ticket {
		const allowedTicketStatus: TicketStatus[] = ['A', 'C', 'H', 'X'];
		const status = rawTicket.attributes.status || 'Invalid status';
		return {
			id: rawTicket.id.toString(),
			title: rawTicket.attributes.title,
			status: allowedTicketStatus.includes(status as TicketStatus) ? (status as TicketStatus) : null,
			description: rawTicket.attributes.description,
			created_at: rawTicket.attributes.created_at,
			updated_at: rawTicket.attributes.updated_at,
			author: rawTicket.relationships.author.data,
		};
	},
};
