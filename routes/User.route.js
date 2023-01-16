const express = require("express")
const {UserModel} = require("../models/User.model")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userRouter = express.Router()


userRouter.post("/register",  (req,res)=>{
    const {email,name,pass,age} = req.body
    try {

        bcrypt.hash(pass, 5, async (err, secure_password)=> {
            if(err){
                console.log(err);

            } else {
                const user = new UserModel({email,name,pass:secure_password,age})
        await user.save()
        res.send("Registered")

            }
        });


        
    } catch (error) {
        res.send("Error in registering user")
        res.send(error)
        
    }
})

userRouter.post("/login", async (req,res)=>{
    const {email,pass} = req.body
    
    try {
        const user = await UserModel.find({email})
         
if(user.length>0){
    bcrypt.compare(pass, user[0].pass, (err, result)=> {
        if(result){
            const token = jwt.sign({ userId:user[0]._id }, process.env.key);
            res.send({"msg":"Login Successfull","token":token})
        } else {
            res.send("Wrong Credentials")
        }
    });
} else {
    res.send("Wrong Credentials")
}
       
    
        
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
    
})

module.exports = {userRouter}