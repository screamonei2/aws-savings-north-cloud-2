<script lang="ts">
	import { onMount } from 'svelte';
	import { filteredData } from '../../services/stores';

	type SavingsData = { date: string; service: string; amount: number };
	type CategoryData = {
		service: string;
		savings: number;
		previousSavings?: number;
		variation?: number;
	};

	let title: string = 'Savings Details';
	let detailedSavings: SavingsData[] = [];
	let totalAmount: number = 0;
	let savingsByCategory: CategoryData[] = [];
	let sortColumn: string | null = null;
	let sortAscending: boolean = true;

	function calculateSavingsByCategory(data: any) {
		const lastMonthSavings = data.savingsTrends[data.savingsTrends.length - 2]?.savings || 0;

		savingsByCategory = data.savingsByCategory.map((category) => {
			const previousSavings = lastMonthSavings * (category.savings / data.overview.totalSavings);
			const variation = previousSavings
				? ((category.savings - previousSavings) / previousSavings) * 100
				: 0;
			return { ...category, previousSavings, variation };
		});
	}

	function getPreviousMonth(service: string) {
		const category = savingsByCategory.find((cat) => cat.service === service);
		return category && category.previousSavings ? category.previousSavings : 0;
	}

	function getVariation(service: string, amount: number) {
		const category = savingsByCategory.find((cat) => cat.service === service);
		if (category && category.previousSavings) {
			return ((amount - category.previousSavings) / category.previousSavings) * 100;
		}
		return 0;
	}

	function sortBy(column: string) {
		if (sortColumn === column) {
			sortAscending = !sortAscending;
		} else {
			sortColumn = column;
			sortAscending = true;
		}

		detailedSavings = [...detailedSavings].sort((a, b) => compareValues(a, b, column));
	}

	function compareValues(a: any, b: any, column: string) {
		let valueA = a[column];
		let valueB = b[column];

		if (column === 'previousMonth') {
			valueA = getPreviousMonth(a.service);
			valueB = getPreviousMonth(b.service);
		}

		if (column === 'comparison') {
			valueA = getVariation(a.service, a.amount);
			valueB = getVariation(b.service, b.amount);
		}

		if (typeof valueA === 'number' && typeof valueB === 'number') {
			return sortAscending ? valueA - valueB : valueB - valueA;
		}

		return sortAscending
			? String(valueA).localeCompare(String(valueB))
			: String(valueB).localeCompare(String(valueA));
	}

	onMount(() => {
		filteredData.subscribe((data) => {
			detailedSavings = data.detailedSavings;
			totalAmount = detailedSavings.reduce((sum, item) => sum + item.amount, 0);
			calculateSavingsByCategory(data);
		});
	});
</script>

<div class="border-north w-full rounded-lg border">
	<div class="card-header border-north my-6 border-b p-6">
		<h5 class="satoshi mb-3 text-xl font-normal text-white uppercase">{title}</h5>
	</div>
	<div class="overflow-x-auto px-6 pb-6">
		<table class="text-gray-north-sec w-full border-collapse text-left">
			<thead>
				<tr class="border-north-2 border-b">
					<th class="cursor-pointer py-5 font-semibold uppercase" on:click={() => sortBy('date')}>
						Date {sortColumn === 'date' ? (sortAscending ? '▲' : '▼') : ''}
					</th>
					<th
						class="cursor-pointer py-5 font-semibold uppercase"
						on:click={() => sortBy('service')}
					>
						Service {sortColumn === 'service' ? (sortAscending ? '▲' : '▼') : ''}
					</th>
					<th
						class="cursor-pointer py-5 text-right font-semibold uppercase"
						on:click={() => sortBy('previousMonth')}
					>
						Previous Month {sortColumn === 'previousMonth' ? (sortAscending ? '▲' : '▼') : ''}
					</th>
					<th
						class="cursor-pointer py-5 text-right font-semibold uppercase"
						on:click={() => sortBy('amount')}
					>
						Amount {sortColumn === 'amount' ? (sortAscending ? '▲' : '▼') : ''}
					</th>
					<th
						class="cursor-pointer py-5 text-right font-semibold uppercase"
						on:click={() => sortBy('comparison')}
					>
						Comparison {sortColumn === 'comparison' ? (sortAscending ? '▲' : '▼') : ''}
					</th>
				</tr>
			</thead>
			<tbody>
				{#each detailedSavings as { date, service, amount }}
					<tr class="text-gray-north border-north-2 border-t border-b">
						<td class="py-5 uppercase">{date}</td>
						<td class="py-5 uppercase">{service}</td>
						<td class="py-5 text-right">${getPreviousMonth(service).toFixed(2)}</td>
						<td class="py-5 text-right">${amount.toFixed(2)}</td>
						<td class="py-5 text-right font-semibold">
							{#each savingsByCategory as category}
								{#if category.service === service && category.previousSavings}
									<span
										class={getVariation(service, amount) >= 0
											? 'text-green-north'
											: 'text-red-north'}
									>
										{getVariation(service, amount) >= 0
											? `+${getVariation(service, amount).toFixed(2)}%`
											: `${getVariation(service, amount).toFixed(2)}%`}
									</span>
								{/if}
							{/each}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
