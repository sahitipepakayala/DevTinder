const jwt=require("jsonwebtoken");
const {User}=require("../Models/user")
require('dotenv').config();

function adminAuth(req,res,next){
    const userid="xyz";
    const isAuthentication=userid==='xyz1';
    if(isAuthentication)
    {
        next();
    }
    else{
        res.status(200).send("Authentication Failed");
    }
}

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Access Denied. No Token Provided.");
        }

        const decoded = jwt.verify(token,process.env.TOKEN);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Auth error:", error.message);
        res.status(401).send("Invalid or expired token.");
    }
};



module.exports={adminAuth,userAuth}





