const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    memberID: {
        type: Number,
        required: true,
        unique: true,
       
        
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
})

const MemberModel = new mongoose.model('Member',MemberSchema);

module.exports = MemberModel;