<script lang="ts">
	import { logedUser } from '$lib/stores';
	import { Card } from 'flowbite-svelte';
</script>

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
		</div>
	{/if}
</div>
