<script lang="ts">
	import { Card, Input, Label, Modal } from 'flowbite-svelte';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchCreateCompany } from '$lib/fetch/fetchCompany';
	import { logedUser, token } from '$lib/stores';
	import type { Company } from '$lib/types/Company';

	let formModal = false;
	let companyName = '';
	let { status, httpStatus, message, content: company } = getInitialFetchResult<Company>();

	const handleCreateCompany = () => {
		if (companyName === '') return;
		useFetchCreateCompany({ status, httpStatus, message, content: company }, $token, companyName);
	};

	$: if ($company) {
		$logedUser?.companiesPermissions.push($company.name);
		logedUser.set($logedUser);
		companyName = '';
		formModal = false;
	}
</script>

<button class="col-span-2" on:click={() => (formModal = true)}>
	<Card
		horizontal
		class="grid !max-w-none cursor-pointer place-items-center bg-light text-primary hover:brightness-95"
	>
		<span class="fa fa-plus fa-2x" />
		<h3 class="mt-3 text-2xl">ADD COMPANY</h3>
	</Card>
</button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create company</h3>
		<Label class="space-y-2">
			<span>Company name</span>
			<Input type="text" required bind:value={companyName} />
		</Label>
		{#if $message}
			<div class="text-sm text-primary">{$message}</div>
		{/if}
		<button
			on:click={handleCreateCompany}
			type="submit"
			class="group relative flex w-full justify-center bg-secondary py-2 px-3 text-sm font-bold uppercase text-white hover:brightness-110"
		>
			CREATE

			<i class="fa-solid fa-plus absolute inset-y-0 right-3 flex items-center pl-3" />
		</button>
	</form>
</Modal>
