<script lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import Header from '$lib/Header.svelte';
	import Main from '$lib/Main.svelte';

	let title = 'AWS Savings';
</script>

<div class="container mx-auto my-6">
	<Header />
	<h1 class="px-4 py-5 text-5xl text-white uppercase sm:px-4 md:px-6">{title}</h1>
	<div class="px-4 sm:px-4 md:px-6">
		<Filter />
	</div>
	<Main />
</div>
