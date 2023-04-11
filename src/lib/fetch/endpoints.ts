const apiMayoristaUrl = import.meta.env.VITE_API_BASE_URL;
const apiCallejeroUrl = import.meta.env.VITE_API_CALLEJERO_BASE_URL;

export const getLoginEndpoint = () => {
	return `${apiMayoristaUrl}/auth`;
};

export const getMayoristaEndpoint = () => {
	return `${apiMayoristaUrl}/mayorista`;
};

export const getCoberturaCalleEndpoint = (calle: string) => {
	return `${apiCallejeroUrl}/cobertura/buscar/` + encodeURIComponent(calle);
};

export const getCoberturaCalleExactaEndpoint = (calle: string) => {
	return `${apiCallejeroUrl}/cobertura/buscar/calle/` + encodeURIComponent(calle);
};

export const getTrazadoReservarEndpoint = () => {
	return `${apiCallejeroUrl}/trazado/reservar`;
};

export const getTrazadoOcuparEndpoint = () => {
	return `${apiCallejeroUrl}/trazado/ocupar`;
};
