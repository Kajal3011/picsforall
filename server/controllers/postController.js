const router = require("express").Router();
const multer = require('multer');
const UserToUploadMapping = require('../models/UserToUploadMapping')
const path = require('path');
const uploadFolder = path.join(__dirname, "Videos"); // use a variable to hold the value of upload folder

const storage = multer.diskStorage({
    destination: uploadFolder, // use it when upload
    filename: (req, file, cb) => {
        // nameFile = file.originalname + " "+ Date.now() // --> give "video.mp4 1622180824748"
        let [filename, extension] = file.originalname.split('.');
        let nameFile = filename + "-" + Date.now() + "." + extension; // --> give "video-1622181268053.mp4"
        cb(null, nameFile)
    }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single('video'), async (req, res, next) => {
    const saveMapping = new UserToUploadMapping({
        userId: '123',
        file: req.file,
    })

    await saveMapping.save()

    res.send("Video uploaded")
})