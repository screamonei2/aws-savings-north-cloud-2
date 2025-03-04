<script>
	import { onMount } from 'svelte';
	import { fetchSavingsData } from '../../services/api';

	let title = 'Percentage';
	let percentageChange = 0;

	async function fetchData() {
		const data = await fetchSavingsData();

		if (data && data.overview) {
			percentageChange = data.overview.percentageChange;
		}
	}

	onMount(fetchData);
</script>

<div class="border-north w-full rounded-lg border p-6 sm:max-w-sm">
	<h5 class="text-gray-north mb-3 font-normal uppercase">{title}</h5>
	<p
		class="satoshi mb-2 flex items-center gap-1 text-2xl font-bold tracking-tight"
		class:text-green-north={percentageChange >= 0}
		class:text-red-north={percentageChange < 0}
	>
		{percentageChange >= 0 ? `+${percentageChange.toFixed(2)}%` : `${percentageChange.toFixed(2)}%`}
		<span class="material-symbols-rounded text-3xl">
			{percentageChange >= 0 ? 'trending_up' : 'trending_down'}
		</span>
	</p>
</div>
