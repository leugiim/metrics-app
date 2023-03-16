<script lang="ts">
	import '../app.css';

	import { setContext } from 'svelte';

	import Loading from '$lib/components/Loading.svelte';
	import { useFetchUsuario } from '$lib/fetch/fetchUsuarios';
	import { ResponseStatus } from '$lib/types/enums';

	let { status, message, content: user } = useFetchUsuario();

	$: setContext('user', $user);
</script>

{#if $status == ResponseStatus.PENDING}
	<Loading />
{:else if $status == ResponseStatus.ERROR}
	<p>{$message}</p>
{:else}
	<slot />
{/if}
