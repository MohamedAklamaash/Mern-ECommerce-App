const mongoose = require("mongoose");

const mongoConnect = async()=>{
    await mongoose
      .connect(
        `mongodb+srv://aklamaash:N4OGo3YYg8CNZxUl@e-commerce.xdbrkkn.mongodb.net/E-Commerce?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch(() => {
        console.log("Database not connected");
      });
}

module.exports = mongoConnect;