import type { Writable } from 'svelte/store';
import { z, ZodString } from 'zod';
import type { ZodObject, ZodRawShape } from 'zod';

export enum FetchStatus {
	WAITING = 'WAITING',
	PENDING = 'PENDING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}

export enum FetchMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

export interface FetchResponse<T> {
	status: FetchStatus;
	httpStatus: string | number;
	message?: string;
	content: T | null;
}

export interface FetchParams<T> {
	schema: FetchSchema;
	url: string;
	method?: FetchMethod;
	headers?: object;
	body?: T;
}

export type FetchSchema = ZodObject<ZodRawShape> | ZodString;

export interface FetchResult<T> {
	status: Writable<FetchStatus>;
	httpStatus: Writable<string | number>;
	message: Writable<string>;
	content: Writable<T | null>;
}

export const fetchResponseSchema = z.object({
	status: z.string(),
	httpStatus: z.union([z.string(), z.number()]),
	message: z.string().optional(),
	content: z.any().optional()
});
