<script lang="ts">
	import { parseDate, type Company, type Metric } from '$lib/types/Company';
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
		TableHeadCell
	} from 'flowbite-svelte';
	import type { LinkType } from 'flowbite-svelte/dist/types';

	export let company: Company;
	export let imtesPerPage = 20;
	export let numberOfPaginationPages = 5;

	let filteredMetrics: Metric[] = [];
	let paginatedMetrics: Metric[] = [];
	let metricsTypes: string[] = [];
	let pages: LinkType[] = [];
	let numPages = 0;
	let activePage = 0;
	let pageHelper: { start: number; end: number; length: number } = { start: 0, end: 0, length: 0 };
	let search = '';
	let classesTabla = 'text-center h-10';

	$: if (company !== null || search) {
		// Filter with search
		filterMetrics();

		// Pagination
		calcPage();
	}

	const previous = () => {
		activePage = Math.max(activePage - 1, 0);
		calcPage();
	};
	const next = () => {
		activePage = Math.min(activePage + 1, numPages - 1);
		calcPage();
	};
	const handleClick = (event: Event) => {
		const text = (event.target as Element).innerHTML;
		activePage = parseInt(text) - 1;
		calcPage();
	};
	const calcPage = () => {
		paginateMetrics();
		const start = activePage * imtesPerPage;
		const end = Math.min(start + imtesPerPage, filteredMetrics.length);
		pageHelper = { start, end, length: filteredMetrics.length };
		paginatedMetrics = filteredMetrics.slice(start, end);
	};
	const paginateMetrics = () => {
		pages = [];
		numPages = Math.ceil(filteredMetrics.length / imtesPerPage);
		if (activePage >= numPages) activePage = 0;
		const startPage = Math.max(activePage - numberOfPaginationPages, 0);
		const endPage = Math.min(activePage + numberOfPaginationPages, numPages);

		for (let i = startPage; i < endPage; i++) {
			pages.push({
				name: (i + 1).toString(),
				active: i === activePage
			});
		}
	};
	const filterMetrics = () => {
		filteredMetrics = [];
		metricsTypes = Object.keys(company?.metrics ?? {});

		metricsTypes.forEach((metricType) => {
			const filteredType =
				company?.metrics[metricType].filter((metric) => {
					return (
						metricType.toLowerCase().includes(search.toLowerCase()) ||
						parseDate(metric.date).includes(search.toLowerCase()) ||
						metric.description.toLowerCase().includes(search.toLowerCase())
					);
				}) ?? [];
			filteredMetrics = filteredMetrics.concat(filteredType);
		});

		filteredMetrics = filteredMetrics.sort((a, b) => {
			return a.date > b.date ? -1 : 1;
		});
	};
</script>

<Card size="xl" class="relative m-20 !max-w-none">
	<div class="absolute top-6 right-10 z-10 text-right">
		<p>
			Visualizing from <b>{pageHelper.start}</b> to <b>{pageHelper.end}</b> of
			<b>{pageHelper.length}</b>
		</p>
		<Pagination
			{pages}
			on:click={handleClick}
			on:previous={previous}
			on:next={next}
			activeClass="text-primary bg-red-300"
		>
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
		placeholder="Find"
		hoverable={true}
		divClass="shadow-none"
		bind:inputValue={search}
	>
		<TableHead theadClass={classesTabla}>
			<TableHeadCell>Date</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each paginatedMetrics as metric}
				<TableBodyRow>
					<TableBodyCell tdClass={classesTabla}>{parseDate(metric.date)}</TableBodyCell>
					<TableBodyCell tdClass={classesTabla}>{metric.description}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</Card>
