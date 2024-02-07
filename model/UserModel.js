const mongoose=require("mongoose");

const userScema= mongoose.Schema({
    name:{type:String,},
    password:{type:String,},
    job:{type:String,},
})

const UserModel=mongoose.model("user",userScema);

module.exports=({
    UserModel
})