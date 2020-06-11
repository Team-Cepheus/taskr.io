
export const authorize = () => ({
    type: 'AUTHORIZE'
});
export const unauthorize = () => ({
    type: 'UNAUTHORIZE'
});
export const setAuthData = (data) => ({
    type: 'SET_AUTH_DATA',
    authData: data,
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    isLoading: loading
});
