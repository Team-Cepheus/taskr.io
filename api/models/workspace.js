const mongoose= require('mongoose');
mongoose.plugin(require('mongoose-unique-array'));

const workspaceSchema=mongoose.Schema({
    name: {type: String, required : true},
    admin: {type: String, required : true},
    tasks: [{type:mongoose.Schema.Types.ObjectId,ref:'Tasks'}],
    users: [{type:mongoose.Schema.Types.ObjectId,ref: 'Users'}]
});

module.exports=mongoose.model('Workspace',workspaceSchema);