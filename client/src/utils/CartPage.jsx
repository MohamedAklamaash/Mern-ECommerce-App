import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/CartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(1);
  const items = useSelector((state) => state.cart);
  console.log("items:", items);

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
      <table className="flex flex-col border border-black">
        <thead className="md:flex items-center justify-evenly">
          <p>Product Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Increase Quantity</p>
          <p>Decrease Quantity</p>
          <p>Dispatch From cart</p>
        </thead>
        <div className="flex it">
          {items.map((item) => {
            return (
              <tbody className="w-[100%]">
                <main className="text-lg md:flex items-center justify-around ml:[200px] ">
                  <p>{item.productName}</p>
                  <p>{quantity * item.price}</p>
                  <p>{quantity}</p>
                  <button onClick={() => setquantity(quantity + 1)}>+</button>
                  <button
                    onClick={() => {
                      quantity === 0
                        ? setquantity(0)
                        : setquantity(quantity - 1);
                    }}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Dispatch from Cart 🛒
                  </button>
                </main>
              </tbody>
            );
          })}
        </div>
      </table>
    </div>
  );
};

export default CartPage;
