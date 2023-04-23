<script lang="ts">
	import { chart } from 'svelte-apexcharts';
	import type { ApexOptions } from 'apexcharts';
	import type { Graphic } from '$lib/types/Graphic';

	export let graphic: Graphic;
	let options: ApexOptions = {};

	$: options = {
		series: graphic.values,
		chart: {
			height: 350,
			type: 'line',
			dropShadow: {
				enabled: true,
				color: '#000',
				top: 18,
				left: 7,
				blur: 10,
				opacity: 0.2
			},
			zoom: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AB47BC'],
		dataLabels: {
			enabled: true
		},
		stroke: {
			curve: 'smooth'
		},
		title: {
			text: graphic.mainTitle,
			align: 'center'
		},
		grid: {
			borderColor: '#e7e7e7',
			row: {
				colors: ['#f3f3f3', 'transparent'],
				opacity: 0.5
			}
		},
		markers: {
			size: 1
		},
		xaxis: {
			categories: graphic.horizontalTitles
		},
		legend: {
			position: 'top',
			horizontalAlign: 'left',
			floating: true,
			offsetY: -25,
			offsetX: -5
		}
	};
</script>

{#if options}
	<div use:chart={options} />
{/if}
