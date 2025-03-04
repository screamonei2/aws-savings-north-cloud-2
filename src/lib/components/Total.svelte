<script>
	import { onMount } from 'svelte';
	import { fetchSavingsData } from '../../services/api';

	let title = 'Total Savings';
	let totalSavings = 0;

	async function fetchData() {
		const data = await fetchSavingsData();

		if (data && data.overview) {
			totalSavings = data.overview.totalSavings;
		}
	}

	onMount(fetchData);
</script>

<div class="border-north w-full rounded-lg border p-6 sm:max-w-sm">
	<h5 class="text-gray-north mb-3 font-normal text-gray-700 uppercase">{title}</h5>
	<p class="satoshi mb-2 text-2xl font-bold tracking-tight text-white">
		${totalSavings.toFixed(2)}
	</p>
</div>
