import { number, z } from 'zod';

export interface Producto {
	guidService: string;
	serviceType: string;
	product: string;
	statusId: number;
	status: string;
	dateUp: string;
	dateDown: string;
}

export interface ProductsCount {
	[key: string]: number;
}

export const productoSchema = z.object({
	guidService: z.string(),
	serviceType: z.string(),
	product: z.string(),
	statusId: z.number(),
	status: z.string(),
	dateUp: z.string(),
	dateDown: z.string()
});

export const getDateValue = (dateString: string): Date => {
	if (dateString) {
		return new Date(dateString);
	}
	// Si dateString es una cadena vacía, devuelve una fecha "infinita"
	return new Date('9999-12-31');
};

export const orderByDateUpDesc = (a: Producto, b: Producto): number => {
	const fechaA = getDateValue(a.dateUp);
	const fechaB = getDateValue(b.dateUp);

	return fechaB.getTime() - fechaA.getTime();
};

export const filtrarAltasYBajas = (
	productos: Producto[],
	anio: number
): [string, number, number][] => {
	const altasBajasPorMes = new Map<string, [string, number, number]>();
	for (let mes = 0; mes < 12; mes++) {
		const anioMes = `${anio}-${mes + 1 < 10 ? '0' : ''}${mes + 1}`;
		altasBajasPorMes.set(anioMes, [anioMes, 0, 0]);
	}

	productos.forEach((producto) => {
		const fechaUp = getDateValue(producto.dateUp);
		const fechaDown = getDateValue(producto.dateDown);

		if (fechaUp.getFullYear() === anio) {
			const mes = fechaUp.getMonth();
			const anioMes = `${anio}-${mes + 1 < 10 ? '0' : ''}${mes + 1}`;
			const [_, altas, bajas] = altasBajasPorMes.get(anioMes)!;
			altasBajasPorMes.set(anioMes, [anioMes, altas + 1, bajas]);
		}

		if (fechaDown.getFullYear() === anio) {
			const mes = fechaDown.getMonth();
			const anioMes = `${anio}-${mes + 1 < 10 ? '0' : ''}${mes + 1}`;
			const [_, altas, bajas] = altasBajasPorMes.get(anioMes)!;
			altasBajasPorMes.set(anioMes, [anioMes, altas, bajas - 1]);
		}
	});

	return Array.from(altasBajasPorMes.values());
};

export const obtenerAnios = (productos: Producto[]): number[] => {
	const aniosSet = productos.reduce((set, producto) => {
		const fechaUp = getDateValue(producto.dateUp);
		const fechaDown = getDateValue(producto.dateDown);

		if (fechaUp) set.add(fechaUp.getFullYear());
		if (fechaDown && fechaDown.getFullYear() !== 9999) set.add(fechaDown.getFullYear());

		return set;
	}, new Set<number>());

	return Array.from(aniosSet);
};

export const getStatusColor = (
	estado: number
): 'red' | 'yellow' | 'green' | 'indigo' | 'purple' | 'pink' | 'blue' | 'dark' | undefined => {
	const colors: Record<
		number,
		'red' | 'yellow' | 'green' | 'indigo' | 'purple' | 'pink' | 'blue' | 'dark' | undefined
	> = {
		1: 'green', // Activo
		2: 'red', // Baja
		3: 'dark', // Anulado
		4: 'yellow', // Pendiente
		5: 'indigo', // En trámite
		6: 'purple', // Suspendido
		7: 'pink' // Moroso
	};

	return colors[estado];
};
