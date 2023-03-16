import { useFetch } from '$lib/fetch';
import { type Usuario, usuarioSchema } from '$lib/types/Usuario';

export function useFetchUsuario() {
	return useFetch<null, Usuario>(usuarioSchema, 'https://pokeapi.co/api/v2/pokemon/ditto');
}
