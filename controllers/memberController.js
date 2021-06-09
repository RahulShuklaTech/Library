const Member = require("../models/member");


const addMember = async (name) => {
    try{
        let memberID = Math.floor(Date.now()*Math.random())
        const member = new Member({name,memberID})
        await member.save();
        console.log("Welcome To Library Member ",name)
    }catch(e){
        console.log("Got an Error while adding Member please try again later",e.message);
    }
}


const removeMember = async (name) => {
    try {
        const member = await Member.findOne({name});
        if(member === null ){
            console.log("member not found")
        }else{
            await member.remove();
            console.log(name+" has been removed")
        }
    }catch(e){
        console.log("You got an error while removing book",e.message);
    }
}


const showAllMembers = async () => {
    let data = await Member.find({});
    if(data.length  === 0){
        console.log("Nothing to Dispaly")
    }
    data.forEach(member=> console.log("\n", member.name));
}

module.exports = {addMember,removeMember,showAllMembers}