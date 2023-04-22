import { getCompanyEndpoint } from '$lib/fetch/endpoints';
import { useFetch } from '$lib/fetch';
import { type Company, companySchema, type Metric } from '$lib/types/Company';
import type { FetchResult } from '$lib/types/Fetch';
import { validarToken } from '$lib/utils/validations';
import type { BearerToken } from '$lib/types/Auth';

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
			(obj: Company): Company => {
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
			}
		);
	}
};
