import { getCompanyEndpoint, getCreateCompanyEndpoint } from '$lib/fetch/endpoints';
import { useFetch } from '$lib/fetch';
import { type Company, companySchema, type Metric } from '$lib/types/Company';
import { FetchMethod, type FetchResult } from '$lib/types/Fetch';
import { validarToken } from '$lib/utils/validations';
import type { BearerToken } from '$lib/types/Auth';

const parseCompany = (obj: Company): Company => {
	const metricsTypes = Object.keys(obj.metrics ?? {});

	metricsTypes.forEach((metricType) => {
		obj.metrics[metricType] =
			obj.metrics[metricType].map((metric) => {
				const metricResult: Metric = {
					date: new Date(metric.date),
					description: metric.description
				};
				return metricResult;
			}) ?? [];
	});

	return obj;
};

export const useFetchCompany = (
	fetchResult: FetchResult<Company>,
	token: BearerToken,
	companyName: string
) => {
	if (validarToken(fetchResult, token)) {
		useFetch<Company>(
			fetchResult,
			{
				schema: companySchema,
				url: getCompanyEndpoint(companyName),
				headers: {
					Authorization: token
				}
			},
			parseCompany
		);
	}
};

export const useFetchCreateCompany = (
	fetchResult: FetchResult<Company>,
	token: BearerToken,
	companyName: string
) => {
	if (validarToken(fetchResult, token)) {
		useFetch<Company, { name: string }>(
			fetchResult,
			{
				schema: companySchema,
				url: getCreateCompanyEndpoint(),
				method: FetchMethod.POST,
				headers: {
					Authorization: token
				},
				body: {
					name: companyName
				}
			},
			parseCompany
		);
	}
};
