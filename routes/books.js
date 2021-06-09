const express = require('express');
const router = express.Router();
const {showAllBooks} = require('../controllers/booksController')

router
    .route('/')
    .get((req,res) => {
        res.send("list of books")
        const books = async () =>  {
          let data = await showAllBooks();
          console.log(data)
        };    
        books()
        
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

router.get("/:bookID",[bookIdHandler,bookIdHandler2])


module.exports = router