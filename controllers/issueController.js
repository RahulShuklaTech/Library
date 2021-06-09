const Issue = require("../models/issue");
const BookModel = require("../models/books")
const MemberModel = require("../models/member")
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;


const issueBook = async (bookName,memberID) => {
    try {
        let book = await BookModel.findOne({title: bookName});

        // console.log("book from issue",book)

        let member = await MemberModel.findOne({memberID: memberID});
        // console.log("member from issue",member)
        let checkPrevIssue = await Issue.findOne({book: book});
        
        
        // console.log(ObjectId(),memberObject)
        if(checkPrevIssue.issued){
            console.log("Sorry the book is already issued")
            return 
        }
        const issue = new Issue({book: book, member: member, issued: true});
        await issue.save();
        console.log(`${bookName} has been issued to ${member.name}`);

    }catch(e){
        console.log("You got an error while adding book",e.message);
    }
}


const returnBook = async (bookName,memberID) => {
    try {
        let book = await BookModel.findOne({title: bookName});

        // console.log("book from issue",book)

        let member = await MemberModel.findOne({memberID: memberID});
        // console.log("member from issue",member)
        let checkPrevIssue = await Issue.findOne({book: book});
        
        
        // console.log(ObjectId(),memberObject)
        if(!checkPrevIssue.issued){
            console.log("Sorry the book has already been returned")
            return 
        }
        
        await Issue.updateOne({book: book},{issued: false});
        console.log(`${bookName} has been returned by ${member.name}`);

    }catch(e){
        console.log("You got an error while adding book",e.message);
    }
}

const showAllIssues = async () => {
    try {
        let data = await Issue.find({}).populate("book").populate("member");
        console.log('data',data)
        if(data.length  === 0){
            console.log("Nothing to Dispaly")
    
        }
        
        // return data;
        data.forEach(book => console.log("\n", book.book.title + " has been issued by "+ book.member.name ));
        }catch(e){
            console.log("Seem to have run into some trouble ",e.message);
            return [];
        }
}

module.exports = {issueBook,returnBook,showAllIssues}