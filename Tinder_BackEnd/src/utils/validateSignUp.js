const { Error } = require("mongoose");
const validator=require("validator");

function validateSignUp(req){
const {firstName,lastName,emailId,password}=req.body;
//console.log(firstName,lastName,emailId,password)
if(!firstName || !lastName){
    throw new Error("Name is not valid");
}
else if(!validator.isEmail(emailId))
{
    throw new Error("Email is not valid");
}
else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password is not valid");
    }
    
    }

module.exports={validateSignUp};