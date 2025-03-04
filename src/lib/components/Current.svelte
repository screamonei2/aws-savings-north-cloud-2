<script>
	import { onMount } from 'svelte';
	import { fetchSavingsData } from '../../services/api';

	let title = 'Current Month';
	let currentMonthSavings = 0;

	async function fetchData() {
		const data = await fetchSavingsData();

		if (data && data.overview) {
			currentMonthSavings = data.overview.currentMonthSavings;
		}
	}

	onMount(fetchData);
</script>

<div class="border-north w-full rounded-lg border p-6 sm:max-w-sm">
	<h5 class="text-gray-north mb-3 font-normal uppercase">{title}</h5>
	<p class="satoshi mb-2 text-2xl font-bold tracking-tight text-white">
		${currentMonthSavings.toFixed(2)}
	</p>
</div>
