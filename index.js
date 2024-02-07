const express=require("express");
const {connection}=require("./config/db")

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
 
const {UserModel} =require("./model/UserModel")

var cors = require('cors')

const {authentication} =require("./Middlewware/Authentication")

const app=express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("done");
})

app.post("/signup",async(req,res)=>{
    const {name,job,password}=req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
                if(err){
                    res.send({message: "something went wrong"})
                }
                else{
                    // console.log(hash);
                    const dataDone=new UserModel({
                        name:name,
                        job:job,
                        password:hash
                    });
                    console.log("hash");
                    // await dataDone.save();
                    res.send({msg:"done signup"});
                }
        });
    });

})

app.post("/login",async(req,res)=>{
    const {name,password}=req.body;

    const user=await UserModel.findOne({name});
    // console.log(user);
    if(user){
        const hashPassword=user.password;
        // console.log(hashPassword)
        bcrypt.compare(password, hashPassword, function(err, result) {
            if(!result){
                // alert("wrong password")
                // console.log(password," ",hashPassword )
                res.send({msg:"wrong"});
            }
            else{
                // console.log(user);
                // console.log(hashPassword);
                var token = jwt.sign({ user_id:user._id}, 'shhhhh');
                // localStorage.setItem({"token":token});
                res.send({msg:"login done",token:token,job:user.job});
            }
        });
        // console.log(user);
        // res.send({user:"user"})
    }
    else{
        res.send("error");
    }

})



let port= 8081;
app.listen(port,async()=>{
    try{
        await connection
        console.log("connected");          
    }
    catch(err){
        console.log("not connected")
    }
})