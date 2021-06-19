const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "static/uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const multipart = multer({ storage: storage });

const router = express.Router();

const userController = require('../controllers/userController');

const refreshTokens = [];




router.post('/signup', multipart.single("profilePic"), async (req, res) => {


    if (req.body.photoURL) req.body.photoURL = req.file.filename;
    let result = await userController.addUser(req.body);
    console.log("result", result)
    if (result.status) {
        res.status(201).json(result.result);
    } else {
        res.status(400).json(result.result)
    }
})

router.post('/login', multipart.single("profilePic"), async (req, res) => {

    let loginResult = await userController.loginUser(req.body);
    if (loginResult.status) {
        let payload = { email: loginResult.result.email }
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
        // console.log(token)
        refreshTokens.push(refreshToken)
        res.status(200).json({ token, refreshToken });
    } else {

        res.status(400).json(loginResult.result)
    }
})

router.post('/token', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        res.send(403)
    }
    try {
        let payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        let newPayload = {email: payload.email}
        let token = jwt.sign(newPayload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
        })
        res.status(200).json({ token })
    } catch (e) {
        console.log("error in token",e.message)
        res.status(401).json({error:"token expired."})
    }
})

module.exports = router