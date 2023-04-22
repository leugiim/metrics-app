<script lang="ts">
	import type { Graphic } from '$lib/types/Graphic';
	import { parseDate, type Company } from '$lib/types/Company';
	import { Card } from 'flowbite-svelte';
	import Line from '$lib/components/graficas/Line.svelte';

	export let company: Company;

	const getUniqueDates = (company: Company): string[] => {
		const uniqueDates = new Set<string>();
		Object.values(company.metrics).forEach((metricArray) => {
			metricArray.forEach((metric) => {
				const date = new Date(metric.date);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				uniqueDates.add(`${year}-${month}-${day}`);
			});
		});
		return [...uniqueDates];
	};

	const getMetricsByColumns = (company: Company, uniqueColumns: string[]) => {
		const metricsByDate: { [key: string]: { [key: string]: number } } = {};

		Object.keys(company.metrics).forEach((key) => {
			metricsByDate[key] = {};
			uniqueColumns.forEach((date) => {
				metricsByDate[key][date] = 0;
			});
		});

		Object.keys(company.metrics).forEach((key) => {
			company.metrics[key].forEach((metric) => {
				const column = uniqueColumns.find((col) => parseDate(metric.date).includes(col));
				if (column) metricsByDate[key][column] += 1;
			});
		});

		const data = Object.keys(metricsByDate).map((key) => ({
			name: key.toUpperCase(),
			data: uniqueColumns.map((date) => metricsByDate[key][date])
		}));

		return data;
	};

	const calcColumns = (): string[] => {
		let columns: string[] = uniqueDates;

		if (selectedHour.length > 0) {
			columns = minutes.map((minute) => {
				return `${selectedDate} ${selectedHour}:${String(minute).padStart(2, '0')}`;
			});
		} else if (selectedDate.length > 0) {
			columns = hours.map((hour) => {
				return `${selectedDate} ${String(hour).padStart(2, '0')}`;
			});
		}

		return columns;
	};

	let minutes = Array.from({ length: 60 }, (_, i) => i + 1);
	let hours = Array.from({ length: 24 }, (_, i) => i + 1);
	let uniqueDates: string[] = getUniqueDates(company);
	let selectedDate = '';
	let selectedHour = '';
	let graphic: Graphic = {
		mainTitle: 'Metrics',
		horizontalTitles: uniqueDates,
		values: getMetricsByColumns(company, getUniqueDates(company))
	};

	const handleGraphic = () => {
		if (selectedDate.length === 0) selectedHour = '';

		const columns = calcColumns();
		graphic.horizontalTitles = columns;
		graphic.values = getMetricsByColumns(company, columns);
	};
</script>

<Card size="xl" class="relative m-20 !max-w-none">
	<div class="absolute right-10 top-3 z-10 w-auto">
		<span class="font-bold">Filter: </span>
		<select bind:value={selectedDate} on:change={handleGraphic}>
			<option value="">Day</option>
			{#each uniqueDates as date}
				<option value={date}>{date}</option>
			{/each}
		</select>
		<select bind:value={selectedHour} on:change={handleGraphic}>
			<option value="">Hour</option>
			{#each hours as hour}
				<option value={hour.toString().padStart(2, '0')}>{hour.toString().padStart(2, '0')}</option>
			{/each}
		</select>
	</div>
	<Line {graphic} />
</Card>
