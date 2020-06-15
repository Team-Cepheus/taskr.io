const localStorageData = window.localStorage.getItem('auth');

const authDefaultState = {
    authenticated: false,
    authData: localStorageData ? JSON.parse(localStorageData) : '',
}

const authReducer = (state = authDefaultState, action) => {
    switch(action.type) {
        case 'AUTHORIZE':
            return {
                ...state,
                authenticated: true
            }
    
        case 'UNAUTHORIZE':
            return {
                ...state,
                authenticated: false
            }
        case 'SET_AUTH_DATA':
            return {
                ...state,
                authData: action.authData
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }

        default: 
            return state
    }
}

export default authReducer;