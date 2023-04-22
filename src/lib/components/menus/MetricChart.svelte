<script lang="ts">
	import type { Company } from '$lib/types/Company';

	export let company: Company;

	// let resumenProductos: ProductsCount = {};
	// let anioSeleccionado = new Date().getFullYear();

	$: if (company !== null) {
		// resumenProductos = $productos.reduce((acc: ProductsCount, curr) => {
		// 	acc[curr.product] = (acc[curr.product] || 0) + 1;
		// 	return acc;
		// }, {});
	}
</script>

<!-- <div class="m-20 grid grid-cols-2 gap-5">
    <Card size="xl" class="relative m-20 !max-w-none">
        <select class="absolute right-2 top-2 z-10 w-auto" bind:value={anioSeleccionado}>
            {#each obtenerAnios($company) as anio}
                <option value={anio}>{anio}</option>
            {/each}
        </select>
        <Bars
            titulo="Altas y Bajas"
            data={filtrarAltasYBajas($company, anioSeleccionado)}
        />
    </Card>
</div> -->
