const Book = require("../models/books");
const CategoryModel = require("../models/category");
const BookModel = require("../models/books");


const showAllBooks = async () => {
    try {
        let data = await Book.find({}).populate("category");
        if (data.length === 0) {
            console.log("Nothing to Dispaly")

        }
        data.forEach(book => console.log("\n", book.title + "   " + book.category.name));
        return data;

    } catch (e) {
        console.log("Seem to have run into some trouble", e.message);
        return [];
    }

}


const addNewBook = async (title, price, category, authors) => {
    console.log(title,price,authors)
    let authorArray = authors.split(",")

    let entry = await CategoryModel.findOne({ name: category });

    try {
        if (entry) {
            let id = entry.id

            const book = new Book({ title: title, price: price, category: id, authors: authorArray });
            await book.save();
            await BookModel.updateOne({
                title: title,
            },
                {
                    $set: {
                        author: [...authorArray]
                    }
                })
            // console.log("Success, The book has been added to library");
              
        } else {
            const options = await CategoryModel.find({});
            console.log("Invalid Category entered.\n Categories Available")
            options.map(opt => console.log(opt.name));
            return false
        }


    } catch (e) {
        console.log("You got an error while adding book", e.message);
        // return e.message
        return false

    }
    return true;
}


const removeBook = async (name) => {
    try {
        const book = await Book.findOne({ title: name });
        if (book === null) {
            console.log("Book not found");
            return false
        } else {
            await book.remove();
            console.log(name + " has been removed")
            return true
        }
    } catch (e) {
        console.log("You got an error while removing the book", e.message);
        return false
    }
}


const showBook = async (name) => {
    try {
        const book = await Book.findOne({ title: name });
        if (book === null) {
            console.log("Book not found");

        } else {

            let cat = await CategoryModel.findOne({ id: book.category });
            let authors = book.author
            console.log(`Title: ${book.title} \nPrice: ${book.price} \nAuthor: ${[...authors]}\nCategory: ${cat.name} `)
        }
    } catch (e) {
        console.log("You got an error while adding book", e.message);
    }
}

module.exports = { showAllBooks, addNewBook, removeBook, showBook }