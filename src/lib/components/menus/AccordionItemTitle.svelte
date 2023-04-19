<script lang="ts">
	export let title: string;
	export let icon: string;
</script>

<span class="flex gap-2 p-4 text-2xl">
	<i class={icon} />
	<span>{title}</span>
</span>
