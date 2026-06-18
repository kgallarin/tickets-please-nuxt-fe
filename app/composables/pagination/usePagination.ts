export interface PaginationOptions {
	defaultPage?: number;
	defaultLimit?: number | Ref<number> | (() => number);
}

export function usePagination(totalItems: Ref<number> | (() => number), options: PaginationOptions = {}) {
	const route = useRoute();
	const router = useRouter();

	const defaultPage = options.defaultPage ?? 1;
	// reactive property synced with URL query string
	const defaultLimit = computed(() => {
		if (options.defaultLimit !== undefined) {
			return toValue(options.defaultLimit); // Automatically unpacks refs or functions safely
		}
		return 10;
	});

	const totalElms = computed(() => (typeof totalItems === 'function' ? totalItems() : totalItems.value));

	function updateQuery(newParams: Record<string, string>) {
		router.push({
			query: {
				...route.query,
				...newParams,
			},
		});
	}

	const page = computed<number>({
		get: (): number => {
			const pageNumber = parseInt(route.query.page as string, 10);
			return isNaN(pageNumber) || pageNumber < 1 ? defaultPage : pageNumber;
		},
		set: (newPage: number) => {
			updateQuery({ page: String(newPage) });
		},
	});

	const limit = computed<number>({
		get: () => {
			const pageLimit = parseInt(route.query.limit as string, 10);
			return isNaN(pageLimit) || pageLimit < 1 ? defaultLimit.value : pageLimit;
		},
		set: (newPageLimit: number) => {
			updateQuery({ limit: String(newPageLimit), page: String(1) });
		},
	});

	const totalPages = computed(() => Math.ceil(totalElms.value / limit.value));

	const paginationRange = computed<(number | string)[]>(() => {
		const current = page.value;
		const totalPageCount = totalPages.value;

		if (totalPageCount <= 7) {
			// 7 slots with succeeding if statements
			return Array.from({ length: totalPageCount }, (_, i) => i + 1);
		}

		if (current <= 4) {
			return [1, 2, 3, 4, 5, '...', totalPageCount];
		}

		if (current >= totalPageCount - 3) {
			return [1, '...', totalPageCount - 4, totalPageCount - 3, totalPageCount - 2, totalPageCount - 1, totalPageCount];
		}

		return [1, '...', current - 1, current, current + 1, '...', totalPageCount];
	});

	return {
		page,
		limit,
		totalPages,
		paginationRange,
	};
}
