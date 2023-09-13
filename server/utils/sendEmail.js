const nodemailer = require("nodemailer");

const sendEmail = async(options)=>{
    //need to configure mail,mail sending is not working properly,
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farhee@gmail.com",
        pass: "akla123",
      },
    });

    const mailOptions = {
        from:"aklamaash78@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

    transporter.sendMail(mailOptions,(err,data)=>{
      if(!err)
      {
        console.log("Message sent successfully!"); 
      }
      if(err)
      {
        console.log("Message not sent:",err);
      }
    });

}

module.exports = {sendEmail};