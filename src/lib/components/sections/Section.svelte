<script lang="ts">
	import SectionHeader from '$lib/components/sections/SectionHeader.svelte';
	import SectionFooter from '$lib/components/sections/SectionFooter.svelte';

	export let headerTitle: string;
	export let footerMessage: string = new Date().getFullYear() + ' © Doruscom Mayorista v1.0.0';
</script>

<div class="flex flex-col">
	<SectionHeader title={headerTitle} />
	<slot />
	<SectionFooter message={footerMessage} />
</div>
