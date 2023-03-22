import { getLoginEndpoint, getMayoristaEndpoint } from '$lib/fetch/endpoints';
import { useFetch } from '$lib/fetch';
import { type Token, tokenSchema, type BasicToken, type BearerToken } from '$lib/types/Auth';
import { type Mayorista, mayoristaSchema } from '$lib/types/Mayorista';
import { writable } from 'svelte/store';
import { FetchStatus } from '$lib/types/Fetch';

export const useFetchLoginMayorista = (user: string, pass: string) => {
	const credentials = `${user}:${pass}`;
	const basicToken: BasicToken = `Basic ${btoa(credentials)}`;

	return useFetchLoginMayoristaByToken(basicToken);
};

export const useFetchLoginMayoristaByToken = (token: BasicToken) => {
	return useFetch<Token>({
		schema: tokenSchema,
		url: getLoginEndpoint(),
		headers: {
			Authorization: token
		}
	});
};

export const useFetchMayorista = (token: BearerToken) => {
	if (!token) {
		return {
			content: writable(null),
			message: writable('El usuario no está logueado'),
			status: writable(FetchStatus.SUCCESS)
		};
	}

	return useFetch<Mayorista>({
		schema: mayoristaSchema,
		url: getMayoristaEndpoint(),
		headers: {
			Authorization: token
		}
	});
};
