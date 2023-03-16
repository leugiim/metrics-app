import { type GeneralResponse, generalResponseSchema } from '$lib/types/GeneralResponse';

enum ResponseStatus {
	SUCCESS = 'success',
	ERROR = 'error'
}

const isValidStatus = <T>(response: GeneralResponse<T>): boolean => {
	if (!generalResponseSchema.safeParse(response).success) {
		console.error('Invalid response', response);
		return false;
	}

	if (response.status !== ResponseStatus.SUCCESS) {
		console.error(response.status, response.message);
		return false;
	}

	return true;
};

const getContent = <T>(response: GeneralResponse<T>) => {
	if (!isValidStatus(response)) return null;
	return response.content;
};

const fetchWithMethod = async <B, T>(url: string, method: string, body?: B): Promise<T | null> => {
	const response: GeneralResponse<T> = await fetch(url, {
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
			const result: GeneralResponse<null> = {
				status: ResponseStatus.ERROR,
				message: e.message,
				content: null
			};
			return result;
		});
	return getContent(response);
};

export const get = async <T>(url: string): Promise<T | null> => {
	return fetchWithMethod<null, T>(url, 'GET');
};

export const post = async <B, T>(url: string, body: B): Promise<T | null> => {
	return fetchWithMethod<B, T>(url, 'POST', body);
};

export const put = async <B, T>(url: string, body: B): Promise<T | null> => {
	return fetchWithMethod<B, T>(url, 'PUT', body);
};

export const del = async <T>(url: string): Promise<T | null> => {
	return fetchWithMethod<null, T>(url, 'DELETE');
};
