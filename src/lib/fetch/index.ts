import { writable } from 'svelte/store';

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
		response.message = 'Invalid response';
	}

	if (response.status === FetchStatus.SUCCESS && !schema.safeParse(response.content).success) {
		response.status = FetchStatus.ERROR;
		response.message = 'Invalid content';
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
			return r.json();
		})
		.catch((e) => {
			const result: FetchResponse<null> = {
				status: FetchStatus.ERROR,
				message: e.message,
				content: null
			};
			return result;
		});
	return response;
};

export const useFetch = <T, B = null>(params: FetchParams<B>): FetchResult<T> => {
	const { schema, url, method, headers, body } = params;

	const result: FetchResult<T> = {
		content: writable(null),
		message: writable(''),
		status: writable(FetchStatus.PENDING)
	};

	fetchWithMethod<T, B>(url, method ?? FetchMethod.GET, headers ?? {}, body).then((response) => {
		response = validateResponse(schema, response);
		result.status.set(response.status);
		result.message.set(response.message);
		result.content.set(response.content);
	});

	return result;
};
