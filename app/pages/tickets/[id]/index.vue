<script setup lang="ts">
	const title = useState('title');
</script>

<template>
	<div>
		<Title> Post | {{ title }}</Title>

		<div>
			<h1>Sample ticket title</h1>
			<p>Ticket status: Open</p>

			<div class="flex justify-between">
				<span> created by: John Doe </span>
				<div>
					<p>Created at: 2023-08-01</p>
					<p>Updated at: 2023-08-02</p>
				</div>
			</div>
		</div>
	</div>
</template>
