<script lang="ts">
	import { useFetchLoginMayorista } from '$lib/fetch/fetchMayoristas';
	import type { BearerToken } from '$lib/types/Auth';
	import { FetchStatus } from '$lib/types/Fetch';

	// let { status, message, content: token } = useFetchLoginMayorista('sistemas', 'S1st3m4s.2022');

	// $: if($status == FetchStatus.SUCCESS && $token !== null){
	//     const bearerToken:BearerToken = `Bearer ${$token}`;
	//     localStorage.setItem('token', bearerToken);
	// }
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<h1>login</h1>
