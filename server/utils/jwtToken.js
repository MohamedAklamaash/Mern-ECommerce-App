
//created token and saved in cookie
const sendToken = (user,statusCode,res)=>
{
    const token = user.getJwtToken();
    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE*24* 60*60*1000),
      httpOnly:true,
    };
    return res.status(statusCode).cookie("token",token,options).json({success:true,user,token});
}

module.exports = {sendToken}