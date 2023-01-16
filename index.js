// const express = require("express")
// const {connection} = require("./config/db")
// const {UserModel} = require("./models/User.model")
// const jwt = require("jsonwebtoken")
// const bcrypt = require('bcrypt');


// const app = express()
// app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("Welcome")
// })

// app.post("/register", async (req,res)=>{
//     const payload = req.body
//     try {
//         const user = new UserModel(payload)
//         await user.save()
//         res.send("Registered")
//     } catch (error) {
//         res.send("Error in registering user")
//         res.send(error)
//         console.log();
//     }
// })

// app.post("/login", async (req,res)=>{
//     const {email,pass} = req.body
//     try {
//         const user = await UserModel.find({email,pass})
//         var token = jwt.sign({ course: 'backend' }, 'masai');
//         if(user.length>0){
//             res.send({"msg":"Login Successfull","token":token})
//         } else {
//             res.send("Wrong Credentials")
//         }
//         console.log(user);
        
//     } catch (error) {
//         console.log("Something went wrong");
//         console.log(error);
//     }
    
// })


// app.get("/about",(req,res)=>{
//     res.send("About api")
// })


// app.get("/data",(req,res)=>{
//     const token = req.headers.authorization
//     jwt.verify(token, 'masai', (err, decoded)=> {
//         if(err){
//             res.send("Invalid token")
//             console.log(err);
//         } else {
//             res.send("data.....")
//         }
//       });

    
// })

// app.get("/contact",(req,res)=>{
//     res.send("Contact")
// })

// app.get("/cart",(req,res)=>{
//     const token = req.query.token
//     jwt.verify(token, 'masai', (err, decoded)=> {
//         if(err){
//             res.send("Invalid token")
//             console.log(err);
//         } else {
//             res.send("Cart page.....")
//         }
//       });

// })

// app.listen(8080, async ()=>{
//     try {
//         await connection
//         console.log("Connected to db");
//     } catch (error) {
//         console.log("Trouble connecting db");
//         console.log(error);
        
//     }
//     console.log("Running on port 8080");
// })


const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/User.route")
const {noteRouter} = require("./routes/Note.route")
const {authenticate} = require("./middlewares/authenticate.middleware")
const cors = require("cors")

const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())



app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)



app.listen(process.env.port, async ()=>{
    try {
        await connection
        console.log("Connected to db");
    } catch (error) {
        console.log("Trouble connecting db");
        console.log(error);
        
    }
    console.log(`Running on port ${process.env.port}`);
})