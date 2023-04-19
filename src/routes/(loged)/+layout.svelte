<script lang="ts">
	import { mayorista, token } from '$lib/stores';
	import Navbar from '$lib/components/menus/Navbar.svelte';
	import { browser } from '$app/environment';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchMayorista } from '$lib/fetch/fetchMayoristas';
	import { FetchStatus } from '$lib/types/Fetch';
	import type { Mayorista } from '$lib/types/Mayorista';
	import { onMount } from 'svelte';

	let { status, httpStatus, message, content: user } = getInitialFetchResult<Mayorista>();

	onMount(() => {
		if (browser) {
			useFetchMayorista({ status, httpStatus, message, content: user }, $token);
		}
	});

	$: if ($status == FetchStatus.SUCCESS) {
		console.log('Actualizando mayorista:', $user);
		mayorista.set($user);
	}
</script>

<Navbar user={$mayorista?.username} />
<slot />
