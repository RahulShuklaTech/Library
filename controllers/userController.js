const User = require("../models/user");
const bcrypt = require ("bcrypt");

const defaultPic = "/images/avatar.png";
const addUser = async ({username,email,password,photo}) => {
    console.log(username,email)
    if(!photo){
        photo = defaultPic;
    }
    let emailRegex = /.*@*\..*/;
    if(!emailRegex.test(email)){
        return {status: false, result: {message: "Invalid Email"}};
    }

    if(!password) {
        return {status: false, result : {message: "Password is required"}};

    }


    let hash = await bcrypt.hash(password, 10)                                                                      ;

    try {
        let user = new User ({username,email,password: hash,photo});
        let savedUser = await user.save();
        return {status: true, result: { message: savedUser}};
    }catch(e){
        console.log(e.message)
        return {status: false, result: { error: e.message}};
    }
}

const getUsers = async () => {
    let users = await User.find();
    return users;
}


const loginUser = async ({email,password}) => {
    console.log(email,password)
    try {
        let user = await User.findOne({email});
        if(user == null){
            return {status: false, result: {message: "Invalid Email"}}

        }
        let result = await bcrypt.compare(password, user.password);
        if(!result){
            return {status: false, result: {message: "Invalid Password"}}
        }
        return {status: true, result: user}
    }catch(e){
        return {status: false, result: {Error: e.message }}
    }
}




module.exports = {addUser,getUsers,loginUser}