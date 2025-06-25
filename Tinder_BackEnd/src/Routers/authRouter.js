const express=require("express");
const authRouter=express.Router();
const bcrypt=require("bcrypt");
const {validateSignUp}=require("../utils/validateSignUp");
const {User} =require("../Models/user");
const { userAuth } = require("../Middlewares/userAuth");



authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, emailId, password, image, gender, skills, about, age } = req.body;
    try {
        validateSignUp(req);

        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).send("USER ALREADY EXISTS");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            image,
            gender,
            skills,
            about,
            age
        });

        await newUser.save();

        const token = await newUser.getJWT();
        res.cookie("token", token); // 🍪 Set token as cookie

        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});


authRouter.post("/login",async (req,res)=>{
    try{
    const {emailId,password} =req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user)
        throw new Error("User not found!");
    const check=await user.validatePassword(password);
    if(!check)
    {
        throw new Error("Incorrect Password!");
    }
    const token=await user.getJWT();
    res.cookie("token",token);
    res.status(200).send(user);
}
catch(error)
{
    res.status(500).send("Error: "+error.message);
}
})


authRouter.get("/logout",userAuth,(req,res)=>{
    res.clearCookie("token");
    res.send("Logged out Succesfully");
})

module.exports={authRouter};