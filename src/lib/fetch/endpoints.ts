const apiUrl = import.meta.env.API_URL;

export const getLoginEndpoint = () => {
	return `${apiUrl}/auth`;
};

export const getMayoristaEndpoint = () => {
	return `${apiUrl}/mayorista`;
};

export const getProductosEndpoint = () => {
	return `${apiUrl}/productos`;
};
