const express=require("express");
const { userAuth } = require("../Middlewares/userAuth");
const { ConnectionRequestModel } = require("../Models/connectionRequest");
const requestRouter=express.Router();
const {User}=require("../Models/user");


requestRouter.post("/request/:status/:id",userAuth,async (req,res)=>{
    try{
    const user=req.user;
    const fromId=user._id;
    const toId=req.params.id;
    const status=req.params.status;
    const allowedStatus=["ignored","intrested"];
    const toUser=await User.findById(toId);
    if(!toUser)
        return res.status(500).send({msg:"User Not Found"})
    if(!allowedStatus.includes(status))
        return res.status(400).send({ error: `${status} is not a valid status` });
    const connectionAvailable=await ConnectionRequestModel.findOne({$or:[{fromId,toId},{fromId:toId,toId:fromId}]})
    if(connectionAvailable)
        return res.status(500).send("Already Connection Available");
  
    const connectionData=new ConnectionRequestModel({
        fromId,toId,status
    })
    await connectionData.save();
    if(status==="intrested")
    res.send({msg:user.firstName+" is intrested to "+toUser.firstName,connectionData});
else
{
    res.send({msg:user.firstName+" ignored "+toUser.firstName,connectionData});
}
}
catch(error){
    res.status(500).send("Error "+error.message);
}
})


requestRouter.post("/review/:status/:id",userAuth,async(req,res)=>{
    try{
    const connectionId=req.params.id;
    const status=req.params.status;
    const loggedUser=req.user;
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status))
        throw new Error("Status invalid");
    const connectionData=await ConnectionRequestModel.findOne({_id:connectionId,
        toId:loggedUser._id,status:"intrested"
    });
   if(!connectionData)
   {
    return res.status(500).json({message:"connection not found"})
   }
   connectionData.status=status;
   await connectionData.save();
   res.status(200).json({
    message: `Connection ${status} successfully`,
    connection: connectionData,
  });
}
catch(error)
{
    res.status(500).send("error "+error.message);
}

})

module.exports={requestRouter}