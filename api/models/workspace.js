const mongoose= require('mongoose');


const workspaceSchema=mongoose.Schema({
    name: String,
    admin: String,
    tasks: [{type:mongoose.Schema.Types.ObjectId,ref:'Tasks',}],
    users: [{type:mongoose.Schema.Types.ObjectId,ref: 'Users',}],
});

module.exports=mongoose.model('Workspace',workspaceSchema);