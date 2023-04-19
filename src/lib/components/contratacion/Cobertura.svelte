<script lang="ts">
	/* Types */
	import type { Contratacion } from '$lib/types/Contratacion';
	import type { Direccion, Via } from '$lib/types/Direccion';
	/* Components & Methods */
	import {
		useFetchBuscarVia,
		useFetchBuscarDireccion,
		useFetchReservarTrazado
	} from '$lib/fetch/fetchCallejero';
	import { getInitialFetchResult } from '$lib/fetch';
	/* Flowbite-Svelte */
	import { Listgroup, ListgroupItem } from 'flowbite-svelte';
	import { Select, Label } from 'flowbite-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let contratacion: Contratacion;
	let valueAddress = '';
	let selectedNumber: number | string = 0;
	let numerosCalleElegida: (string | number)[];
	let direccionesPosibles: Direccion[] = [];
	let showBis: boolean,
		showBloqueFinca: boolean,
		showLetraFinca: boolean,
		showEscalera: boolean,
		showPlanta: boolean,
		showMano1: boolean,
		showMano2 = false;

	$: if ($direcciones !== null) {
		numerosCalleElegida = $direcciones.reduce((acumulador: (string | number)[], objeto) => {
			if (!acumulador.includes(objeto.numero)) {
				acumulador.push(objeto.numero);
			}
			return acumulador;
		}, []);
		numerosCalleElegida.sort((a, b) => parseInt(a.toString()) - parseInt(b.toString()));
	}

	$: if (selectedNumber !== 0) {
		direccionesPosibles =
			$direcciones?.filter((direccion) => direccion.numero === selectedNumber) ?? [];
		direccionesPosibles.forEach((direccion) => {
			if (direccion.bis !== '' && direccion.bis !== null && direccion.bis !== 'No Aplica')
				showBis = true;
			if (direccion.bloque_de_la_finca !== '' && direccion.bloque_de_la_finca !== null)
				showBloqueFinca = true;
			if (direccion.letra_finca !== '' && direccion.letra_finca !== null) showLetraFinca = true;
			if (direccion.escalera !== '' && direccion.escalera !== null) showEscalera = true;
			if (direccion.planta !== '' && direccion.planta !== null) showPlanta = true;
			if (direccion.mano1 !== '' && direccion.mano1 !== null) showMano1 = true;
			if (direccion.mano2 !== '' && direccion.mano2 !== null) showMano2 = true;
			if (
				showBis &&
				showBloqueFinca &&
				showLetraFinca &&
				showEscalera &&
				showPlanta &&
				showMano1 &&
				showMano2
			)
				return false;
		});
	}

	let {
		status: statusVias,
		httpStatus: httpStatusVias,
		message: messageVias,
		content: vias
	} = getInitialFetchResult<Via[]>();

	let {
		status: statusDirecciones,
		httpStatus: httpStatusDirecciones,
		message: messageDirecciones,
		content: direcciones
	} = getInitialFetchResult<Direccion[]>();

	const handleVia = () => {
		if (valueAddress.length >= 5) {
			useFetchBuscarVia(
				{ status: statusVias, httpStatus: httpStatusVias, message: messageVias, content: vias },
				valueAddress
			);
		}

		if (valueAddress.length < 3) {
			$vias = null;
		}
	};

	const handleDireccion = (direccion: string) => {
		useFetchBuscarDireccion(
			{
				status: statusDirecciones,
				httpStatus: httpStatusDirecciones,
				message: messageDirecciones,
				content: direcciones
			},
			direccion
		);
	};

	const handleTrazado = (olt: string) => {
		console.log();
	};
</script>

