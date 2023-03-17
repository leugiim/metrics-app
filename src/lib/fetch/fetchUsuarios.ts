import { apiUrl } from '$lib/utils/config';
import { useFetch } from '$lib/fetch';
import { type Usuario, usuarioSchema } from '$lib/types/Usuario';

export const useFetchUsuario = () => {
	return useFetch<null, Usuario>(usuarioSchema, `${apiUrl}/usuario`);
};
