const userSchema = require("../models/userSchema");
const AsyncErrorHandler = require("./AsyncErrorHandler");
const jwt = require("jsonwebtoken");
const isUserAuthenticated = AsyncErrorHandler(async (req, res, next) => {
  const {token} = req.cookies; // Get the token from the "jwtToken" cookie
  if (!token) {
    return res.send("Please login to access this!");
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userSchema.findById(decodedData.id);
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
});

const authorizedRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes("admin"))
        {  
            return res.send(`User is not allowed to access this`);
        }  
        next();
    }
}

module.exports = { isUserAuthenticated, authorizedRoles };
