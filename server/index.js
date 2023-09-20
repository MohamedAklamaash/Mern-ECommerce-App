const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const mongoConnect = require("./mongoConnection")();
const cookieParser = require("cookie-parser");
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const orders = require("./routes/orderRoute");
const cors = require("cors");
const payment = require("./routes/paymentRoute");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/api/products",product);
app.use("/api/users",user);
app.use("/api/orders",orders);
app.use("/api/payment",payment);
app.get("/api/apikey", async (req, res) => {
  return res.status(200).json({ key: process.env.razorpay_api_key_id });
});
process.on("unhandledRejection", (err) => {
  console.log("Closing the server");
    server.close(() => {
        console.log("Closing the server");
        process.exit(1);
    });
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception");
  if(err.name=="CastError")
  {
    console.log("Cast Error");
    
  }
  server.close(()=>{
    process.exit(1);
  });
});

const server = app.listen(process.env.port,()=>{
    console.log("app is listening on port")
})
