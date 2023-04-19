<script lang="ts">
	import { browser } from '$app/environment';
	import Logo from '$lib/components/Logo.svelte';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchProductos } from '$lib/fetch/fetchProductos';
	import { token } from '$lib/stores';
	import type { Producto, ProductsCount } from '$lib/types/Producto';
	import { onMount } from 'svelte';

	let resumenProductos: ProductsCount = {};
	let { status, httpStatus, message, content: productos } = getInitialFetchResult<Producto[]>();

	onMount(() => {
		if (browser) {
			useFetchProductos({ status, httpStatus, message, content: productos }, $token);
		}
	});

	$: if ($productos !== null) {
		resumenProductos = $productos.reduce((acc: ProductsCount, curr) => {
			acc[curr.product] = (acc[curr.product] || 0) + 1;
			return acc;
		}, {});
	}
</script>

{#if resumenProductos}
	{#each Object.keys(resumenProductos) as producto}
		<p>{producto}: {resumenProductos[producto]}</p>
	{/each}
{/if}
