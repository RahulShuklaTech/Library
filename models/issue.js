const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({

    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book"
    },

    member: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member"
    },

    issued: {
        type: Boolean,
        required: true

    },

    returnDate: {
        type: Date,

    }

}, {timeStamps: true})

const IssueModel = new mongoose.model('Issue',issueSchema);

module.exports =  IssueModel;