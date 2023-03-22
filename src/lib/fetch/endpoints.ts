const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const getLoginEndpoint = () => {
	return `${apiUrl}/auth`;
};

export const getMayoristaEndpoint = () => {
	return `${apiUrl}/mayorista`;
};
