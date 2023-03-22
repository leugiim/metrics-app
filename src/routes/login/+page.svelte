<script lang="ts">
	import { useFetchLoginMayorista } from '$lib/fetch/fetchMayoristas';
	import { FetchStatus } from '$lib/types/Fetch';

	let { status, message, content: token } = useFetchLoginMayorista('sistemas', 'S1st3m4s.2022');
</script>

<h1>login</h1>

{#if $status == FetchStatus.PENDING}
	<p>loading...</p>
{:else if $status == FetchStatus.ERROR}
	<p>{$message}</p>
{:else}
	<p>logged in {$token}</p>
{/if}
