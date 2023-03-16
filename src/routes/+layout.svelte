<script lang="ts">
	import '../app.css';

	import { setContext } from 'svelte';

	import Loading from '$lib/components/Loading.svelte';
	import useFetchUsuario from '$lib/stores/Usuarios';

	let { isLoading, error, user } = useFetchUsuario();

	$: setContext('user', $user);
</script>

{#if $isLoading}
	<Loading />
{:else if $error}
	<p>An error occured while fetching users</p>
{:else}
	<slot />
{/if}
