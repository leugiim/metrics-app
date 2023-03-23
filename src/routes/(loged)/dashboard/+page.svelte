<script lang="ts">
	import { token } from '$lib/stores';
	import { useFetchMayorista } from '$lib/fetch/fetchMayoristas';
	import { FetchStatus } from '$lib/types/Fetch';
	import { getInitialFetchResult } from '$lib/fetch';
	import type { Mayorista } from '$lib/types/Mayorista';

	let { status, message, content: user } = getInitialFetchResult<Mayorista>();

	useFetchMayorista({ status, message, content: user }, $token);
</script>

<h1>dashboard</h1>

{$token}

{#if $status == FetchStatus.PENDING}
	<p>loading...</p>
{:else if $status == FetchStatus.ERROR}
	<p>{$message}</p>
{:else}
	{$user?.guid}
	{$user?.username}
{/if}
