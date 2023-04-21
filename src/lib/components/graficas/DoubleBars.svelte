<script lang="ts">
	import { chart } from 'svelte-apexcharts';
	import type { ApexOptions } from 'apexcharts';

	export let titulo: string;
	export let tituloIzquierda: string;
	export let tituloDerecha: string;
	export let data: [string, number, number][];
	let options: ApexOptions = {};

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
				name: tituloDerecha,
				data: data.map((v) => v[1])
			},
			{
				name: tituloIzquierda,
				data: data.map((v) => v[2])
			}
		],
		dataLabels: {
			formatter: function (val: number): string {
				return Math.abs(val).toString();
			},
			style: {
				colors: ['#5C3D46', '#99BFAA']
			}
		},
		colors: ['#99BFAA', '#5C3D46'],
		chart: {
			type: 'bar',
			height: data.length * 40,
			stacked: true,
			toolbar: {
				show: false
			}
		},
		plotOptions: {
			bar: {
				horizontal: true
			}
		},
		tooltip: {
			y: {
				formatter: function (val: number): string {
					return Math.abs(val).toString();
				}
			}
		},
		xaxis: {
			categories: data.map((v) => v[0])
		}
	};
</script>

{#if data}
	<div use:chart={options} />
{/if}
