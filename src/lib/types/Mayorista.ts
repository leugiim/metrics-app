import { z } from 'zod';

export interface Mayorista {
	guid: string;
	username: string;
}

export const mayoristaSchema = z.object({
	guid: z.string(),
	username: z.string()
});
