import type { Writable } from 'svelte/store';
import { z } from 'zod';
import type { ResponseStatus } from './enums';

export interface FetchResponse<T> {
	status: ResponseStatus;
	message: string;
	content: T | null;
}

export interface FetchResult<T> {
	status: Writable<ResponseStatus>;
	message: Writable<string>;
	content: Writable<T | null>;
}

export const fetchResponseSchema = z.object({
	status: z.string(),
	message: z.string(),
	content: z.any().optional()
});
