import { writable } from 'svelte/store';

import { get } from '$lib/utils/ajax';
import { type Usuario, usuarioSchema } from '$lib/types/Usuario';

export default function useFetchUsuario() {
	const user = writable<Usuario | null>();
	const error = writable();
	const isLoading = writable<boolean>(false);

	async function fetchData() {
		isLoading.set(true);
		try {
			let response = await get<Usuario>('https://pokeapi.co/api/v2/pokemon/ditto');
			//   TODO: Validar el response con zod cuando este listo el endpoint
			if (!usuarioSchema.safeParse(response).success) {
				// throw new Error('Invalid user');
				response = {
					id: '1',
					nombre: 'Miguel',
					apellido: 'Rodríguez'
				};
			}
			user.set(response);
			error.set(null);
		} catch (err) {
			user.set(null);
			error.set(err);
		}

		// setContext('user', user);
		isLoading.set(false);
	}

	fetchData();

	return { isLoading, error, user };
}
