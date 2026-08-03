<script setup lang="ts">
	import BaseSwitch from '@components/base/BaseSwitch.vue';
	import { z } from 'zod';
	import { toTypedSchema } from '@vee-validate/zod';

	const createUserSchema = z.object({
		name: z.string({ message: 'This field is required' }).min(4, { message: 'Name must have at least 4 characters ' }),
		email: z.string({ message: 'This field is required' }).email({ message: 'Must be a valid email. ' }),
		password: z
			.string({ message: 'This field is required' })
			.min(4, { message: 'Password must atleast be 4 characters ' }),
		isAdmin: z.boolean({ message: 'This field is required' }).default(false),
	});

	const { handleSubmit, errors, setApiErrorsToForm, defineField, submitCount } = useAppForm({
		schema: toTypedSchema(createUserSchema),
	});

	type UserPayload = z.infer<typeof createUserSchema>;

	const { create } = useUsers();

	const [name] = defineField('name');
	const [email] = defineField('email');
	const [password] = defineField('password');
	const [isAdmin] = defineField('isAdmin');

	const onSubmitCreateUser = handleSubmit(async (values) => {
		try {
			await create(values as UserPayload);
			navigateTo('/users');
		} catch (e) {
			setApiErrorsToForm(e, 'data.attributes.');
		}
	});
</script>

<template>
	<div class="create-user mx-auto max-w-md">
		<h1 class="py-8 text-center">Create User</h1>
		<form class="flex flex-col gap-8" @submit.prevent="onSubmitCreateUser">
			<base-input v-model="name" label="name" type="text" :error="submitCount > 0 && errors.name ? errors.name : ''" />
			<base-input
				v-model="email"
				label="email"
				type="text"
				:error="submitCount > 0 && errors.email ? errors.email : ''"
			/>
			<base-input
				v-model="password"
				label="password"
				type="password"
				:error="submitCount > 0 && errors.password ? errors.password : ''"
			/>
			<base-switch v-model="isAdmin" label="Admin" :error="submitCount > 0 && errors.isAdmin ? errors.isAdmin : ''" />

			<base-button type="submit" label="create" />
		</form>
	</div>
</template>
