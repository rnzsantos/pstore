const getToken = (): string => localStorage.getItem('token') || '';

export default getToken;
