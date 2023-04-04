const mongoose = require('mongoose')
const validator = require('validator')
// const {validator} = require('express-validator')

//to hash the password and adds a random string of characters before hashing (salt)
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


//static signup method
//cannot use an arrow function because using 'this' keyword
userSchema.statics.signup = async function (name, username, email, password) {
    
    // validation
    if (!name || !username || !email || !password) {
        throw Error ('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error ('Email is invalid')
    }
    if (!validator.isStrongPassword(password)) {
         throw Error ('Password is not strong enough')
    }
    //need to use 'this' because there in no user yet
    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })
    
    if (emailExists) {
        throw Error('Email already in use')
    }

    if (usernameExists) {
        throw Error('Username already in use')
    }

    //the higher the number in the gensalt argument, 
    //the longer it will take for hackers to crack the password
    //but takes longer for users to signup - must find a balance
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, username, email, password: hash })
    
    return user

}

// static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error ('All fields must be filled')
    } 
    const user = await this.findOne({ email })
    
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }
    
    return user

}

module.exports = mongoose.model('User', userSchema)