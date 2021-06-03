const Category = require ("../models/category");


const showAllCategories = async () => {
    let data = await Category.find({});
    if(data.length  === 0){
        console.log("Nothing to Dispaly")
    }
    data.forEach(category => console.log("\n", category.name));
}


const addNewCategory = async (name) => {
    try{
        const category = new Category({name});
        await category.save();
        console.log("Success");
    }catch(e){
        console.log("You got an error while adding book",e.message);
    }
}


const removeCategory = async (name) => {
    try {
        const category = await Category.findOne({name: name});
        if(category === null){
            console.log("Category not found");

        }else{
            await category.remove();
            console.log(name+" has been removed")
        }
    }catch(e){
        console.log("You got an error while adding book",e.message);
    }
}

module.exports = {showAllCategories,addNewCategory,removeCategory}