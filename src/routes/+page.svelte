<script lang="ts">
	import Layout from './(loged)/+layout.svelte';
	import Dashboard from './(loged)/dashboard/+page.svelte';
	import Login from './login/+page.svelte';
	import { loading, token } from '$lib/stores';
	import Loading from '$lib/components/Loading.svelte';
</script>

{#if $loading}
	<Loading />
{:else if $token}
	<Layout>
		<Dashboard />
	</Layout>
{:else}
	<Login />
{/if}
