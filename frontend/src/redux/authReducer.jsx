const authReducerDefaultState = {
    authenticated: false,
    user: null,
    isLoading: null
}

const authReducer = (state = authReducerDefaultState, action) => {
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
                user: action.authData
            }

        
        default: 
            return state
    }
}

export default authReducer;