import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

import {
	type FetchResponse,
	type FetchResult,
	type FetchParams,
	type FetchSchema,
	fetchResponseSchema,
	FetchStatus,
	FetchMethod
} from '$lib/types/Fetch';

const validateResponse = <T>(schema: FetchSchema, response: FetchResponse<T>): FetchResponse<T> => {
	if (!fetchResponseSchema.safeParse(response).success) {
		response.status = FetchStatus.ERROR;
		response.httpStatus = 'RESPONSE_ERROR';
		response.message = 'Invalid response';
	}

	if (response.status === FetchStatus.SUCCESS) {
		if (Array.isArray(response.content)) {
			for (const [index, item] of response.content.entries()) {
				const validacion = schema.safeParse(item);
				if (!validacion.success) {
					response.status = FetchStatus.ERROR;
					response.httpStatus = 'RESPONSE_ERROR';
					response.message = `Invalid item in index ${index}`;
					break;
				}
			}
		} else if (!schema.safeParse(response.content).success) {
			response.status = FetchStatus.ERROR;
			response.httpStatus = 'RESPONSE_ERROR';
			response.message = 'Invalid content';
		}
	}

	if (response.status === FetchStatus.ERROR) {
		console.error(response.message, response);
		response.content = null;
	}

	return response;
};

const fetchWithMethod = async <T, B>(
	url: string,
	method: FetchMethod,
	headers: object,
	body?: B
): Promise<FetchResponse<T>> => {
	const response: FetchResponse<T> = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify(body)
	})
		.then((r) => {
			if (r.status === 403) goto('/logout');
			return r.json();
		})
		.catch((e) => {
			const result: FetchResponse<null> = {
				status: FetchStatus.ERROR,
				httpStatus: 'CATCH_ERROR',
				message: e.message,
				content: null
			};
			return result;
		});
	return response;
};

export const useFetch = <T, B = null>(
	result: FetchResult<T>,
	params: FetchParams<B>,
	parse?: (obj: T) => T
) => {
	const { schema, url, method, headers, body } = params;

	result.status.set(FetchStatus.PENDING);

	fetchWithMethod<T, B>(url, method ?? FetchMethod.GET, headers ?? {}, body).then((response) => {
		if (parse && response.content !== null) response.content = parse(response.content);
		response = validateResponse(schema, response);
		if (response.httpStatus === 'FORBIDDEN') goto('/logout');

		result.status.set(response.status);
		result.httpStatus.set(response.httpStatus);
		result.message.set(response.message ?? '');
		result.content.set(response.content);
	});
};

export const getInitialFetchResult = <T>(): FetchResult<T> => {
	const result: FetchResult<T> = {
		status: writable(FetchStatus.WAITING),
		httpStatus: writable(''),
		message: writable(''),
		content: writable(null)
	};
	return result;
};
