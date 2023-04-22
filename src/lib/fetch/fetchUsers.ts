import { getLoginEndpoint, getUserEndpoint } from '$lib/fetch/endpoints';
import { useFetch } from '$lib/fetch';
import { type Token, tokenSchema, type BasicToken, type BearerToken } from '$lib/types/Auth';
import { type User, userSchema } from '$lib/types/User';
import type { FetchResult } from '$lib/types/Fetch';
import { validarToken } from '$lib/utils/validations';

export const useFetchLogin = (fetchResult: FetchResult<Token>, user: string, pass: string) => {
	const credentials = `${user}:${pass}`;
	const basicToken: BasicToken = `Basic ${btoa(credentials)}`;

	return useFetchLoginByToken(fetchResult, basicToken);
};

export const useFetchLoginByToken = (fetchResult: FetchResult<Token>, token: BasicToken) => {
	return useFetch<Token>(fetchResult, {
		schema: tokenSchema,
		url: getLoginEndpoint(),
		headers: {
			Authorization: token
		}
	});
};

export const useFetchUser = (fetchResult: FetchResult<User>, token: BearerToken) => {
	if (validarToken(fetchResult, token)) {
		useFetch<User>(fetchResult, {
			schema: userSchema,
			url: getUserEndpoint(),
			headers: {
				Authorization: token
			}
		});
	}
};
