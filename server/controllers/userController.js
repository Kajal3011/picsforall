const { User } = require('../models/userModel')
const Post = require('../models/postModel');
const { UserDetail } = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = function (_id) {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async function (req, res) {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        console.log(user.user.username, 13)
        //create token
        const token = createToken(user._id)
        const username = user.user.username
        res.status(200).json({ email, token, username })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async function (req, res) {
    const { fName, lName, email, username, password } = req.body
    try {
        const user = await User.signup(fName, lName, email, username, password)
        // console.log(user, 28)
        //create token
        const token = createToken(user._id)

        res.status(200).json({ email, token, username })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const postsOfUser = async function (req, res) {
    const username = req.params.username
    try {
        const post = await Post.find({ 'user.username': username })
        // console.log(post, 'posts-19');
        res.json(post)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const likedPosts = async function (req, res) {
    const username = req.params.username
    try {
        const post = await Post.find({ liked_by: username })
        // console.log(post, 'likes-30');
        res.json(post)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const userInfo = async function (req, res) {
    const username = req.params.username
    // console.log(username, 28);
    try {
        const post = await UserDetail.find({ username: username })
        // console.log(post);
        res.json(post)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { loginUser, signupUser, postsOfUser, likedPosts, userInfo };
