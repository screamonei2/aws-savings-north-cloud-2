<script lang="ts">
	import { selectedPeriod, filteredData } from '../../services/stores';
	import { fetchSavingsData } from '../../services/api';
	import { onMount } from 'svelte';

	const periods = [
		{ label: 'Prev 30 days', value: 30 },
		{ label: 'Prev 60 days', value: 60 },
		{ label: 'Prev 90 days', value: 90 },
		{ label: 'All', value: 365 }
	];

	let selected = 365;

	async function filterData(period: number) {
		const data = await fetchSavingsData();
		if (!data) return;

		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - period);

		const filteredDetailedSavings = data.detailedSavings.filter((item) => {
			const itemDate = new Date(item.date);
			return itemDate >= startDate && itemDate <= endDate;
		});

		const filteredSavingsTrends = data.savingsTrends.slice(-Math.ceil(period / 30));

		const filteredSavingsByCategory = data.savingsByCategory.map((category) => {
			const savings = filteredDetailedSavings
				.filter((item) => item.service === category.service)
				.reduce((sum, item) => sum + item.amount, 0);
			return { ...category, savings };
		});

		filteredData.set({
			overview: data.overview,
			savingsTrends: filteredSavingsTrends,
			savingsByCategory: filteredSavingsByCategory,
			detailedSavings: filteredDetailedSavings
		});

		console.log('Dados filtrados:', {
			overview: data.overview,
			savingsTrends: filteredSavingsTrends,
			savingsByCategory: filteredSavingsByCategory,
			detailedSavings: filteredDetailedSavings
		});
	}

	function selectPeriod(period: number) {
		selected = period;
		selectedPeriod.set(period);
		filterData(period);
	}

	onMount(() => {
		filterData(selected);
	});
</script>

<div
	class="filter-container flex gap-6 sm:col-span-6 sm:flex-row sm:items-center sm:justify-end sm:gap-6"
>
	{#each periods as period}
		<button
			class="chip rounded-full border border-gray-500 px-4 py-2 text-sm font-medium text-gray-500 uppercase transition-colors
               {selected === period.value
				? 'active border-purple-600 bg-purple-600 text-white'
				: ''}
               hover:border-purple-600 hover:bg-purple-600 hover:text-white"
			on:click={() => selectPeriod(period.value)}
		>
			{period.label}
		</button>
	{/each}
</div>
