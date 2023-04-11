import { z } from 'zod';

export interface Via {
	direccion: string;
}

export interface Direccion {
	_id: string;
	direccion: string;
	numero: number;
	bis: string;
	bloque_de_la_finca: string;
	identificador_finca: string;
	letra_finca: string;
	escalera: string;
	planta: number;
	mano1: string;
	mano2: string;
	codigo_olt: string;
	codigo_cto: string;
}

export const viaSchema = z.object({
	direccion: z.string()
});

export const direccionSchema = z.object({
	_id: z.string(),
	direccion: z.string(),
	numero: z.number(),
	bis: z.string(),
	bloque_de_la_finca: z.string(),
	identificador_finca: z.string(),
	letra_finca: z.string(),
	escalera: z.string(),
	planta: z.number(),
	mano1: z.string(),
	mano2: z.string(),
	codigo_olt: z.string(),
	codigo_cto: z.string()
});
