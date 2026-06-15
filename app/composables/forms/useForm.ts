import { computed } from 'vue';

import { useForm } from 'vee-validate';
import type { UseAppFormOptions } from '~~/types/Form';

export function useAppForm<T extends Record<string, unknown>>({ schema, initialValues }: UseAppFormOptions<T>) {
	// init form controller
	const {
		errors,
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
			for (const [key, errorMsg] of Object.entries(errors.value)) {
				if (errorMsg) {
					activeErrors[key as string] = errorMsg;
				}
			}
		}

		return activeErrors;
	});

	return {
		defineField,
		handleSubmit,
		formErrors,
		resetForm,
		formValues,
		setErrors,
		setFieldValue,
		submitCount,
	};
}
