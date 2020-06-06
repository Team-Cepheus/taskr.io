const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({

    name: {required:true,type:String},
    username: {
        required:true,
        type:String,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6 || value.toLowerCase().includes('password')) {
                throw Error('Password should be 6 characters or more and should not contain the word password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'keySecret')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    console.log(user);
    if (!user) {
        throw new Error('Login failed')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Login failed')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password.plaintext, 8)
        }
});

module.exports = mongoose.model('Users', userSchema);