import type { BearerToken } from '$lib/types/Auth';
import { FetchStatus, type FetchResult } from '$lib/types/Fetch';

export const validarToken = <T>(fetchResult: FetchResult<T>, token: BearerToken): boolean => {
	if (!token) {
		fetchResult.status.set(FetchStatus.SUCCESS);
		fetchResult.message.set('El usuario no está logueado');
		fetchResult.content.set(null);
	}

	return !!token;
};
