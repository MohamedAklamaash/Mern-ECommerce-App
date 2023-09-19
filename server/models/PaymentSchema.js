const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_signature:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("paymentDetails",paymentSchema);