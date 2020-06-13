import { config } from '../config';

let token = ''
if (localStorage.getItem('auth')) {
    token = JSON.parse(localStorage.getItem('auth')).value.token
}

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
        case 'DRAG_HAPPENED':
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
            } = action.payload;
            // Movement in the same column
            if (droppableIdStart == droppableIdEnd) {
                const newTaskList = state[droppableIdStart];
                const task = newTaskList.splice(droppableIndexStart, 1)[0];
                newTaskList.splice(droppableIndexEnd, 0, task);
                return {
                    ...state,
                    droppableIdStart: newTaskList
                }
            }
            // Cross column movement 
            if (droppableIdStart != droppableIdEnd) {
                const listStart = state[droppableIdStart];
                const task = listStart.splice(droppableIndexStart, 1)[0];
                const listEnd = state[droppableIdEnd];
                listEnd.splice(droppableIndexEnd, 0, task);
                fetch(`${config.apiURL}/task/${task._id}/${droppableIdEnd.slice(0,-5)}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'

                    },
                }).then((response) => {
                    if (response.ok) {
                        console.log('status reset successfully')
                    }
                }).catch((e) => console.log(e));
                return {
                    ...state,
                    droppableIdStart: listStart,
                    droppableIdEnd: listEnd

                }

            }
            break;

        default:
            return state;
    }
}

export default userReducer;