<script lang="ts">
	import { token, mayorista } from '$lib/stores';
	let test = 'hola';
</script>

<h1>dashboard</h1>

<p>
	{$token}
</p>

<p>
	{$mayorista?.guid}
	{$mayorista?.username}
	{$mayorista?.nombre}
	{$mayorista?.guidCliente}
	{$mayorista?.codigoTienda}
</p>

<p>
	{test}
</p>

<button on:click={() => (test = 'click')}>boton</button>
