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

// export const addTodoTask = (todoTask) => ({
//     type: 'ADD_TODO_TASK',
//     todoTask
// });

// export const addPendingTask = (pendingTask) => ({
//     type: 'ADD_PENDING_TASK',
//     pendingTask
// });

// export const addDoneTask = (doneTask) => ({
//     type: 'ADD_DONE_TASK',
//     doneTask
// });

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => ({
    type: 'DRAG_HAPPENED',
    payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId
    }
});