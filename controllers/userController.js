const User = require("../models/user");
const bcrypt = require ("bcrypt");

const defaultPic = "/images/avatar.png";
const addUser = async ({username,email,password,photo}) => {
    if(!photo){
        photo = defaultPic;
    }
    let emailRegex = /.*@*\..*/;
    if(!emailRegex.test(email)){
        return {status: false, message: "Invalid Email ID"};
    }

    if(!password) {
        return {status: false, result = "Password is required"};

    }

    let hash = await bcrypt.hash(password, 10);


    

    try {
        let user = new User ({username,email,password,photo});
        let savedUser = await user.save();
        return {status: true, result: savedUser};
    }catch(e){
        return {status: true, result: savedUser};
    }
}


module.exports = {addUser}