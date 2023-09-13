const mongoose = require("mongoose");

const mongoConnect = async()=>{
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@e-commerce.xdbrkkn.mongodb.net/E-Commerce?retryWrites=true&w=majority`
    ).then(()=>{
        console.log("Database connected successfully");
    }).catch(()=>{
        console.log("Database not connected");
    })
}

module.exports = mongoConnect;