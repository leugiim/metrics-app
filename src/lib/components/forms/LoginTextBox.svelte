<script lang="ts">
	import { type InputParams, defaultInputParams } from '$lib/types/forms/InputParams';

	export let { type, placeholder, icon, value = '' }: InputParams = defaultInputParams;
	let visible = false;

	$: calcType = !visible ? type : 'text';
	const handleInput = (e: Event) => {
		value = (e?.target as HTMLInputElement)?.value ?? '';
	};
</script>

<div class="flex">
	{#if icon}
		<span
			class="inline-flex items-center border-0 border-l-4 border-secondary bg-white px-3 text-sm text-primary"
		>
			<i class={icon} />
		</span>
	{/if}
	<input
		type={calcType}
		{placeholder}
		class="relative block w-full border-0 py-1.5 text-gray-900 outline-none ring-0 ring-inset placeholder:text-dark"
		{value}
		on:input={handleInput}
	/>
	{#if type == 'password'}
		<button
			on:click={() => (visible = !visible)}
			class="inline-flex cursor-pointer items-center border-0 bg-white px-3 text-sm text-primary"
		>
			{#if visible}
				<i class="fa-solid fa-eye" />
			{:else}
				<i class="fa-solid fa-eye-slash" />
			{/if}
		</button>
	{/if}
</div>
