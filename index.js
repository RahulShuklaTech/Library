const readLineSync = require('readline-sync');
const mongoose = require('mongoose');
const categoryController = require("./controllers/categoryController");
const bookController = require("./controllers/booksController");
const memberController = require("./controllers/memberController")
const issueController = require('./controllers/issueController');

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
    console.log("8. Show Books by Category");
    console.log("9. Show all members");
    console.log("10. Add a member");
    console.log("11. Remove a member")
    console.log("12. Issue a book")
    console.log("13. Return a book")
    console.log("14. Show all issued books")
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
            await bookController.addNewBook(title, price, category, authors);
            break;

        case "6":

            response = readLineSync.question("What book would you like to remove? : ")
            await bookController.removeBook(response)
            break;
        case "7":

            response = readLineSync.question("What book would you like to See? : ")
            await bookController.showBook(response)
            break;

        case "8":
            console.log("The Categories We have are:")
            await categoryController.showAllCategories();
            response = readLineSync.question("Search Book by category? : ")
            await categoryController.searchByCategory(response);
            break;
        case "9":

            await memberController.showAllMembers();
            break;
        case "10":
            response = readLineSync.question("Plese enter member name: ");
            await memberController.addMember(response);
            break;
        case "11":
            response = readLineSync.question("Which member would you like to remove ?:")
            await memberController.removeMember(response)
            break;
        case "12":
            const bookWanted = readLineSync.question("Which book would you like to issue ?:")
            const memberId = readLineSync.question("Enter Member ID: ");
            await issueController.issueBook(bookWanted, memberId);
            break;
        case "13":
            const returnBook = readLineSync.question("Which book would you like to return ?:")
            const returnMemberId = readLineSync.question("Enter Member ID: ");
            await issueController.returnBook(returnBook, returnMemberId);
            break;
        case "14":
            await issueController.showAllIssues();
            break;


        default:
            db.close();
            return


    }
    showOptions();

}

// showOptions();


