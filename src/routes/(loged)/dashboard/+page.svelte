<script lang="ts">
	import { browser } from '$app/environment';
	import Logo from '$lib/components/Logo.svelte';
	import Navbar from '$lib/components/menus/Navbar.svelte';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchBuscarVia } from '$lib/fetch/fetchCallejero';
	import { token, mayorista } from '$lib/stores';
	import type { Via } from '$lib/types/Direccion';
	import { onMount } from 'svelte';

	let { status, httpStatus, message, content: vias } = getInitialFetchResult<Via[]>();

	onMount(() => {
		if (browser) {
			useFetchBuscarVia({ status, httpStatus, message, content: vias }, 'ave');
		}
	});
</script>

<Navbar user={$mayorista?.username} />
<div class="mt-4 flex h-full items-start justify-center bg-muted">
	<Logo src="img/doruscom.png" alt="Doruscom Logo" width={1500} />
</div>

{#if $vias}
	{#each $vias as via}
		<p>{via.direccion}</p>
	{/each}
{/if}
