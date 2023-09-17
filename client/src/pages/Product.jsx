import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/CartSlice";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
  };

  const handleCart = (product) => {
    dispatch(add(product));
  };
  
  return (
    <div className="flex flex-col items-center">
      {console.log("Items:",items)}
      <Link to={`product/:${product._id}`}>
        <div className="p-3 flex flex-col items-center">
          <img src={product.images[0].url} width={230} height={130} />
          <h1 className="text-lg font-mono ">{product.name}</h1>
          <div>
            <ReactStars {...options} />
            <span className="text-lg font-mono">(256 reviews)</span>
          </div>
          <h3 className="text-xl text-orange-400">${product.price}</h3>
        </div>
      </Link>
      <button
        type="button"
        onClick={()=>handleCart(product)}
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Add to Cart 🛒
      </button>
    </div>
  );
};

export default Product;
