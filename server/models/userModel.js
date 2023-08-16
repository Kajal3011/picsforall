const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema

const userDetailsSchema = new Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        // unique: true
    },
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user: userDetailsSchema
})

const UserDetail = mongoose.model('UserDetail', userDetailsSchema);

//we can write the logic in userController directly...
// But we are using different method i.e. Static method

userSchema.statics.signup = async function (fName, lName, email, username, password) {
    // console.log(email);
    // console.log(fName);
    // console.log(lName);
    // console.log(username);
    // console.log(password);

    // validation
    if (!email || !password || !fName || !lName || !username) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not Valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Not a strong password')
    }

    const emailExists = await this.findOne({ email });
    if (emailExists) {
        throw Error('Email already exist');
    }

    const usernameExists = await UserDetail.findOne({ username });
    if (usernameExists) {
        throw Error('This username is not available');
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const userDetails = await UserDetail.create({ fName, lName, username })
    const user = await this.create({ email, password: hash, user: userDetails })

    return user

}


// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incrrect password');
    }

    return user;
}


module.exports = { User: mongoose.model('User', userSchema), UserDetail, userDetailsSchema }