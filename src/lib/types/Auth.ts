import { z } from 'zod';

export type Token = string | null;
export type BasicToken = `Basic ${string}` | null;
export type BearerToken = `Bearer ${string}` | null;

export const tokenSchema = z.string();
export const basicTokenSchema = z.string();
export const bearerTokenSchema = z.string();
