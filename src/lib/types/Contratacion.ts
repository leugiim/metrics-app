export interface Contratacion {
	direccion: string;
}

export const getInitialContratacion = (): Contratacion => {
	const result: Contratacion = {
		direccion: ''
	};
	return result;
};
