const express = require('express');
const router = express.Router();
const multer = require('multer')
const firebase = require("firebase/app");
const fbStorage = require("firebase/storage");

const Post = require('../models/postModel');
const { UserDetail } = require('../models/userModel')
const requireAuth = require('../middleware/requireAuth')


// GET all images
router.get('/', async (req, res) => {
    try {
        const post = await Post.find({}).sort({ date: -1 });
        res.json(post)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

// Search images with given query
router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
        // { email: new RegExp(`^${emailVariable}$`, 'i') }
        const post = await Post.find({ tags: new RegExp(`^${query}$`, 'i') })
        // console.log(post, 28);
        res.json(post);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})


//POST a new image
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const storage = fbStorage.getStorage(app)
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
    const { description, tags, location, username } = req.body;
    const userDetails = await UserDetail.findOne({ username })

    const tagsArr = String(tags).split(',');
    tagsArr.forEach((ele, idx) => {
        tagsArr[idx] = ele.trim();
    });

    try {
        const storageRef = fbStorage.ref(storage, `files/${req.file.filename + " " + Date()}`)

        const metadata = {
            contentType: req.file.mimetype
        }

        // Upload the file in the bucket storage
        const snapshot = await fbStorage.uploadBytesResumable(
            storageRef,
            req.file.buffer,
            metadata
        )
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await fbStorage.getDownloadURL(snapshot.ref)

        const newPost = new Post({
            description: description,
            tags: tagsArr,
            location: location,
            image: downloadURL,
            user: userDetails,
        })

        const response = await newPost.save();

        console.log("File successfully uploaded.")
        res.status(201).json({
            message: "file uploaded to firebase storage",
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})


// middleware
async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(500).json({ message: 'could not find a post' })
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

    res.post = post
    next()
}

router.get('/download/:id', getPost, async (req, res) => {
    // console.log('96');
    let imgPath = res.post.image;
    res.download(`./public/${imgPath}`)
})

// GET a single image
router.get('/photos/:id', getPost, async (req, res) => {
    res.json(res.post);
})

// UPDATE an image
router.patch('/:id', requireAuth, getPost, async (req, res) => {
    const { description, tags, location } = req.body;

    const tagsArr = String(tags).split(',');
    tagsArr.forEach((ele, idx) => {
        tagsArr[idx] = ele.trim();
    });

    if (res.post.description === description && res.post.tags === tagsArr && res.post.location === location) {
        res.status(200).json({ message: 'post updated' })
        return
    }

    res.post.description = description
    res.post.tags = tagsArr
    res.post.location = location

    try {
        const updatePost = await res.post.save()
        res.status(200).json(updatePost)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

// DELETE an image
router.delete('/:id', requireAuth, getPost, async (req, res) => {
    let imgUrl = res.post.image;
    const desertRef = fbStorage.ref(storage, imgUrl);
    try {
        await fbStorage.deleteObject(desertRef)
        await res.post.deleteOne()
        res.json({ message: 'post deleted successfully' })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

// LIKE a post
router.put('/like', requireAuth, async (req, res) => {
    const { postId, username } = req.body;
    try {
        const x = await Post.findByIdAndUpdate({ _id: postId }, { $push: { liked_by: username } }, { new: true });
        // console.log(x, 137);
        res.json(x)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

router.put('/unlike', requireAuth, async (req, res) => {
    const { postId, username } = req.body;
    try {
        const x = await Post.findByIdAndUpdate({ _id: postId }, { $pull: { liked_by: username } }, { new: true });
        // res.json({ message: 'image disliked by ' + username })
        res.json(x);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

module.exports = router;