<div class="m-4 flex flex-col p-2">
	{#if !$direcciones}
		<Label class="text-xl">Búsque una dirección</Label>
		<input
			id="#directionField"
			type="text"
			class="rounded"
			bind:value={valueAddress}
			on:keyup={handleVia}
		/>
		{contratacion.direccion}

		{#if $vias}
			<Listgroup active class="w-full text-secondary">
				{#each $vias as via}
					<ListgroupItem
						class="gap-2 text-base font-semibold hover:bg-light"
						on:click={() => handleDireccion(via.direccion)}
					>
						<i class="fa fa-door-closed" />
						{via.direccion}
					</ListgroupItem>
				{/each}
			</Listgroup>
		{/if}
	{:else}
		<div class="flex p-3">
			<button class="w-1/12" on:click={() => direcciones.set(null)}>
				<i class="fa fa-chevron-left" />
			</button>
			<h1 class="w-10/12 font-bold">{$direcciones[0].direccion}</h1>
		</div>
		<Label class="mt-3 w-full text-lg">Selecciona una dirección válida</Label>
		<div class="flex p-3">
			<!--NÚMERO-->
			<div class="flex w-1/3 flex-col">
				<Label class="mt-3 w-full text-lg">Número</Label>
				<Select
					id="selectNumberAddress"
					class="mt-2"
					bind:value={selectedNumber}
					placeholder="Selecciona..."
				>
					{#each numerosCalleElegida as numero}
						<option value={numero}>{numero}</option>
					{/each}
				</Select>
			</div>
		</div>
		{#if selectedNumber !== 0}
			<div class="flex p-3">
				<div class="flex w-full flex-col">
					<Table hoverable={true}>
						<TableHead>
							<TableHeadCell class="!p-4" />
							{#if showBis}<TableHeadCell class="!p-4">Bis</TableHeadCell>{/if}
							{#if showBloqueFinca}<TableHeadCell class="!p-4">Bloque de la Finca</TableHeadCell
								>{/if}
							{#if showLetraFinca}<TableHeadCell class="!p-4">Letra de la Finca</TableHeadCell>{/if}
							{#if showEscalera}<TableHeadCell class="!p-4">Escalera</TableHeadCell>{/if}
							{#if showPlanta}<TableHeadCell class="!p-4">Planta</TableHeadCell>{/if}
							{#if showMano1}<TableHeadCell class="!p-4">Mano 1</TableHeadCell>{/if}
							{#if showMano2}<TableHeadCell class="!p-4">Mano 2</TableHeadCell>{/if}
						</TableHead>
						<TableBody tableBodyClass="divide-y">
							{#each direccionesPosibles as direccion}
								<TableBodyRow>
									<TableBodyCell class="!p-4 text-center">
										<button on:click={() => handleTrazado(direccion.codigo_olt)} />
									</TableBodyCell>
									{#if showBis}<TableBodyCell class="!p-4 text-center"
											>{direccion.bis !== '' && direccion.bis !== null
												? direccion.bis
												: '-'}</TableBodyCell
										>{/if}
									{#if showBloqueFinca}<TableBodyCell class="!p-4 text-center"
											>{direccion.bloque_de_la_finca !== '' && direccion.bloque_de_la_finca !== null
												? direccion.bloque_de_la_finca
												: '-'}</TableBodyCell
										>{/if}
									{#if showLetraFinca}<TableBodyCell class="!p-4 text-center"
											>{direccion.letra_finca !== '' && direccion.letra_finca !== null
												? direccion.letra_finca
												: '-'}</TableBodyCell
										>{/if}
									{#if showEscalera}<TableBodyCell class="!p-4 text-center"
											>{direccion.escalera !== '' && direccion.escalera !== null
												? direccion.escalera
												: '-'}</TableBodyCell
										>{/if}
									{#if showPlanta}<TableBodyCell class="!p-4 text-center"
											>{direccion.planta !== '' && direccion.planta !== null
												? direccion.planta
												: '-'}</TableBodyCell
										>{/if}
									{#if showMano1}<TableBodyCell class="!p-4 text-center"
											>{direccion.mano1 !== '' && direccion.mano1 !== null
												? direccion.mano1
												: '-'}</TableBodyCell
										>{/if}
									{#if showMano2}<TableBodyCell class="!p-4 text-center"
											>{direccion.mano2 !== '' && direccion.mano2 !== null
												? direccion.mano2
												: '-'}</TableBodyCell
										>{/if}
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			</div>
		{/if}
	{/if}
</div>
