<script lang="ts">
	import '../app.css';
	import { loading } from '$lib/stores';
	import Loading from '$lib/components/Loading.svelte';
</script>

{#if $loading}
	<Loading />
{:else}
	<slot />
{/if}
