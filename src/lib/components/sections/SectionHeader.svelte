<script lang="ts">
	import type { Section } from '$lib/types/menus/Section';
	import { onMount } from 'svelte';

	export let title: string;
	let sections: Section[] = [];
	let currentUrl = '';

	onMount(() => {
		obtenerSecciones();
	});

	const obtenerSecciones = () => {
		sections = [];

		//Siempre va a mostrarse inicio
		let initialSection = { name: 'Inicio', url: '/' };
		sections.push(initialSection);

		//A continuación desglosamos la url para obtener las faltantes
		currentUrl = window.location.href;
		let splitPath = currentUrl.split('/');
		splitPath.splice(0, 3); //Eliminamos la url principal

		let pathConcatenation = '';
		splitPath.forEach((element) => {
			pathConcatenation += '/';

			let name = element[0].toUpperCase() + element.substring(1); // Ponemos la primera letra en mayúscula
			pathConcatenation += element;
			let url = pathConcatenation;

			let newSection = { name: name, url: url };
			sections.push(newSection);
		});
	};
</script>

<div class="flex flex-col bg-light pl-10">
	<nav class="m-2 mt-4 flex">
		<ol class="inline-flex items-center space-x-1 md:space-x-3">
			{#each sections as section, index}
				<li class="inline-flex items-center">
					<a
						href={section.url}
						class="inline-flex items-center text-sm font-medium text-secondary hover:text-alternative"
					>
						{#if index == 0}
							<i class="fa-solid fa-house hover:fa-xl mr-2 h-4 w-4 hover:text-light" />
						{:else}
							<i class="fa-solid fa-chevron-right hover:fa-xl mr-2 h-4 w-4 hover:text-light" />
						{/if}
						{section.name}
					</a>
				</li>
			{/each}
		</ol>
	</nav>
	<h3
		class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-alternative md:text-5xl lg:text-6xl"
	>
		<span class="underline-offset-3 underline decoration-secondary decoration-8">{title}</span>
	</h3>
</div>
