const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.SchemaType.ObjectId,
    name: String,
    username: String,
    email: String 
});

module.exports = mongoose.model('User', userSchema);