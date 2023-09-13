const AsyncErrorHandler = require("../middleware/AsyncErrorHandler");
const orderSchema = require("../models/OrderSchema");
const productSchema = require("../models/productSchema");

const newOrder = AsyncErrorHandler(async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus,
      deliveredAt,
      createdAt,
    } = req.body;

    const order = await orderSchema.create({
      shippingInfo,
      orderItems,
      user:req.user.id,
      paymentInfo,
      paidAt:Date.now(),
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus,
      deliveredAt,
      createdAt,
    });

    if(!order)
    {
        return res.status(500).json({success:false,message:"Try ordering later"});
    }

    return res.status(201).json({success:true,message:"Order Placed Successfully"});

  } catch (error) {
    console.log("Error in making the order");
    return res
        .status(500)
        .json({ success: false, message: "Try ordering later" });
  }
});

const getSingleOrder = AsyncErrorHandler(async(req,res)=>{
  const order = await orderSchema.findById(req.params.id).populate("user","name email");
  if(!order)
  {
    return res.status(501).send("Order is not made using this id");
  }
  return res.status(200).json({success:true,order});
})

const myOrders = AsyncErrorHandler(async(req,res)=>{
  const orders = await orderSchema.find({user:req.user.id});
  if (!orders) {
    return res.status(501).send("No Order is made using this userID");
  }

  return res.status(200).json({ success: true, orders});

})

//this is just done by the admin to calculate the total price of all the orders...
const getAllOrders = AsyncErrorHandler(async(req,res)=>{
  const orders = await orderSchema.find();
  let totalAmount = 0;
  orders.forEach((order)=>{
    totalAmount+=order.totalPrice;
  })
  if (!orders) {
    return res.status(501).send("No Order is made using this userID");
  }
  return res.status(200).json({ success: true, totalAmount , orders });

})

const updateStock = async(itemId,quantity)=>{
  const product = await productSchema.findById(itemId);
  if(!product)
  {
    return res.status(501).json({success:false,message:"Product not found"});
  }
  product.stock -= quantity;
  if(product.stock<0)
  {
    product.stock=0;
  }
  await product.save({validateBeforeSave:false});

}

const orderUpdate = AsyncErrorHandler(async(req,res)=>{
  const order = await orderSchema.findById(req.params.id);
  if (!order) {
    return res.status(501).send("No Order is made using this userID");
  }
  if(order.orderStatus === "Delivered")
  {
    return res.status(500).send("Message has already been delivered");  
  } 
  if(order.orderItems === "Pending")
  {
    order.orderItems.forEach(async(orders)=>{
      await updateStock(orders.product,orders.quantity);
    })
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
  success: true,
  message:"Your order will arrive shortly",
  });
})

const deleteOrder = AsyncErrorHandler(async(req,res)=>{
  const order = await orderSchema.findByIdAndRemove(req.params.id);

  if (!order) {
    return res.status(501).send("No Order is made using this userID");
  }  
  res.status(200).json({
    success: true,
  });
})

module.exports = {newOrder,getSingleOrder,myOrders,getAllOrders,deleteOrder,orderUpdate};
