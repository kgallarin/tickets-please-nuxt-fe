import { computed } from 'vue';

import { useForm } from 'vee-validate';
import type { UseAppFormOptions } from '~~/types/Form';

export function useAppForm<T extends Record<string, unknown>>({ schema, initialValues }: UseAppFormOptions<T>) {
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

	const formErrors = computed(() => {
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
		defineField,
		handleSubmit,
		errors: formErrors,
		resetForm,
		formValues,
		setErrors,
		setFieldValue,
		submitCount,
	};
}
