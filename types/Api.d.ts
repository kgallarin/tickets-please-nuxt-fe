export interface ApiResponse<T> {
	data: T;
	message: string;
	success: boolean;
}

export interface PaginatedApiResponse<T = unknown> {
	data: T[];
	meta: {
		totalCount: number;
		page: number;
		lastPage: number;
		pageSize: number;
	};
}

export interface ApiError {
	data: {
		status: number;
		message: string;
	};
	status: number;
	message: string;
	errors?: Record<string, string[]>;
}
