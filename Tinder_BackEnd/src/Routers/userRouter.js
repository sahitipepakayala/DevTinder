const express=require("express");
const { userAuth } = require("../Middlewares/userAuth");
const { ConnectionRequestModel } = require("../Models/connectionRequest");
const { User } = require("../Models/user");
const userRouter=express.Router();

userRouter.get("/requests",userAuth,async (req,res)=>{
    try{
    const loggedUser=req.user;
    const connections=await ConnectionRequestModel.find({toId:loggedUser._id,status:"intrested"}).populate("fromId",["firstName","lastName","image","age","about","gender"]);
    if(!connections || connections.length === 0)
        res.status(404).json({message:"No requests"});
    res.send(connections);
}
catch(error)
{
    res.status(500).send("error "+error.message);
}
})

userRouter.get("/connections", userAuth, async (req, res) => {
    try {
      const loggedUser = req.user;
  
      const allUsers = await User.find({}, '_id'); // get all user IDs
      const userIdsSet = new Set(allUsers.map(user => user._id.toString()));
      
      const connectionsData = await ConnectionRequestModel.find({
        $or: [
          { toId: loggedUser._id, status: "accepted" },
          { fromId: loggedUser._id, status: "accepted" }
        ],
      })
        .populate("fromId", ["firstName", "lastName", "emailId", "gender", "image", "about", "skills"])
        .populate("toId", ["firstName", "lastName", "emailId", "gender", "image", "about", "skills"]);
      
      const validConnections = connectionsData.filter(conn =>
        conn.fromId && conn.toId &&
        userIdsSet.has(conn.fromId._id.toString()) &&
        userIdsSet.has(conn.toId._id.toString())
      );
      
      const data = validConnections.map(conn =>
        conn.fromId._id.toString() === loggedUser._id.toString()
          ? conn.toId
          : conn.fromId
      );

      const usersData=await User.find({_id:{$in:data}});
      res.status(200).json({ connections: usersData });
    } catch (error) {
      res.status(500).send("error " + error.message);
    }
  });

  userRouter.get('/feed',userAuth, async (req, res) => {
    try {
     
      const loggedUser=req.user;
      const loggedUserId=loggedUser._id;
      // Fetch accepted connection requests (where loggedUser is either toId or fromId)
      const connections = await ConnectionRequestModel.find({
        $or: [
          { fromId: loggedUserId },
          { toId: loggedUserId }
        ]
      });
  
      // Extract user IDs involved in accepted connections
      const connectedUserIds = connections.flatMap(conn => [
        conn.fromId.toString(),
        conn.toId.toString()
      ]);
  
      // Remove duplicates and loggedUserId
      const filteredIds = new Set(connectedUserIds);
      filteredIds.delete(loggedUserId); // ensure self is not blocked
  
      // Fetch users not connected and not the logged-in user
      const feedUsers = await User.find({
        _id: {
          $nin: Array.from(filteredIds),
          $ne: loggedUserId
        }
      });
  
      res.status(200).json(feedUsers);
    } catch (err) {
      console.error('Error fetching feed users:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
module.exports={userRouter}