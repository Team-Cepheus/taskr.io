const workspaceRouter = require('express').Router();
const Workspace = require('../models/workspace');

// Get all workspaces
workspaceRouter.get('/', async(req, res) => {
  const workspaces = await Workspace.find({})
  res.json(workspaces.map(workspace => workspace.toJSON()))
});


// Get workspace with a particular id
workspaceRouter.get(':/id', async (req,res) => {
  const workspace = await Workspace.findById(req.params.id)
  if (workspace) {
    res.json(workspace.toJSON())
  } else {
    res.status(404).end()
  }
});

// Adding a new workspace with POST req
workspaceRouter.post('/', async (request, response) => {
  const body = request.body
  const workspace = new Workspace({
    name: body.name,
    admin: body.admin,
    users: body.users,
    tasks: body.tasks
  })

  const savedWorkspace = await workspace.save()
  response.json(savedWorkspace.toJSON())
})

// PUT request
workspaceRouter.put('/:id', async (request, response) => {
  const body = request.body

  const workspace = new Workspace({
    name: body.name,
    admin: body.admin,
    users: body.users,
    tasks: body.tasks
  })

  const updatedWorkspace = await Workspace.findByIdAndUpdate(request.params.id, workspace, { new: true })
  response.json(updatedWorkspace.toJSON())
})


// Deleting a workspace given an ID
workspaceRouter.delete('/:id', async (request, response) => {
  await Workspace.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = workspaceRouter;