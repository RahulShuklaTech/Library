const express = require('express');
const router = express.Router();
const {showAllBooks,removeBook} = require('../controllers/booksController')

router
    .route('/')
    .get(async (req,res) => {
        let data = await showAllBooks();
        res.send(data)
        
    })
    .post((req,res) => {
        res.send('Adding new book')
    })


let bookIdHandler = (req,res,next) => {
    let id = req.params.bookID;
    console.log("id",Number(id))
    if(Number(id) !== NaN && Number(id) > 0){
        next();
    }else{
        res.send('Invalid Book Id');
    }
}


let bookIdHandler2 = (req,res) => {
    
    res.send('Book requested: '+req.params.bookID);
    
}

let deleteIdHandler = async (req,res,next) => {
    let id = req.params.bookID;
    console.log("idhere",id)
    let response = await removeBook(id)
    if(response){
        next();
    }else{
        res.send('Invalid Book Id');
    }
}






router.get("/:bookID",[bookIdHandler,bookIdHandler2])

router.delete("/:bookID",[deleteIdHandler,bookIdHandler2]);

module.exports = router