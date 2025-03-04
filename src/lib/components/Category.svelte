<script lang="ts">
	import { onMount } from 'svelte';
	import Chart, { type ChartConfiguration, type ChartDataset } from 'chart.js/auto';
	import { filteredData } from '../../services/stores';

	let title: string = 'Savings by Category';
	let chartCanvas: HTMLCanvasElement | null = null;
	let chartInstance: Chart | null = null;

	let chartLabels: string[] = [];
	let chartValues: number[] = [];

	async function fetchData(): Promise<void> {
		const data = await fetchSavingsData();

		if (data && data.savingsByCategory) {
			chartLabels = data.savingsByCategory.map((item: { service: string }) =>
				item.service.toUpperCase()
			);
			chartValues = data.savingsByCategory.map((item: { savings: number }) => item.savings);
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

		const customFont = 'satoshi, sans-serif';

		const config: ChartConfiguration = {
			type: 'doughnut',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: '',
						backgroundColor: [
							'rgba(160, 111, 217, 1)',
							'rgba(180, 130, 230, 1)',
							'rgba(200, 150, 240, 1)',
							'rgba(219, 169, 250, 1)',
							'rgba(239, 190, 252, 1)',
							'rgba(255, 210, 255, 1)'
						],
						data: chartValues,
						borderWidth: 0
					} as ChartDataset<'doughnut'>
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'right',
						align: 'end',
						labels: {
							font: {
								family: customFont,
								size: 14
							},
							color: 'rgba(105, 110, 118, 1)',
							usePointStyle: true,
							pointStyle: 'rectRounded',
							padding: 16
						}
					},
					tooltip: {
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
						titleFont: {
							family: customFont,
							size: 14
						},
						bodyFont: {
							family: customFont,
							size: 14
						}
					}
				}
			}
		};

		chartInstance = new Chart(ctx, config);
	}

	onMount(() => {
		filteredData.subscribe((data) => {
			chartLabels = data.savingsByCategory.map((item) => item.service.toUpperCase());
			chartValues = data.savingsByCategory.map((item) => item.savings);
			updateChart();
		});
	});
</script>

<div class="border-north rounded-lg border">
	<div class="card-header border-north my-6 border-b p-6">
		<h5 class="satoshi mb-3 text-xl font-normal text-white uppercase">{title}</h5>
	</div>
	<div class="h-90 w-full p-6">
		<canvas bind:this={chartCanvas} class="h-full w-full"></canvas>
	</div>
</div>
