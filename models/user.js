const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: Password,
        required: true
    },
    image: {
        type: String,
        
    }
}, {timestamps: true})


const userModel = new mongoose.model('User',userSchema);

module.exports = userSchema;