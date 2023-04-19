import { z } from 'zod';

export interface Via {
	direccion: string;
}

export interface Direccion {
	_id: string;
	direccion: string;
	numero: string | number;
	bis: string | number;
	bloque_de_la_finca: string | number | null;
	identificador_finca: string | number | null;
	letra_finca: string | number | null;
	escalera: string | number | null;
	planta: string | number | null;
	mano1: string | number | null;
	mano2: string | number | null;
	codigo_olt: string;
	codigo_cto: string;
}

export const viaSchema = z.object({
	direccion: z.string()
});

export const direccionSchema = z.object({
	_id: z.string(),
	direccion: z.string(),
	numero: z.union([z.string(), z.number()]),
	bis: z.union([z.string(), z.number()]),
	bloque_de_la_finca: z.union([z.string(), z.number(), z.null()]),
	identificador_finca: z.union([z.string(), z.number(), z.null()]),
	letra_finca: z.union([z.string(), z.number(), z.null()]),
	escalera: z.union([z.string(), z.number(), z.null()]),
	planta: z.union([z.string(), z.number(), z.null()]),
	mano1: z.union([z.string(), z.number(), z.null()]),
	mano2: z.union([z.string(), z.number(), z.null()]),
	codigo_olt: z.string(),
	codigo_cto: z.string()
});
