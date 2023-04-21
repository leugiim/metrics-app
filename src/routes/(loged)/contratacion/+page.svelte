<script lang="ts">
	import Section from '$lib/components/sections/Section.svelte';
	import AccordionItemTitle from '$lib/components/menus/AccordionItemTitle.svelte';
	import Servicios from '$lib/components/contratacion/Servicios.svelte';
	import Cobertura from '$lib/components/contratacion/Cobertura.svelte';
	import Resumen from '$lib/components/contratacion/Resumen.svelte';
	import { getInitialContratacion, type Contratacion } from '$lib/types/Contratacion';
	import { AccordionItem, Accordion } from 'flowbite-svelte';

	const currentYear = new Date().getFullYear();

	const contratacion: Contratacion = getInitialContratacion();
</script>

<Section headerTitle="Contratación" footerMessage="{currentYear} © Doruscom Mayorista v1.0">
	<Accordion
		multiple
		activeClasses="bg-primary text-alternative focus:ring-4 focus:ring-alternative"
		inactiveClasses="text-secondary hover:bg-primary hover:text-alternative"
		defaultClass="text-secondary"
	>
		<AccordionItem open transitionType="slide">
			<AccordionItemTitle slot="header" title="Cobertura" icon="fa-solid fa-house" />
			<Cobertura {contratacion} />
		</AccordionItem>
		<AccordionItem transitionType="slide">
			<AccordionItemTitle slot="header" title="Servicios" icon="fa-solid fa-bars" />
			<Servicios />
		</AccordionItem>
		<AccordionItem transitionType="slide">
			<AccordionItemTitle
				slot="header"
				title="Resumen de la contratación"
				icon="fa-solid fa-thumbs-up"
			/>
			<Resumen />
		</AccordionItem>
	</Accordion>
</Section>
