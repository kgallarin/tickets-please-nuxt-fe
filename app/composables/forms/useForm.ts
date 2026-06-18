import { computed } from 'vue';

import { useForm } from 'vee-validate';
import { handleFormErrors } from '~/utils/formErrorHandler';
import type { ApiError } from '~~/types/Api';
import type { UseAppFormOptions } from '~~/types/Form';

export function useAppForm<T extends Record<string, unknown>>({ schema, initialValues }: UseAppFormOptions<T>) {
	const apiGlobalError = ref<ApiError | null>(null);
	// init form controller
	const {
		errors: rawErrs,
		handleSubmit,
		submitCount,
		resetForm,
		values: formValues,
		defineField,
		setErrors,
		setFieldValue,
	} = useForm<T>({
		validationSchema: schema,
		initialValues,
	});

	const setApiErrorsToForm = (e: unknown, stripPrefix: string = 'data.') => {
		apiGlobalError.value = null;

		handleFormErrors({
			error: e,
			stripPrefix,
			onValidationErrors: (errors: Record<string, string>): void =>
				setErrors(errors as Partial<Record<keyof T, string | string[] | undefined>>),
			onGlobalError: (err: ApiError) => {
				apiGlobalError.value = err;
			},
		});
	};

	const formErrors = computed((): Record<string, string> => {
		const activeErrors: Record<string, string> = {};

		if (submitCount.value > 0) {
			for (const [key, errorMsg] of Object.entries(rawErrs.value)) {
				if (errorMsg) {
					activeErrors[key] = errorMsg;
				}
			}
		}

		return activeErrors;
	});

	return {
		formValues,
		submitCount,
		errors: formErrors, // input errors
		defineField,
		handleSubmit,
		resetForm,
		setApiErrorsToForm,
		setErrors,
		setFieldValue,
	};
}
