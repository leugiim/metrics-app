<script lang="ts">
	import {
		Card,
		Pagination,
		ChevronLeft,
		ChevronRight,
		TableSearch,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Badge
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getInitialFetchResult } from '$lib/fetch';
	import { useFetchProductos } from '$lib/fetch/fetchProductos';
	import { token } from '$lib/stores';
	import {
		type Producto,
		type ProductsCount,
		filtrarAltasYBajas,
		obtenerAnios,
		getStatusColor,
		orderByDateUpDesc
	} from '$lib/types/Producto';
	import Bars from '$lib/components/graficas/Bars.svelte';
	import DoubleBars from '$lib/components/graficas/DoubleBars.svelte';
	import type { LinkType } from 'flowbite-svelte/dist/types';

	const PRODUCTOS_POR_PAGINA = 20;
	const NUMERO_DE_PAGINAS_ADYACENTES = 5;

	let resumenProductos: ProductsCount = {};
	let productosFiltrados: Producto[] = [];
	let productosPaginados: Producto[] = [];
	let pages: LinkType[] = [];
	let numPages = 0;
	let activePage = 0;
	let pageHelper: { start: number; end: number; length: number } = { start: 0, end: 0, length: 0 };
	let busqueda = '';
	let anioSeleccionado = new Date().getFullYear();
	let classesTabla = 'text-center h-10';
	let { status, httpStatus, message, content: productos } = getInitialFetchResult<Producto[]>();

	onMount(() => {
		if (browser) {
			useFetchProductos({ status, httpStatus, message, content: productos }, $token);
		}
	});

	$: if ($productos !== null) {
		resumenProductos = $productos.reduce((acc: ProductsCount, curr) => {
			acc[curr.product] = (acc[curr.product] || 0) + 1;
			return acc;
		}, {});

		productosFiltrados = $productos.filter((producto) => {
			return (
				producto.product.toLowerCase().includes(busqueda.toLowerCase()) ||
				producto.status.toLowerCase().includes(busqueda.toLowerCase()) ||
				producto.dateUp.toLowerCase().includes(busqueda.toLowerCase()) ||
				producto.dateDown.toLowerCase().includes(busqueda.toLowerCase()) ||
				producto.guidService.toLowerCase().includes(busqueda.toLowerCase())
			);
		});

		productosFiltrados = productosFiltrados.sort(orderByDateUpDesc);

		pages = [];
		numPages = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
		if (activePage >= numPages) activePage = 0;
		const startPage = Math.max(activePage - NUMERO_DE_PAGINAS_ADYACENTES, 0);
		const endPage = Math.min(activePage + NUMERO_DE_PAGINAS_ADYACENTES, numPages);

		for (let i = startPage; i < endPage; i++) {
			pages.push({
				name: (i + 1).toString(),
				active: i === activePage
			});
		}

		calcularProductosPaginados();
	}

	const previous = () => {
		activePage = Math.max(activePage - 1, 0);
		calcularProductosPaginados();
	};
	const next = () => {
		activePage = Math.min(activePage + 1, numPages - 1);
		calcularProductosPaginados();
	};
	const handleClick = (event: Event) => {
		const text = (event.target as Element).innerHTML;
		activePage = parseInt(text) - 1;
		calcularProductosPaginados();
	};

	const calcularProductosPaginados = () => {
		const start = activePage * PRODUCTOS_POR_PAGINA;
		const end = Math.min(start + PRODUCTOS_POR_PAGINA, productosFiltrados.length);
		pageHelper = { start, end, length: productosFiltrados.length };
		productosPaginados = productosFiltrados.slice(start, end);
	};
</script>

{#if $productos}
	<div class="m-20 grid grid-cols-2 gap-5">
		{#if resumenProductos}
			<Card size="xl">
				<Bars titulo="Productos" data={Object.entries(resumenProductos)} ordenar={true} />
			</Card>
		{/if}
		<Card size="xl" class="relative">
			<select class="absolute right-2 top-2 z-10 w-auto" bind:value={anioSeleccionado}>
				{#each obtenerAnios($productos) as anio}
					<option value={anio}>{anio}</option>
				{/each}
			</select>
			<DoubleBars
				titulo="Altas y Bajas"
				tituloDerecha="Altas"
				tituloIzquierda="Bajas"
				data={filtrarAltasYBajas($productos, anioSeleccionado)}
			/>
		</Card>
	</div>

	<Card size="xl" class="relative m-20 !max-w-none">
		<div class="absolute top-6 right-10 z-10 text-right">
			<p>
				Visualizando del <b>{pageHelper.start}</b> al <b>{pageHelper.end}</b> de
				<b>{pageHelper.length}</b>
			</p>
			<Pagination {pages} on:click={handleClick} on:previous={previous} on:next={next}>
				<svelte:fragment slot="prev">
					<ChevronLeft class="h-5 w-5" />
				</svelte:fragment>
				<svelte:fragment slot="next">
					<ChevronRight class="h-5 w-5" />
				</svelte:fragment>
			</Pagination>
		</div>
		<TableSearch
			striped={true}
			placeholder="Buscar producto"
			hoverable={true}
			divClass="shadow-none"
			bind:inputValue={busqueda}
		>
			<TableHead theadClass={classesTabla}>
				<TableHeadCell>Producto</TableHeadCell>
				<TableHeadCell>Estado</TableHeadCell>
				<TableHeadCell>Fecha de alta</TableHeadCell>
				<TableHeadCell>Fecha de baja</TableHeadCell>
				<!-- <TableHeadCell>Tipo</TableHeadCell> -->
				<TableHeadCell>Guid</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each productosPaginados as producto}
					<TableBodyRow>
						<TableBodyCell tdClass={classesTabla}>{producto.product}</TableBodyCell>
						<TableBodyCell tdClass={classesTabla}>
							<Badge color={getStatusColor(producto.statusId)}>
								{producto.status.toUpperCase()}
							</Badge>
						</TableBodyCell>
						<TableBodyCell tdClass={classesTabla}>{producto.dateUp}</TableBodyCell>
						<TableBodyCell tdClass={classesTabla}>{producto.dateDown}</TableBodyCell>
						<!-- <TableBodyCell tdClass={classesTabla}>{producto.serviceType}</TableBodyCell> -->
						<TableBodyCell tdClass={classesTabla}>{producto.guidService}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</TableSearch>
	</Card>
{/if}
