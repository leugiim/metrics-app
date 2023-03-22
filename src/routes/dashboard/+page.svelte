<script lang="ts">
	import type { Mayorista } from '$lib/types/Mayorista';
	import { getContext } from 'svelte';

	const user = getContext<Mayorista | null>('user');
</script>

<h1>dashboard</h1>

{user?.guid}
{user?.username}
