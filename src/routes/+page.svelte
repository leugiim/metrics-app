<script lang="ts">
	import Layout from './(loged)/+layout.svelte';
	import Dashboard from './(loged)/dashboard/+page.svelte';
	import Login from './login/+page.svelte';
	import { loading, token } from '$lib/stores';
</script>

{#if $loading}
	<p>loading...</p>
{:else if $token}
	<Layout>
		<Dashboard />
	</Layout>
{:else}
	<Login />
{/if}
