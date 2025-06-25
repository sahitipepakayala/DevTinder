const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:5
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a verified email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Password is not strong")
            }
        }
    },
    age:{
        type:Number,
        min:18
      
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value))
                throw new Error ("Gender data is not valid");


            //or enum: ['male', 'female', 'others']
        }
    },
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Not a valid url of the photo")
            }
        }
    },
    about:{
        type:String,
        default:"i am very good"
            },
    skills:{
        type:[String],
        validate:{
            validator:function (skills){
                return skills.length<10;
            },
            message:"10 skills ONLY! "
        }
    }
},
{
    timestamps:true
})


userSchema.index({firstName:1,lastName:1});
userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},process.env.TOKEN);
    return token;
}



userSchema.methods.validatePassword=async function(password){
    const user=this;
    const passwordHash=await bcrypt.compare(password,user.password);
    return passwordHash;
}


const User=mongoose.model("User",userSchema);

module.exports={User}