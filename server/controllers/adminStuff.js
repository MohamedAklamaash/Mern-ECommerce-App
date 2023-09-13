const userSchema = require("../models/userSchema")
const AsyncErrorHandler = require("../middleware/AsyncErrorHandler");
const getAlluserDetails = async(req,res)=>
{
    const user = await userSchema.findById(req.user.id);
    if(user.role!=="admin")
    {
        return res.send("Sorry!Come and fucking work here to access this shit");
    }
    const users = await userSchema.find();
    if(!users)
    {
        res.status(500).json({message:"Cannot access the details"});
    }
    res.status(200).json({users});
}

const deleteProduct = AsyncErrorHandler(async (req, res) => {
  let product = await productSchema.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(500).json({ success: false, msg: "Product not found" });
  }
  res.status(200).json({ success: true, msg: "Product deleted successfully!" });
});

module.exports = {getAlluserDetails,deleteProduct};