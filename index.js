const readLineSync = require('readline-sync');
const mongoose = require('mongoose');
const categoryController = require("./controllers/categoryController");
const bookController = require("./controllers/booksController");

const Category = require('./models/category')

function displayOptions() {
    console.log("\n-----------------------\n");
    console.log("Welcome Readers\n\n");
    console.log("Here are few things you can do: ");
    console.log("1. show all categories");
    console.log("2. Add a new category");
    console.log("3. Delete a category");
    console.log("4. Show all Books");
    console.log("5. Add a Book");
    console.log("6. Delete a Book");
    console.log("7. Show a Book");
    console.log("\n-----------------------\n");

}


mongoose.connect('mongodb://127.0.0.1:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => showOptions());

let db = mongoose.connection;
async function showOptions() {
    displayOptions();

    let userChoice = readLineSync.question("Pick an operation to perofom (1-8): ")
    let response;
    switch (userChoice) {
        case "1": 
            await categoryController.showAllCategories();  
            break;
        case "2":
            response = readLineSync.question("What category would you like to add?: ")
            await categoryController.addNewCategory(response);
            break;
        case "3":
            response = readLineSync.question("What category would you like to remove?:")
            await categoryController.removeCategory(response)
            break;
        
        case "4":
            await bookController.showAllBooks();
            break;
        
        case "5":
            let title = readLineSync.question("What is the title: ");
            let price = readLineSync.question("what is the price: ");
            let category = readLineSync.question("what is the category: ");
            let authors = readLineSync.question("Name of the Author (Authors should be comma seprated): ");
            await bookController.addNewBook(title,price,category,authors);
            break;
            
        case "6":

            response = readLineSync.question("What book would you like to remove? : ")
            await bookController.removeBook(response)
            break;
        case "7":

            response = readLineSync.question("What book would you like to See? : ")
            await bookController.showBook(response)
            break;

        default: 
            db.close();
            return


    }
    showOptions();
  
}

// showOptions();