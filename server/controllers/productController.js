const productSchema = require("../models/productSchema");
const {body,validationResult} = require("express-validator");
const AsyncErrorHandler = require("../middleware/AsyncErrorHandler");
const ApiFeatures = require("../utils/features");
const createProduct =AsyncErrorHandler( async(req,res)=>{
    body("productName").isLength({min:5,max:20});
    body("description").isLength({min:10});
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
            success: false,
            errors: errors.array(),
            });
        }

        req.body.user = req.user.id;

        const product = await productSchema.create(req.body);
        res.status(201).json({message:"Product Created Successfully",product})
    } catch (error) {
        res.status(500).json({success:false});
        console.log("Product not created!");
    }
});

const getAllProducts = AsyncErrorHandler(async (req, res) => {
  const resultsPerPage = 5;
  const productCount = await productSchema.countDocuments();
  const apiFeature = new ApiFeatures(productSchema.find(), req.query).search().filter().pagination(resultsPerPage);
  const products = await apiFeature.query;
  if (!products) {
    return res.json({ success: false });
  }
  res.json({ success: true, products , productCount });
});

const updateProduct = AsyncErrorHandler(async(req,res)=>{
    let product = await productSchema.findById(req.params.id);
    if(!product)
    {
        return res.status(500).json({success:false});
    }
    product = await productSchema.findByIdAndUpdate(req.params.id,req.body,
    {
        new:true,
        runValidators:true,
        useFindAndModify:true
    })
    res.status(200).json({success:true,product});
});


const getProductDetails =AsyncErrorHandler(async(req,res)=>{
    let product = await productSchema.findById(req.params.id);
    if(!product)
    {
        return res.status(501).json({success:false,msg:"Product not found"});
    }
    res.status(200).json({success:true,product});
});

const getDetailsOfSingleProduct =AsyncErrorHandler(async(req,res)=>{
    let product = await productSchema.findById(req.params.id);
    if (!product) {
        return res
        .status(501)
        .json({ success: false, msg: "Product not found" });
    }
    res.status(200).json({ success: true, product });
})

module.exports = {createProduct,getAllProducts,updateProduct,getProductDetails,getDetailsOfSingleProduct};