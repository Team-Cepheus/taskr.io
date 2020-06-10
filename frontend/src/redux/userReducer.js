const userDefaultState = {
    workspaces: [],
    currentWorkspace: 0
}


const userReducer = (state = userDefaultState, action) => {
    switch(action.type) {

        case 'SET_WORKSPACES':
            return {
                ...state,
                workspaces: action.workspaces
            }

        case 'ADD_WORKSPACE':
            return {
                ...state,
                workspaces: [...state.workspaces, action.workspace]
            }

        case 'SET_CURRENT_WORKSPACE':
            return {
                ...state,
                currentWorkspace: action.index
            }
        default:
            return state;
    }
}

export default userReducer;