import {
	getCoberturaCalleEndpoint,
	getCoberturaCalleExactaEndpoint,
	getTrazadoOcuparEndpoint,
	getTrazadoReservarEndpoint
} from '$lib/fetch/endpoints';
import { useFetch } from '$lib/fetch';
import { FetchMethod, type FetchResult } from '$lib/types/Fetch';
import { direccionSchema, type Via, type Direccion, viaSchema } from '$lib/types/Direccion';
import { splitterSchema, type Splitter } from '$lib/types/Splitter';
import type { Trazado } from '$lib/types/Trazado';

export const useFetchBuscarVia = (fetchResult: FetchResult<Via[]>, calle: string) => {
	useFetch<Via[]>(fetchResult, {
		schema: viaSchema,
		url: getCoberturaCalleEndpoint(calle)
	});
};

export const useFetchBuscarDireccion = (fetchResult: FetchResult<Direccion[]>, calle: string) => {
	useFetch<Direccion[]>(fetchResult, {
		schema: direccionSchema,
		url: getCoberturaCalleExactaEndpoint(calle)
	});
};

export const useFetchReservarTrazado = (fetchResult: FetchResult<Splitter>, body: Trazado) => {
	useFetch<Splitter, Trazado>(fetchResult, {
		schema: splitterSchema,
		url: getTrazadoReservarEndpoint(),
		method: FetchMethod.PUT,
		body: body
	});
};

export const useFetchOcuparTrazado = (fetchResult: FetchResult<Splitter>, body: Trazado) => {
	useFetch<Splitter, Trazado>(fetchResult, {
		schema: splitterSchema,
		url: getTrazadoOcuparEndpoint(),
		method: FetchMethod.PUT,
		body: body
	});
};
