import { type $Fetch } from 'ofetch';
import type { RawApiTicket, Ticket } from '~~/types/Ticket';
import type { User } from '~~/types/User';

type ApiFetch = $Fetch;
const ticketURL = '/tickets';

export const ticketService = {
	// mutations only here
	async create(payload: any, $fetch: ApiFetch) {
		return $fetch(ticketURL, {
			method: 'POST',
			body: payload,
		});
	},

	async update(id: string, payload: any, $fetch: ApiFetch) {
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
		return {
			id: rawTicket.id.toString(),
			title: rawTicket.attributes.title,
			status: rawTicket.attributes.status,
			created_at: rawTicket.attributes.created_at,
			updated_at: rawTicket.attributes.updated_at,
			author: rawTicket.relationships.author.data,
		};
	},
};
