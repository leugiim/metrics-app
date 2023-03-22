import { z } from 'zod';

export type Token = string;
export type BasicToken = `Basic ${string}`;
export type BearerToken = `Bearer ${string}`;

export const tokenSchema = z.string();
export const basicTokenSchema = z.string();
export const bearerTokenSchema = z.string();
