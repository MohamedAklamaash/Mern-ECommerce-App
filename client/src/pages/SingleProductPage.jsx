import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/CartSlice";
import "./common.css"

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 0,
    isHalf: true,
  };
  const { id } = useParams();
  const formattedId = id.slice(1);
  const [productData, setproductData] = useState("");
  const data = async () => {
    try {
      const url = `https://aklamaash-e-commerce.vercel.app/api/products/products/${formattedId}`;
      const req = await axios.get(url);
      const res = req.data;
      setproductData(res);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    data();
  });
  // if (!productData.success) {
  //   return (
  //     <div>
  //       <header>
  //         <h1 className="text-4xl h-[100vmin] w-[100%] font-sans flex items-center justify-center">
  //           It's not your fault it's on us,We are looking into it
  //         </h1>
  //       </header>
  //     </div>
  //   );
  // }
  const handleCart = (productData) => {
    dispatch(add(productData));
  };
  return (
    <div>
      <main className="p-4 ">
        <div className="md:h-[50vmin] md:float-left md:w-[40%] max-md:h-[40vmax] max-md:mb-[100px]">
          <img
            src={productData?.product?.images[0]?.url}
            alt="Product "
            width={400}
            height={400}
          />
        </div>
        <div className="h-[50vmin] max-md:mb-[200px]">
          <span>Product Name:</span>
          <h1 className="text-4xl font-mono">
            {productData?.product?.productName}
          </h1>
          <span>Category:</span>
          <h2 className="text-xl leading-10  font-mono">
            {productData?.product?.category}
          </h2>
          <span className="text-xl leading-10  font-mono">
            ${productData?.product?.price}
          </span>
          <p className="text-xl leading-10  font-mono description">
            {productData?.product?.description}
          </p>
          <button
            type="button"
            onClick={() => handleCart(productData.product)}
            className="py-2.5 px-5 mr-2 mt-6 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Add to Cart 🛒
          </button>
        </div>
        <div className="flex flex-col items-center justify-evenly mt-[100px]">
          <span className="text-lg font-semibold">
            ({productData?.product?.reviews.length} reviews)
          </span>
          <p>
            {productData?.product?.reviews.map((review) => {
              options.value = review?.rating;
              return (
                <div className="flex flex-col items-center leading-10 ">
                  <h1 className="font-mono leading-10 ">User:{review?.name}</h1>
                  <div className="flex ">
                    <p> Review:</p>
                    <h1 className="text-lg font-sans leading-10  ">
                      {review?.comment}
                    </h1>
                  </div>
                  <ReactStars {...options} />
                </div>
              );
            })}
          </p>
          <span className="text-lg font-sans">Available Stock:</span>
          <p className="text-lg font-sans">{productData.product?.stock}</p>
        </div>
      </main>
    </div>
  );
};

export default SingleProductPage;
