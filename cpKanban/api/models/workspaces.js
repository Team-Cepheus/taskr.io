mongoose=require('mongoose');


const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});


// This will remove the auto generated Mongo Object Reference ID's from being displayed 
workspaceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports=mongoose.model('Workspace',workspaceSchema);
