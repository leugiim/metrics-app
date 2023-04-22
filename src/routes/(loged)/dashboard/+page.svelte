<script lang="ts">
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchCreateCompany } from '$lib/fetch/fetchCompany';
	import { logedUser, token } from '$lib/stores';
	import type { Company } from '$lib/types/Company';
	import { Card, Input, Label, Modal } from 'flowbite-svelte';

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

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="mt-4 flex h-full items-start justify-center bg-muted">
	{#if $logedUser}
		<div class="m-20 grid grid-cols-2 gap-5">
			{#each $logedUser?.companiesPermissions as companyName, index}
				<Card img="img/img.png" horizontal>
					<h2 class="mb-2 text-2xl font-bold tracking-tight text-primary ">
						{companyName}
					</h2>
					<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec tincidunt
						lacinia, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
					</p>
					<a
						href={`metrics/${companyName}`}
						class="group relative flex w-full justify-center bg-secondary py-2 px-3 text-sm font-bold uppercase text-white hover:brightness-110"
					>
						See metrics
						<i
							class="fa-solid fa-chevron-right absolute inset-y-0 right-3 flex items-center pl-3"
						/>
					</a>
				</Card>
			{/each}
			{#if $logedUser.roles.canWriteCompanies}
				<button class="col-span-2" on:click={() => (formModal = true)}>
					<Card
						horizontal
						class="grid !max-w-none cursor-pointer place-items-center bg-light text-primary hover:brightness-95"
					>
						<span class="fa fa-plus fa-2x" />
						<h3 class="mt-3 text-2xl">ADD COMPANY</h3>
					</Card>
				</button>
			{/if}
		</div>
	{/if}

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
</div>
