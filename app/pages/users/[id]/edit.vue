<script setup lang="ts">
	import { computed } from 'vue';
	import { userService } from '~/services/user.service';
	import { z } from 'zod';
	import { toTypedSchema } from '@vee-validate/zod';
	import type { UserPayload } from '~~/types/User';

	const editUserSchema = toTypedSchema(
		z.object({
			name: z.string().min(4, {
				message: 'Name must be at least 4 characters',
			}),
			email: z
				.string()
				.email({
					message: 'Please input a valid email',
				})
				.min(4, { message: 'Email must be at least 4 characters ' }),
			isAdmin: z.boolean(),
		}),
	);

	const { defineField, errors, handleSubmit, resetForm, setApiErrorsToForm, submitCount } = useAppForm({
		schema: editUserSchema,
	});

	const [name] = defineField('name');
	const [email] = defineField('email');
	const [isAdmin] = defineField('isAdmin');

	const route = useRoute();
	const userId = computed(() => route.params.id as string);
	const { user, edit } = useUser(userId);

	const handleSubmitEditTicket = handleSubmit(async (values) => {
		try {
			await edit(values as UserPayload);
			navigateTo('/users');
		} catch (e) {
			setApiErrorsToForm(e);
		}
	});

	const router = useRouter();
	function handleGoBack() {
		return router.back();
	}

	watch(
		user,
		(newVal) => {
			if (newVal) {
				resetForm({
					values: userService.normalizeUserData(newVal),
				});
			}
		},
		{ immediate: true },
	);
</script>

<template>
	<div class="create-user mx-auto max-w-md">
		<div class="relative flex justify-center">
			<a href="#" class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" @click.prevent.stop="handleGoBack">
				<icon :icon="['fas', 'arrow-left']" />
			</a>
			<h1 class="py-8 text-center text-lg">Edit User</h1>
		</div>
		<form class="flex flex-col gap-8" @submit.prevent="handleSubmitEditTicket">
			<base-input v-model="name" label="name" type="text" :error="submitCount > 0 && errors.name ? errors.name : ''" />
			<base-input
				v-model="email"
				label="email"
				type="text"
				:error="submitCount > 0 && errors.email ? errors.email : ''"
			/>
			<base-switch v-model="isAdmin" label="Admin" />

			<base-button type="submit" label="edit" class="bg-gray-900 text-white" />
		</form>
	</div>
</template>
