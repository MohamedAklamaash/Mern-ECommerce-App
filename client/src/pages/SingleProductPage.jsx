import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
const SingleProductPage = () => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 0,
    isHalf: true,
  };
  const { id } = useParams();
  const [productData, setproductData] = useState("");
  const data = async () => { 
    //need to change the product id to ${id}
    const req = await axios.get(
      `http://localhost:5001/api/products/products/64eb5c2dcaf46106f8fab9d9`
    );
    const res = req.data;
    console.log("REs", res);
    setproductData(res);
  };
  useEffect(() => {
    data();
  }, []);
  if (!productData.success) {
    return (
      <div>
        <header>
          <h1 className="text-4xl h-[100vmin] w-[100%] font-sans flex items-center justify-center">
            It's not your fault it's on us,We are looking into it
          </h1>
        </header>
      </div>
    );
  }
  return (
    <div>
      <main className="p-4 ">
        <div className="md:h-[50vmin] md:float-left md:w-[40%] max-md:h-[40vmax]">
          <img src={productData.product.images[0]} alt="Product " />
        </div>
        <div className="h-[50vmin]">
          <span>Device Name:</span>
          <h1 className="text-4xl font-mono">
            {productData.product.productName}
          </h1>
          <span>Category:</span>
          <h2 className="text-xl font-mono">{productData.product.category}</h2>
          <span className="text-xl font-mono">{productData.product.price}</span>
          <p className="text-xl font-mono">{productData.product.description}</p>
        </div>
        <div className="flex flex-col items-center justify-evenly">
          <span className="text-lg font-semibold">
            ({productData.product.reviews.length} reviews)
          </span>
          <p>
            {productData.product.reviews.map((review) => {
              options.value = review.rating;
              return (
                <div className="flex flex-col items-center">
                  <h1 className="font-mono">User:{review.name}</h1>
                  <div className="flex ">
                    <p> Review:</p>
                    <h1 className="text-lg font-sans ">{review.comment}</h1>
                  </div>
                  <ReactStars {...options} />
                </div>
              );
            })}
          </p>
          <span className="text-lg font-sans">Available Stock:</span>
          <p className="text-lg font-sans">{productData.product.stock}</p>
        </div>
      </main>
    </div>
  );
};

export default SingleProductPage;
