require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const books = require("./controllers/booksController")
const categories = require("./controllers/categoryController")
const cors = require("cors")
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Mongo is ON");
}).catch((e) => console.log("error while connecting to mongo:", e.message));



const app = express();
app.use(morgan('dev'));
app.use(express.static('static'))
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: "*"
    })
)
app.use(express.json());
app.set('view engine','pug')
const bookRouter = require('./routes/books')
const authRouter = require('./routes/auth')

app.use("/books",bookRouter);
app.use("/auth",authRouter);


// app.get('/books/:id')


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