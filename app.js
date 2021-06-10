const express = require('express');
const morgan = require('morgan');
const books = require("./controllers/booksController")
const categories = require("./controllers/categoryController")

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Mongo is ON");
}).catch((e) => console.log("error while connecting to mongo:", e.message));



const app = express();
app.use(morgan('dev'));
app.use(express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
const bookRouter = require('./routes/books')


app.use("/books",bookRouter)





app.get('/', async (req,res) => {
    
    let booksGot = await books.showAllBooks();
    console.log(booksGot)

    res.render('index', {message:'Welcome to Mclaren Library',books: booksGot })
   
    // res.send('Welcome to Mclaren Library');
})

app.get('/addbook', async (req,res) => {
    let list = await categories.showAllCategories()
    // console.log(list)
    res.render('form', {list})
}).post('/addbook', async (req,res) => {
    let {title,price,category,authors} = req.body
 
    // console.log(title,price,category,authors)
    let response = await books.addNewBook(title,price,category, authors)
    console.log(response)
    if(response){
        res.redirect(301,  "/")
        //res.status(201).send("book Added")

    }else{
        res.status(400).send("bad request")
    }
    console.log("this happened")

    
})






app.all(/.*/,(req,res) => {
    res.statusCode = 404;
    res.send("You are lost. Contact the librarian")
})








//Server listening

const PORT = 3300

app.listen(PORT, () => {
    console.log("server is listening at http://localhost: "+PORT)
})