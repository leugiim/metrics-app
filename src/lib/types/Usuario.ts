import { z } from 'zod';

export interface Usuario {
	id: string;
	nombre: string;
	apellido: string;
}

export const usuarioSchema = z.object({
	id: z.string(),
	nombre: z.string(),
	apellido: z.string()
});
