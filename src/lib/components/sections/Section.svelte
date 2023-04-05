<script lang="ts">
	import SectionHeader from '$lib/components/sections/SectionHeader.svelte';
	import SectionBody from '$lib/components/sections/SectionBody.svelte';

	export let headerTitle: string;
</script>

<div class="flex flex-col bg-white p-4">
	<SectionHeader title={headerTitle} />
	<SectionBody />
</div>
