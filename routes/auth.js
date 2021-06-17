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
    
   
    if(req.body.photoURL) req.body.photoURL = req.file.filename; 
    let result  = await userController.addUser(req.body);
    console.log("result",result)
    if(result.status) {
        res.status(201).json(result.result);
    }else{
        res.status(400).json(result.result)
    }
})

router.post('/login',multipart.single("profilePic"),async (req,res) => {
    console.log("jslfkklsafklas",req.body)
    let loginResult = await userController.loginUser(req.body);
    if(loginResult.status) {
        res.status(201).json(loginResult.result);
    }else{
        res.status(400).json(loginResult.result)
    }
})

module.exports = router