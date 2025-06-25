const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../Middlewares/userAuth");
const {User}=require("../Models/user");
const {validateEdit}=require("../utils/validateEdit")
const validator=require("validator")
const bcrypt=require("bcrypt");

profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
   
    const user=req.user;
    if(!user)
    {
        throw new Error("User Not Found!")
    }
    //console.log("user in app.js",user)
    res.send(user);
    }catch(error)
    {
        res.status(500).send("Error "+error.message);
    }
})


profileRouter.get("/feed",userAuth,async(req,res)=>{
    const users=await User.find();
  //  console.log(users);
    res.json(users)
})

profileRouter.post("/user",userAuth,async (req,res)=>{
    const FirstName=  req.body.firstName;
    try{
    const user=await User.findOne({firstName:FirstName});
    if(user.length===0)
    {
        res.send("users not found")
    }
    else{
    //console.log(user);
    res.send("Got by email id")
    }}
    catch(error){
        res.status(500).send("SOMETHING WENT WRONG")
    }
    
})


profileRouter.delete("/delete",userAuth,async (req,res)=>{
    const Id=req.body.Id;
    try{
  const user=await User.findByIdAndDelete(Id);
  if(!user)
    throw new Error("No user Found With The Id");
    res.send("deleted");
    }
    catch(error){
        res.send("Error "+error.message);
    }
})


profileRouter.put("/profile/edit",userAuth,validateEdit,async (req,res)=>{
    try{
        
   const user=req.user;
   Object.keys(req.body).forEach((k)=>user[k]=req.body[k]);
await user.save();
   // console.log(user);
    res.status(200).json({message:"updated successfully",data:user});
    
    }
    catch (error) {
        console.error("EDIT PROFILE ERROR:", error);
        res.status(500).send( error.message);
      }
})

profileRouter.patch("/profile/editPassword",userAuth,async(req,res)=>{
    try{
    const user=req.user;
  //  console.log("user",user);
    const {password,updatePassword}=req.body;
    const check=await user.validatePassword(password);
    if(!check)
        throw new Error("Invalid old password");
    if(!validator.isStrongPassword(updatePassword))
        throw new Error("Not a strong Password");
  //  console.log("new pwd",newUser);
  const passwordHash=await bcrypt.hash(updatePassword,10);
    user.password=passwordHash;
    await user.save();
    res.send({msg:"password updated successfully",user})
}
catch(error)
{
    res.status(500).send("Error "+error.message);
}
})


module.exports={profileRouter};