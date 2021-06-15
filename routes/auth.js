const express = require('express');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"static/uploads/")
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + "-"+ file.originalname)
    }
})

const multipart = multer({storage: storage});

const router = express.Router();

const userController = require('../controllers/userController');





router.post('/signup',multipart.single("profilePic"), async (req,res) => {
    
    console.log("body",req.body);

    console.log(req.file);
    // req.body.photoURL = req.file.filename
    let result  = await userController.addUser(req.body);
    if(result.status) {
        res.status(201).send(result.result);
    }else{
        res.status(500).send(result.message)
    }
})

// router.post('/login',async (req,res) => {
//     let loginResult = await userController.loginUser(req.body);
// })

module.exports = router