const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.razorpay_api_key_id,
  key_secret: process.env.razorpay_api_key_secret,
});

module.exports = { instance };