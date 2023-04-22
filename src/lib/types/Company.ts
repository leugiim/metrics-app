import { z } from 'zod';

export interface Company {
	name: string;
	metrics: { [key: string]: Metric[] };
}

export interface Metric {
	date: Date;
	description: string;
}

export const companySchema = z.object({
	name: z.string(),
	metrics: z.record(
		z.array(
			z.object({
				date: z.date(),
				description: z.string()
			})
		)
	)
});
