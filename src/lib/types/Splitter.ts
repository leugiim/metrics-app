import { z } from 'zod';

export interface Splitter {
	_id: string;
	codigo_olt: string;
	codigo_cto: string;
	codigo_splitter: string;
	puerto_cto: number;
	estado: number;
	fecha_reservado: string;
}

export const splitterSchema = z.object({
	_id: z.string(),
	codigo_olt: z.string(),
	codigo_cto: z.string(),
	codigo_splitter: z.string(),
	puerto_cto: z.number(),
	estado: z.number(),
	fecha_reservado: z.string()
});
