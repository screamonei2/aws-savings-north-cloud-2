<script lang="ts">
	import { onMount } from 'svelte';
	import Chart, { type ChartConfiguration, type ChartDataset } from 'chart.js/auto';
	import { filteredData } from '../../services/stores';

	let title: string = 'Trends';
	let chartCanvas: HTMLCanvasElement | null = null;
	let chartInstance: Chart | null = null;

	let chartLabels: string[] = [];
	let chartValues: number[] = [];

	async function fetchData(): Promise<void> {
		const data = await fetchSavingsData();

		if (data && data.savingsTrends) {
			chartLabels = data.savingsTrends.map((item: { month: string }) =>
				item.month.slice(0, 3).toUpperCase()
			);
			chartValues = data.savingsTrends.map((item: { savings: number }) => item.savings);
			updateChart();
		}
	}

	function updateChart(): void {
		if (!chartCanvas) return;

		if (chartInstance) {
			chartInstance.destroy();
		}

		const ctx = chartCanvas.getContext('2d');
		if (!ctx) return;

		const gradient = ctx.createLinearGradient(0, 0, 0, 300);
		gradient.addColorStop(0, 'rgba(160, 111, 203, 0.2)');
		gradient.addColorStop(1, 'rgba(000, 000, 000, 0)');

		const customFont = 'satoshi, sans-serif';

		const config: ChartConfiguration = {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Amount saved',
						backgroundColor: gradient,
						borderColor: 'rgba(160, 111, 203, 1)',
						data: chartValues,
						fill: true,
						pointBackgroundColor: 'rgba(160, 111, 203, 1)',
						pointBorderColor: 'rgba(160, 111, 203, 1)',
						pointBorderWidth: 1,
						pointRadius: 4,
						pointHoverRadius: 6
					} as ChartDataset<'line'>
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							color: 'rgba(44, 47, 52, 1)'
						},
						ticks: {
							callback: (value) => `$${value}`,
							color: 'rgba(105, 110, 118, 1)',
							font: {
								family: customFont,
								size: 14
							}
						}
					},
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: 'rgba(105, 110, 118, 1)',
							font: {
								family: customFont,
								size: 14
							}
						}
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}
		};

		chartInstance = new Chart(ctx, config);
	}

	onMount(() => {
		filteredData.subscribe((data) => {
			chartLabels = data.savingsTrends.map((item) => item.month.slice(0, 3).toUpperCase());
			chartValues = data.savingsTrends.map((item) => item.savings);
			updateChart();
		});
	});
</script>

<div class="border-north rounded-lg border">
	<div class="card-header border-north my-6 border-b p-6">
		<h5 class="satoshi mb-3 text-xl font-normal text-white uppercase">{title}</h5>
	</div>
	<div class="h-100% w-full p-6">
		<canvas bind:this={chartCanvas} class="h-full w-full"></canvas>
	</div>
</div>
