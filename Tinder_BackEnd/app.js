const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./src/Models/user');  // Ensure the correct path
const {validateSignUp}=require("./src/utils/validateSignUp");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./src/Middlewares/userAuth")
const app = express();
require('dotenv').config();
const PORT=process.env.PORT;
const cors = require('cors');
app.use(express.json());  // To parse JSON request body
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true
  }));
  
  
  
const {authRouter}=require("./src/Routers/authRouter");
const {profileRouter}=require("./src/Routers/profileRouter");
const {requestRouter}=require("./src/Routers/requestRouter");
const { userRouter } = require('./src/Routers/userRouter');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Error in connecting to MongoDB:", error);
        process.exit(1);
    }
};
// ✅ Define `/signup` Route BEFORE calling `connectDB()`
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/user",userRouter);
// ✅ Connect to MongoDB and Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Listening on port 5000");
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
});



























// app.get("/abc", (req, res) => {
//     res.send("matched route with multiple 'b's");
// });


// app.get("/userId",adminAuth,(req,res)=>{
//     console.log("Authenticatd");
//     res.send("Loggedin")
// })

// app.get("/user",(req,res,next)=>{
//     console.log("requesting user id");
//     next();
// //    res.send("request 1");
    
// },(req,res,next)=>{
//     console.log("response 2");
//     // res.send("request 2");
//     next(); 
// },(req,res,next)=>{
//     console.log("response 3");
//      res.send("request 3");
   
// })

// app.use((err,req,res,next)=>{
//     console.log(err.stack);
//     res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
// })

// app.listen(port,()=>{
//     console.log("listening to the port successfully");
// })
