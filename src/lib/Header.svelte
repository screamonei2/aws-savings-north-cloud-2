<script>
	import Total from './components/Total.svelte';
	import Current from './components/Current.svelte';
	import Percent from './components/Percent.svelte';
	import Brand from './components/Brand.svelte';
</script>

<header class="bg-north flex flex-none flex-wrap items-stretch justify-between px-4">
	<div class="grid w-full grid-cols-12 gap-4">
		<div class="col-span-12 flex justify-center sm:col-span-6 sm:justify-start">
			<Brand />
		</div>
		<div
			class="col-span-12 flex flex-col items-start justify-start gap-6 sm:col-span-6 sm:flex-row sm:items-center sm:justify-end sm:gap-6"
		>
			<Total />
			<Current />
			<Percent />
		</div>
	</div>
</header>
