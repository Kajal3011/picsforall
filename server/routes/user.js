const express = require('express');
const { loginUser, signupUser, postsOfUser, likedPosts, userInfo } = require('../controllers/userController')

const router = express.Router();

//login
router.post('/login', loginUser);

// signup
router.post('/signup', signupUser);

// GET posts of user
router.get('/posts/:username', postsOfUser);

//GET posts liked by user
router.get('/likes/:username', likedPosts)

// GET user info
router.get('/info/:username', userInfo)

module.exports = router 