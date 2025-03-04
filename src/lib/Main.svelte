<script>
	import Category from './components/Category.svelte';
	import Details from './components/Details.svelte';
	import Trends from './components/Trends.svelte';
</script>

<div class="grid grid-cols-1 gap-6 px-4 py-5 sm:grid-cols-2 sm:px-4 md:px-6">
	<Trends />
	<Category />
</div>

<div class="px-4 sm:px-4 md:px-6">
	<Details />
</div>
