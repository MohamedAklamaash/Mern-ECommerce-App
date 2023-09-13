const AsyncErrorHandler = require("../middleware/AsyncErrorHandler");
const productSchema = require("../models/productSchema");
const userSchema = require("../models/userSchema");

const deleteProduct = async(req,res)=>{
    const product = productSchema.findById(req.params.id);
    if(!product)
    {
        return res.status(200).json({success:false,message:"Cannot detect product"});
    }

    try {
            await product.findByIdAndDelete(req.params.id);
            res.status(200).json({success:true});   
    } catch (error) {
        console.log("Cannot Delete ")
    }

}

const createProductReview = AsyncErrorHandler(async(req,res)=>{
    try {
        const { rating, comment, productId } = req.body;
        const user = userSchema.findById(req.user.id);
        const product = await productSchema.findById(productId);
        if(!user || !product)
        {
            return res.status(500).send("Cannot Review Product");
        }

        const review = {
            user:req.user.id,
            name:req.user.name,
            rating:Number(rating),
            comment,
        };

        const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user.id.toString()); 
        if(isReviewed)
        {
            product.reviews.forEach(rev=>{
                if(rev.user.toString()===req.user.id)
                {
                    rev.rating = rating;
                    rev.comment = comment;
                }
            })
        }
        else
        {
            product.reviews = review;
            product.numofReviews = product.reviews.length;
        }
        let avg = 0;
        product.rating = product.reviews.forEach(rev => {
            avg += rev.rating;
        });
        product.rating = avg / product.reviews.length;
        await product.save({ validateBeforeSave: false });
        return res.status(201).json({ success: true, product });

    } catch (error) {
        console.log("Error in reviewing the product");
        return res.status(501).json({success:false,message:"Bug in reviewing the product"});
    }
})

const getProductReview = AsyncErrorHandler(async(req,res)=>{
    try {
        const { id } = req.body;
        const product = await productSchema.findById(id);
        if(!product)
        {
            return res.status(501).json({success:false,message:"Cannot get all the reviews of the product"});
        }
        return res.status(201).json({success:true,reviews:product.reviews});
    } catch (error) {
        return res
            .status(501)
            .json({
            success: false,
            message: "Cannot get all the reviews of the product",
            });    
    }
})

const deleteReview = AsyncErrorHandler(async(req,res)=>{
    try {
        const {productId} = req.body;
        const product = await productSchema.findById(productId);
        if (!product) {
          return res.status(500).send("Cannot Delete the review of the Product");
        }
        //req.query.id is the id that tells about the specific reviwer with respect to the id..
        const productReviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString());
        let avg = 0;
        product.rating = product.reviews.forEach((rev) => {
          avg += rev.rating;
        });
        const rating = avg / productReviews.length;
        const numofReviews = productReviews.length;
        await productSchema.findByIdAndUpdate(productId,{
            productReviews,
            numofReviews,
            rating
        });

        await product.save({validateBeforeSave:false});
        return res.status(200).json({success:true})
    } catch (error) {
        return res
            .status(500)
            .send("Cannot Delete the review of the Product");   
    }
})

module.exports = {deleteProduct,createProductReview,getProductReview,deleteReview};