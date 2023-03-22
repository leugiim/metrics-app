<script lang="ts">
	import '../app.css';

	import { setContext } from 'svelte';

	import Loading from '$lib/components/Loading.svelte';
	import { useFetchMayorista } from '$lib/fetch/fetchMayoristas';
	import { FetchStatus } from '$lib/types/Fetch';

	let { status, message, content: user } = useFetchMayorista();

	console.log('user', $user);
	$: setContext('user', $user);
</script>

{#if $status == FetchStatus.PENDING}
	<Loading />
{:else if $status == FetchStatus.ERROR}
	<p>{$message}</p>
{:else}
	<slot />
{/if}
