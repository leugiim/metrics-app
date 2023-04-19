import { getProductosEndpoint } from '$lib/fetch/endpoints';
import { useFetch } from '$lib/fetch';
import { type Producto, productoSchema } from '$lib/types/Producto';
import type { FetchResult } from '$lib/types/Fetch';
import { validarToken } from '$lib/utils/validations';
import type { BearerToken } from '$lib/types/Auth';

export const useFetchProductos = (fetchResult: FetchResult<Producto[]>, token: BearerToken) => {
	if (validarToken(fetchResult, token)) {
		useFetch<Producto[]>(fetchResult, {
			schema: productoSchema,
			url: getProductosEndpoint(),
			headers: {
				Authorization: token
			}
		});
	}
};
