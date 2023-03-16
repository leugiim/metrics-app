import { z } from 'zod';

export interface GeneralResponse<T> {
	status: string;
	message: string;
	content: T;
}

export const generalResponseSchema = z.object({
	status: z.string(),
	message: z.string(),
	content: z.any().optional()
});
