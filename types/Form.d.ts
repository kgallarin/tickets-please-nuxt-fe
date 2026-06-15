import type { FormOptions, TypedSchema } from 'vee-validate';

type SafeInitialValues<T extends Record<string, unknown>> = Required<FormOptions<T>>['initialValues'];
export interface UseAppFormOptions<T extends Record<string, unknown>> {
	schema: TypedSchema<T>;
	initialValues?: SafeInitialValues<T>;
}
