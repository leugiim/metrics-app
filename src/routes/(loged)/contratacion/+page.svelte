<script lang="ts">
	import Navbar from '$lib/components/menus/Navbar.svelte';
	import Section from '$lib/components/sections/Section.svelte';
	import { token, mayorista } from '$lib/stores';
</script>

<Navbar user={$mayorista?.username} />
<Section headerTitle="Contratación" />
