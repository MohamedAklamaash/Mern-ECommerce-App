const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the price of the product"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
  category:{
    type:String,
    required:[true,"Please enter the category name"],
  },
  
  stock:{
    type:Number,
    required:[true,"Please Enter product stock"],
    maxLength:[4,"Product's stock cannot exceed 4 digit"],
    default:1,
  },
  numofReviews:{
    type:Number,
    minlength:[1,"Minimum number of reviews should be at least one"]
  },
  reviews:[
    {
      user:{
      type : mongoose.SchemaTypes.ObjectId , 
      ref:"User",
      required:true,
      },
      name:{
          type:String,
          required:true,
      },
      rating:{
          type:Number,
          required:true,
      },
      comment:{
          type:String,
          required:true,
      }
    }
  ],
  user:{
    type : mongoose.SchemaTypes.ObjectId , 
    ref:"User",
    required:true,
  },
  createdAt:{
    type:Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model("Products",ProductSchema);