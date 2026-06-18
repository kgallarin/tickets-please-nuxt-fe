import type { FormOptions, TypedSchema } from 'vee-validate';
import type { ApiError } from '~~/types/Api';

type SafeInitialValues<T extends Record<string, unknown>> = Required<FormOptions<T>>['initialValues'];
export interface UseAppFormOptions<T extends Record<string, unknown>> {
	schema: TypedSchema<T>;
	initialValues?: SafeInitialValues<T>;
}

// form errors
interface ValidationErrorItem {
	status: number;
	message: string;
	key: string;
}

interface FormErrorPayload {
	error: unknown;
	// reactive callback for validation errors
	onValidationErrors: (errors: Record<string, string>) => void;
	// reactive callback for general errors (500, 403, etc.)
	onGlobalError?: (error: ApiError) => void;
	// optinal for stripping error prefix
	stripPrefix?: string;
}
