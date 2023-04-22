<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchCompany } from '$lib/fetch/fetchCompany';
	import { token } from '$lib/stores';
	import type { Company } from '$lib/types/Company';
	import FilterMetricsTable from '$lib/components/menus/FilterMetricsTable.svelte';

	// let resumenProductos: ProductsCount = {};
	let anioSeleccionado = new Date().getFullYear();

	let { status, httpStatus, message, content: company } = getInitialFetchResult<Company>();

	onMount(() => {
		if (browser) {
			useFetchCompany({ status, httpStatus, message, content: company }, $token, 'BMW');
		}
	});

	$: if ($company !== null) {
		// resumenProductos = $productos.reduce((acc: ProductsCount, curr) => {
		// 	acc[curr.product] = (acc[curr.product] || 0) + 1;
		// 	return acc;
		// }, {});
	}
</script>

{#if $company}
	<!-- <div class="m-20 grid grid-cols-2 gap-5">
		<Card size="xl" class="relative m-20 !max-w-none">
			<select class="absolute right-2 top-2 z-10 w-auto" bind:value={anioSeleccionado}>
				{#each obtenerAnios($company) as anio}
					<option value={anio}>{anio}</option>
				{/each}
			</select>
			<Bars
				titulo="Altas y Bajas"
				data={filtrarAltasYBajas($company, anioSeleccionado)}
			/>
		</Card>
	</div> -->

	<FilterMetricsTable company={$company} />
{/if}
