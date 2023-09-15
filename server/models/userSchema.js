const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name cannot be less than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [6],
    maxlength: [15],
    select:false,
  },
  avatar: {
      public_id: {
        type: String,
        default:mongoose.SchemaTypes.ObjectId,
      },
      url: {
        type: String,
        required: true,
      },
    },
   role:{
    type:String,
    default:"user",
   },
   resetPasswordToken:String,
   resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){
    //here arrow  functions are not used cuz this cannot be used there
    if(!this.isModified("password"))
    {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function()
{
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

module.exports = mongoose.model("Users",userSchema);