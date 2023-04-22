const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const getLoginEndpoint = () => {
	return `${apiUrl}/auth`;
};

export const getUserEndpoint = () => {
	return `${apiUrl}/user`;
};

export const getProductosEndpoint = () => {
	return `${apiUrl}/productos`;
};
