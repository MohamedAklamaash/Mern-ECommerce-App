const AsyncErrorHandler = require("../middleware/AsyncErrorHandler");
const userSchema = require("../models/userSchema");
const {body,validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const { sendToken } = require("../utils/jwtToken");
const {sendEmail} = require("../utils/sendEmail");
const createUser = AsyncErrorHandler(async(req,res,next)=>{
    const {name,email,password,avatar:{url}} = req.body;
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(500).json({ success: false, message: "User not created" });
    }
    const user = await userSchema.create({
        name,
        email,
        password,
        avatar:{
            public_id:"public id",
            url,
        }
    })
    const token = user.getJwtToken();
    if(!user)
    {
        return res.status(500).json({success:false,message:"User not created"});
    }
    res.status(201).json({ success: true,user,token });
})

const loginUser = AsyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Please enter email and password");
  }

  const user = await userSchema.findOne({ email }).select("+password");

  if (!user) {
    return res.send("User not found with given email credentials");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.send("Password for that particular email is invalid");
  }

  sendToken(user,201,res);

});

const logoutUser = AsyncErrorHandler(async(req,res)=>{

  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  });
  return res.status(201).json({success:true,message:"User logged out successfully!"});
}); 

const forgotpassword = AsyncErrorHandler(async function(req,res){
  const user = await userSchema.findOne({email:req.body.email});
  if(!user)
  {
      res.status(500).send("User not Found");
  }

  const resetPasstoken = await user.getResetPasswordToken();
  if(!resetPasstoken)
  {
      return res.send("Error while creating a reset password token!");
  }
  user.resetPasswordToken = resetPasstoken;
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/users/password/reset/${resetPasstoken}`;
  const message = `Your password reset token url is:--\n${resetPasswordUrl} ,if you didn't ask for this,please igoner it! `;
  try {
    await sendEmail({
        email:user.email,
        subject:`E-commerce Password Recovery!`,
        message
    });

    res.status(200).json({success:true,message:`Email has been sent to ${user.email} successfully!!`,url:resetPasswordUrl});
    
  } catch (error) {
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      await user.save({validateBeforeSave:false});
      return res.status(500).json({error})
  }

})

const resetPassword = AsyncErrorHandler(async(req,res)=>{

    const {email,password,confirmPassword,resetPasswordToken,newPassword} = req.body;

    const user = await userSchema.findOne({email,resetPasswordToken});
    console.log(user);
    if (!user) {
      return res.status(500).send("User not Found");
    }
    if(password !== confirmPassword)
    {
      return res.status(500).send("Not a valid password");
    }

    user.password = newPassword;
    user.resetPasswordExpire = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave:true});

    res.status(200).json({success:true});
})

module.exports = {createUser,loginUser,logoutUser,forgotpassword,resetPassword};