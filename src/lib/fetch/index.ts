import { writable } from 'svelte/store';

import { FetchMethod, ResponseStatus } from '$lib/types/enums';
import { type FetchResponse, type FetchResult, fetchResponseSchema } from '$lib/types/Fetch';
import type { ZodObject } from 'zod';

const validateResponse = <T>(
	schema: ZodObject<any>,
	response: FetchResponse<T>
): FetchResponse<T> => {
	if (!fetchResponseSchema.safeParse(response).success) {
		response.status = ResponseStatus.ERROR;
		response.message = 'Invalid response';
	}

	if (response.status === ResponseStatus.SUCCESS && !schema.safeParse(response).success) {
		response.status = ResponseStatus.ERROR;
		response.message = 'Invalid content';
	}

	if (response.status === ResponseStatus.ERROR) {
		console.error(response.message, response);
		response.content = null;
	}

	return response;
};

const fetchWithMethod = async <B, T>(
	url: string,
	method: FetchMethod,
	body?: B
): Promise<FetchResponse<T>> => {
	const response: FetchResponse<T> = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then((r) => {
			return r.json();
		})
		.catch((e) => {
			const result: FetchResponse<null> = {
				status: ResponseStatus.ERROR,
				message: e.message,
				content: null
			};
			return result;
		});
	return response;
};

export const useFetch = <B, T>(
	schema: ZodObject<any>,
	url: string,
	method: FetchMethod = FetchMethod.GET,
	body?: B
): FetchResult<T> => {
	const result: FetchResult<T> = {
		content: writable(null),
		message: writable(''),
		status: writable(ResponseStatus.PENDING)
	};

	fetchWithMethod<B, T>(url, method, body).then((response) => {
		// TODO: descomentar cuando se elimine el todo que hay a continuación y funcione la api
		// response = validateResponse(schema, response);
		// result.status.set(response.status);
		// result.message.set(response.message);
		// result.content.set(response.content);

		// TODO: hardcodeado hasta que funcionen los fetch que hagamos la api
		result.status.set(ResponseStatus.SUCCESS);
		result.message.set('');
		result.content.set({
			id: 'id-aleatorio',
			nombre: 'Miguel',
			apellido: 'Rodríguez'
		});
	});

	return result;
};
