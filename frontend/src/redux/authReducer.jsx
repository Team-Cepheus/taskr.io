const authReducerDefaultState = {
    authenticated: false,
    user: null,
    isLoading: null
}


const authReducer = (state = authReducerDefaultState, action) => {
    switch(action.type) {
        case 'LOGIN':
        
        case 'LOGOUT':
        
        default: 
            return state
    }
}