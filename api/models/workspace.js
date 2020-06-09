const mongoose= require('mongoose');
mongoose.plugin(require('mongoose-unique-array'));

const workspaceSchema=mongoose.Schema({
    name: {type: String, required : true},
    admin: {type: String, required : true},
    tasks: [{type:mongoose.Schema.Types.ObjectId,ref:'Tasks',unique:true}],
    users: [{type:mongoose.Schema.Types.ObjectId,ref: 'Users',unique:true}]
});

module.exports=mongoose.model('Workspace',workspaceSchema);