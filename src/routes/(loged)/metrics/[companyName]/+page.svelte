<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchCompany } from '$lib/fetch/fetchCompany';
	import { token } from '$lib/stores';
	import type { Company } from '$lib/types/Company';
	import MetricChart from '$lib/components/menus/MetricChart.svelte';
	import FilterMetricsTable from '$lib/components/menus/FilterMetricsTable.svelte';
	import { page } from '$app/stores';

	const companyName = $page.url.pathname.replace('/metrics/', '');
	let { status, httpStatus, message, content: company } = getInitialFetchResult<Company>();

	onMount(() => {
		if (browser) {
			useFetchCompany({ status, httpStatus, message, content: company }, $token, companyName);
		}
	});
</script>

<svelte:head>
	<title>Metrics</title>
</svelte:head>

{#if $company}
	<h1 class="m-20 text-5xl font-bold uppercase text-primary">{$company.name}</h1>

	<MetricChart company={$company} />

	<FilterMetricsTable company={$company} />
{:else if $message}
	<div class="grid h-80 place-items-center text-primary">
		<h1 class="text-2xl font-bold">{$message}</h1>
	</div>
{/if}
