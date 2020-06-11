const userDefaultState = {
    workspaces: [], // all the workspace of the user which stores tasks and users as id
    currentWorkspaceIndex: 0,
    todoTasks: [],
    pendingTasks: [],
    doneTasks: []
}


const userReducer = (state = userDefaultState, action) => {
    switch (action.type) {

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

        case 'SET_CURRENT_WORKSPACE_INDEX':
            return {
                ...state,
                currentWorkspaceIndex: action.index
            }
        case 'SET_TODO_TASKS':
            return {
                ...state,
                todoTasks: action.todoTasks
            }
        case 'SET_PENDING_TASKS':
            return {
                ...state,
                pendingTasks: action.pendingTasks
            }
        case 'SET_DONE_TASKS':
            return {
                ...state,
                doneTasks: action.doneTasks
            }
        //     case 'ADD_TODO_TASK':
        //     return {
        //         ...state,
                // // todoTasks: [...state.todoTasks ,action.todoTask]
        //     }
        // case 'ADD_PENDING_TASK':
        //     return {
        //         ...state,
        //         pendingTasks: [...state.pendingTasks ,action.pendingTask]
        //     }
        // case 'ADD_DONE_TASK':
        //     return {
        //         ...state,
        //         pendingTasks: [...state.doneTasks ,action.doneTask]
        //     }

        default:
            return state;
    }
}

export default userReducer;