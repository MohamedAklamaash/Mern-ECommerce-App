import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/CartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(0);
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
    <div className="flex items-center justify-center">
      <main >
        <table className="">
          <thead>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </thead>
          <div className="flex flex-row items-center">
            {items.map((item) => {
              return (
                <div>
                  <tbody>
                    <td>{item.name}</td>
                    <td>{quantity * item.price}</td>
                    <td>Quantity:{quantity}</td>
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
                  </tbody>
                </div>
              );
            })}
          </div>
        </table>
      </main>
    </div>
  );
};

export default CartPage;
