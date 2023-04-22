const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const getLoginEndpoint = () => {
	return `${apiUrl}/auth`;
};

export const getUserEndpoint = () => {
	return `${apiUrl}/user`;
};

export const getCompanyEndpoint = (companyName: string) => {
	return `${apiUrl}/company/${encodeURIComponent(companyName)}`;
};

export const getCreateCompanyEndpoint = () => {
	return `${apiUrl}/company/`;
};
