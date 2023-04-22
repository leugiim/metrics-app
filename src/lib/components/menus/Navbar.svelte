<script lang="ts">
	import Logo from '../Logo.svelte';

	export let user: string | undefined;
</script>

<nav class="bg-muted text-secondary">
	<div
		class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2.5 md:px-6"
	>
		<a href="/" class="flex items-center">
			<Logo src="/img/factorial.svg" alt="Factorial Logo" width={200} />
		</a>
		<div class="flex items-center">
			<i class="fa-solid fa-circle-user fa-2xl mr-3" />
			<span class="mr-3">{user}</span>
			<a href="/logout" class="text-sm font-medium hover:underline">
				<i class="fa-solid fa-sign-out fa-lg hover:fa-xl hover:text-light" />
			</a>
		</div>
	</div>
</nav>
<nav class="bg-primary">
	<div class="mx-auto max-w-screen-xl px-4 py-3 md:px-6">
		<div class="flex items-center">
			<ul class="mt-0 mr-6 flex flex-row space-x-8 text-sm font-medium text-light">
				<li>
					<a href="/" class="p-3 hover:bg-light hover:text-primary">
						<i class="fa-solid fa-home fa-lg" />
						Home
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
