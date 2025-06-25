const {mongoose, connection}=require("mongoose");

const connectionSchema=new mongoose.Schema({
    fromId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{values:["intrested","ignored","accepted","rejected"],message:`{VALUE} is not a valid status`},
        required:true
    
    }
},{
    timestamps:true
})

connectionSchema.index({fromId:1,toId:1});


connectionSchema.pre("save",function (next){
    const connection=this;
    if(connection.fromId.equals(connection.toId))
    {
        return next(new Error("Cannot send req to yourself"));
    }
    next();
})

const ConnectionRequestModel=mongoose.model("ConnectionRequestModel",connectionSchema);

module.exports={ConnectionRequestModel}