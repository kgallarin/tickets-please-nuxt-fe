<script lang="ts" setup>
	const tile = useState('title', () => 'Nuxt 3 + Tailwind CSS');
</script>
<template>
	<div class="min-h-screen bg-gray-100">
		<Title>{{ tile }}</Title>
		<nav class="flex items-center justify-between bg-white p-6 shadow">
			<div>
				<NuxtLink to="/">Logo</NuxtLink>
			</div>
			<div>
				<ClientOnly>
					<ul class="flex space-x-8">
						<li>
							<NuxtLink to="/">Home</NuxtLink>
						</li>
					</ul>
				</ClientOnly>
			</div>
		</nav>

		<!--    content here-->
		<slot />
	</div>
</template>
