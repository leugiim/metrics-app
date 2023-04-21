<script lang="ts">
	import { chart } from 'svelte-apexcharts';
	import type { ApexOptions } from 'apexcharts';

	export let titulo: string;
	export let data: [string, number][];
	export let ordenar: boolean;
	let options: ApexOptions = {};

	$: if (ordenar) data.sort((a, b) => b[1] - a[1]);
	$: titles = Object.keys(Object.fromEntries(data));
	$: values = Object.values(Object.fromEntries(data));
	$: options = {
		title: {
			text: titulo,
			align: 'center',
			style: {
				color: '#5C3D46'
			}
		},
		series: [
			{
				name: titulo,
				data: values
			}
		],
		dataLabels: {
			style: {
				colors: ['#5C3D46']
			}
		},
		colors: ['#99BFAA'],
		chart: {
			type: 'bar',
			height: values.length * 40,
			toolbar: {
				show: false
			}
		},
		plotOptions: {
			bar: {
				horizontal: true
			}
		},
		xaxis: {
			categories: titles
		}
	};
</script>

{#if titles && values}
	<div use:chart={options} />
{/if}
