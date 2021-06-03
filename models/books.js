const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    },
    author: {
        type: [String],
        required: true
    }
}, {timestamps: true, })

const BookModel =  new mongoose.model('Book',BooksSchema)


module.exports = BookModel;