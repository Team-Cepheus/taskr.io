export const setWorkspaces = (workspaces) => ({
    type: 'SET_WORKSPACES',
    workspaces
});

export const addWorkspace = (workspace) => ({
    type: 'ADD_WORKSPACE',
    workspace
});

export const setCurrentWorkspaceIndex = (index) => ({
    type: 'SET_CURRENT_WORKSPACE_INDEX',
    index
});

export const setTodoTasks = (todoTasks) => ({
    type: 'SET_TODO_TASKS',
    todoTasks
});

export const setPendingTasks = (pendingTasks) => ({
    type: 'SET_PENDING_TASKS',
    pendingTasks
});

export const setDoneTasks = (doneTasks) => ({
    type: 'SET_DONE_TASKS',
    doneTasks
});

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId, token
) => ({
    type: 'DRAG_HAPPENED',
    payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        token
    }
});

export const setError = (error) => ({
    type: 'SET_ERROR',
    error
});