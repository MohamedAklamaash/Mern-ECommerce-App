import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/CartSlice";
import axios from "axios";
import trashPng from "../assets/images/trash-icon-recycle-and-trash-sign-symbol-icon-free-png.webp";
const CartPage = () => {
  const dispatch = useDispatch();
  let [totalAmount, settotalAmount] = useState(0);
  const [quantity, setquantity] = useState(1);
  const items = useSelector((state) => state.cart);

  const handleCheckout = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:5001/api/apikey");
      const {
        data: { order },
      } = await axios.post("http://localhost:5001/api/payment/checkout", {
        amount,
      });
      console.log("Order:",order);
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Mohamed Aklamaash",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/111295679?v=4",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:5001/api/payment/paymentVerification",
        prefill: {
          name: "Aklamaash",
          email: "aklamaashehsan@example.com",
          contact: "6369202355",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("Error in payment gateway")
    }
  };
      console.log(window);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-[100vmin] text-3xl font-serif">
        <h1>The Cart is Empty🥲</h1>
        <h1> Feel free to explore our Shop</h1>
      </div>
    );
  }

  const handleRemove = (itemId) => {
    dispatch(remove(itemId));
  };

  return (
    <div className="">
      <header className="text-center text-4xl mb-4">
        <h1>Welcome to Cart Page:</h1>
      </header>
      <main className="flex items-center justify-center mb-4">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Increment</th>
              <th>Decrement</th>
              <th>Remove From cart</th>
            </tr>
          </thead>
          {items.map((item, index) => {
            console.log("index:", item._id);
            return (
              <tbody className="text-center">
                <tr>
                  <td>
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      width={200}
                      height={200}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{(totalAmount += quantity * item.price)}</td>
                  <td>{quantity}</td>
                  <td>
                    <button onClick={() => setquantity(quantity + 1)}>+</button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        quantity === 1
                          ? setquantity(1)
                          : setquantity(quantity - 1);
                      }}
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <img
                      src={trashPng}
                      alt="Remove From cart"
                      width={50}
                      height={50}
                      className="md:ml-10 max-md:ml-4  "
                      onClick={() => handleRemove(item._id)}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </main>
      <main className="flex flex-col items-center justify-center font-mono">
        <h1 className="text-2xl">Total Price:{totalAmount}</h1>
        <button className="" onClick={() => handleCheckout(totalAmount)}>
          Checkout
        </button>
      </main>
    </div>
  );
};

export default CartPage;
