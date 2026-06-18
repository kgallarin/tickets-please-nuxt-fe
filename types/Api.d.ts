export interface ApiResponse<T> {
	data: T;
	message: string;
	success: boolean;
}

export interface ResponseMeta {
	current_page: number;
	from: number | null;
	last_page: number;
	path: string;
	per_page: number;
	to: number | null;
	total: number;
}

export interface ResponseLinks {
	first: string;
	last: string;
	prev: string | null;
	next: string | null;
}

export interface PaginatedApiResponse<T = unknown> {
	data: T[];
	meta: ResponseMeta;
	links: ResponseLinks;
}

export interface ApiError {
	data: {
		status: number;
		message: string;
		source?: string;
		errors: {
			source: string;
		};
	};
	status: number;
	message: string;
	errors?: Record<string, string[]>;
}
