<script lang="ts">
	import SectionHeader from '$lib/components/sections/SectionHeader.svelte';
	import SectionFooter from '$lib/components/sections/SectionFooter.svelte';

	export let headerTitle: string;
	export let footerMessage: string;
</script>

<div class="flex flex-col">
	<SectionHeader title={headerTitle} />
	<slot name="body" />
	<SectionFooter message={footerMessage} />
</div>
