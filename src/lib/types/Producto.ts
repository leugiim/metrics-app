import { z } from 'zod';

export interface Producto {
	product: string;
	dateUp: string;
	dateDown: string;
	serviceType: string;
	guidService: string;
}

export interface ProductsCount {
	[key: string]: number;
}

export const productoSchema = z.object({
	product: z.string(),
	dateUp: z.string(),
	dateDown: z.string(),
	serviceType: z.string(),
	guidService: z.string()
});
