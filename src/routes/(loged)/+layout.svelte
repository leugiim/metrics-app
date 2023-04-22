<script lang="ts">
	import { logedUser, token } from '$lib/stores';
	import Navbar from '$lib/components/menus/Navbar.svelte';
	import { browser } from '$app/environment';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchUser } from '$lib/fetch/fetchUsers';
	import { FetchStatus } from '$lib/types/Fetch';
	import type { User } from '$lib/types/User';
	import { onMount } from 'svelte';

	let { status, httpStatus, message, content: user } = getInitialFetchResult<User>();

	onMount(() => {
		if (browser) {
			useFetchUser({ status, httpStatus, message, content: user }, $token);
		}
	});

	$: if ($status == FetchStatus.SUCCESS) {
		logedUser.set($user);
	}
</script>

<Navbar user={$logedUser?.username} />
<slot />
