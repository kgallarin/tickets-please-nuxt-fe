<script setup lang="ts"></script>

<template>
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
</template>
