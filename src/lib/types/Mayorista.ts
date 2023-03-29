import { z } from 'zod';

export interface Mayorista {
	guid: string;
	username: string;
	nombre: string;
	guidCliente: string;
	codigoTienda: string | null;
}

export const mayoristaSchema = z.object({
	guid: z.string(),
	username: z.string(),
	nombre: z.string(),
	guidCliente: z.string(),
	codigoTienda: z.string().nullable()
});
