<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Navbar from '$lib/components/menus/Navbar.svelte';
	import { token, mayorista } from '$lib/stores';
</script>

<Navbar user={$mayorista?.username} />
<div class="mt-4 flex h-full items-start justify-center bg-muted">
	<Logo src="img/doruscom.png" alt="Doruscom Logo" width={1500} />
</div>
