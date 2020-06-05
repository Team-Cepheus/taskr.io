mongoose=require('mongoose');


const workspaceSchema=mongoose.Schema({
    name: String,
    admin: String,
    tasks: ["String"],
    users: ["String",]
});

module.exports=mongoose.model('Workspace',workspaceSchema);