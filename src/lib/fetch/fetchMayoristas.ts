import { getLoginEndpoint, getMayoristaEndpoint } from '$lib/fetch/endpoints';
import { useFetch } from '$lib/fetch';
import { type Token, tokenSchema, type BasicToken, type BearerToken } from '$lib/types/Auth';
import { type Mayorista, mayoristaSchema } from '$lib/types/Mayorista';
import { FetchStatus, type FetchResult } from '$lib/types/Fetch';

export const useFetchLoginMayorista = (
	fetchResult: FetchResult<Token>,
	user: string,
	pass: string
) => {
	const credentials = `${user}:${pass}`;
	const basicToken: BasicToken = `Basic ${btoa(credentials)}`;

	console.log(basicToken);

	return useFetchLoginMayoristaByToken(fetchResult, basicToken);
};

export const useFetchLoginMayoristaByToken = (
	fetchResult: FetchResult<Token>,
	token: BasicToken
) => {
	return useFetch<Token>(fetchResult, {
		schema: tokenSchema,
		url: getLoginEndpoint(),
		headers: {
			Authorization: token
		}
	});
};

export const useFetchMayorista = (fetchResult: FetchResult<Mayorista>, token: BearerToken) => {
	if (!token) {
		fetchResult.status.set(FetchStatus.SUCCESS);
		fetchResult.message.set('El usuario no está logueado');
		fetchResult.content.set(null);
	}

	useFetch<Mayorista>(fetchResult, {
		schema: mayoristaSchema,
		url: getMayoristaEndpoint(),
		headers: {
			Authorization: token
		}
	});
};
