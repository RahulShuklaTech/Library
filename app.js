const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



const app = express();
app.use(morgan('dev'));
const bookRouter = require('./routes/books')

app.set('view engine','pug')


app.get('/', (req,res) => {
    res.render('index', {message:'Welcome to Mclaren Library' })
   
    // res.send('Welcome to Mclaren Library');
})

app.use(express.static('static'))

app.use("/books",bookRouter)






app.all(/.*/,(req,res) => {
    res.statusCode = 404;
    res.send("You are lost. Contact the librarian")
})








const PORT = 3300

app.listen(PORT, () => {
    console.log("server is listening at http://")
})