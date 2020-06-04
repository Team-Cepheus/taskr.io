const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {required:true,type:String},
    username: {
        required:true,
        type:String,
        unique:true,
    },
    email: {
        required:true,
        type:String,
        unique:true
    } 
});

module.exports = mongoose.model('User', userSchema);