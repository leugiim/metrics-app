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

export const parseDate = (date: Date) => {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
