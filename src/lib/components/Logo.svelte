<script lang="ts">
	export let src: string;
	export let alt: string;
	export let width: number;
</script>

<img class="mx-auto h-auto" style="width: {width}px" {src} {alt} />
