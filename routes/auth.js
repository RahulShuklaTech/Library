const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');


router.post('/signup', async (req,res) => {
    let result  = await userController.addUser(req.body);
    if(result.status) {
        res.send(result.result);
    }else{
        res.status(400).send(result.result)
    }
})