export const setWorkspaces = (workspaces) => ({
    type: 'SET_WORKSPACES',
    workspaces
});

export const addWorkspace = (workspace) => ({
    type: 'ADD_WORKSPACE',
    workspace
});

export const setCurrentWorkspace = (index) => ({
    type: 'SET_CURRENT_WORKSPACE',
    index
});