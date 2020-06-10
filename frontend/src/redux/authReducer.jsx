const authDefaultState = {
    authenticated: false,
    user: null
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
                user: action.authData
            }

        default: 
            return state
    }
}

export default authReducer;