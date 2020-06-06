const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {required:true,type:String},
    description: String,
    status: {required:true,type:String},
    createdOn: String, //Javascript timestamp
    assignedTo: String,
    modified: {type:Boolean, default:false}
});

module.exports = mongoose.model('Tasks',taskSchema);