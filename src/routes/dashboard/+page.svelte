<script lang="ts">
	import type { Usuario } from '$lib/types/Usuario';
	import { getContext } from 'svelte';

	const user = getContext<Usuario | null>('user');
</script>

<h1>dashboard</h1>

{user?.id}
{user?.nombre}
{user?.apellido}
