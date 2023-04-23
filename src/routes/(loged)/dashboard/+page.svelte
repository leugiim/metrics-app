<script lang="ts">
	import AddCompanyButton from '$lib/components/menus/AddCompanyButton.svelte';
	import CompanyCard from '$lib/components/menus/CompanyCard.svelte';
	import { logedUser } from '$lib/stores';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="mt-4 flex h-full items-start justify-center bg-muted">
	{#if $logedUser}
		<div class="m-20 grid grid-cols-2 gap-5">
			{#each $logedUser?.companiesPermissions as companyName, index}
				<CompanyCard {companyName} />
			{/each}
			{#if $logedUser.roles.canWriteCompanies}
				<AddCompanyButton />
			{/if}
		</div>
	{/if}
</div>
