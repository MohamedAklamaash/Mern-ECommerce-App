const userSchema = require("../models/userSchema")

const getUserDetails = async(req,res)=>{
    const user = await userSchema.findById(req.user.id);
    if(!user)
    {
        return res.send("Please login to access this!");
    } 
    res.status(200).json({success:true,user});
}

const updateUserDetails = async (req, res) => {
  const user = await userSchema.findById(req.user.id);
  if (!user) {
    return res.send("Please login to access this!");
  }
  const { newUserName, newEmail } = req.body;
  user.name = newUserName;
  user.email = newEmail;
  await user.save({ validateBeforeSave: true });
  res.status(200).json({ success: true, msg: "User name updated" });
};

const updateUserPassword = async(req,res)=>{
    const user = await userSchema.findById(req.user.id);
    if (!user) {
      return res.send("Please login to access this!");
    } 
    const {CurrentPassword,newPassword} = req.body;
    if(req.user.password !== CurrentPassword)
    {
        return res.send("Provided password is not the same as the current password,if interested try restting the password!");
    }    
    user.password = newPassword;
    await user.save({validateBeforeSave:true});
    res.status(200).json({success:true,msg:"Password updated!"});
}

const updateUserProfile = async(req,res)=>{
    const { imageUrl } = req.body;
    const user = await userSchema.findById(req.user.id,imageUrl,{
        new:true,
        runValidators:true,
        useFindAndModify:true,
    });
    await user.save({validateModifiedOnly:true});
    res.status(200).json({success:true,message:"Profile pic updated"});
}

const deleteUser = async(req,res)=>{
    const user = await userSchema.findById(req.user.id);
    try {
        if(!user)
        {
            res.send("Please Login!");
        }
        await userSchema.findByIdAndDelete(req.user.id);
        res.status(200).json({success:true,message:"User deleted successfully"});
    } catch (error) {
        res.status(500).send("Error in Server try again later!");
    }
}

module.exports = {getUserDetails,updateUserDetails,updateUserPassword,updateUserProfile,deleteUser};