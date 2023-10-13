import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import { statuses } from "../store/ProductSlice";
const PhonesSection = () => {
  const [dataarr, setdataarr] = useState([]);
  const [status, setstatus] = useState(statuses.LOADING);
  const fetchProducts = async () => {
    try {
      const fetched = await axios.get(
        "https://aklamaash-e-commerce.vercel.app/api/products/products?category=Laptop"
      );
      const json = fetched.data;
      setdataarr(json.products);
      setstatus(statuses.IDLE);
    } catch (error) {
      console.log("Error in phones section");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (status === statuses.LOADING) {
    return (
      <div className="text-4xl h-[100vmin] w-[100%] flex items-center justify-center  ">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <main className="grid md:grid-cols-4 grid-cols-2">
        {dataarr.map((product) => {
          return <Product product={product} />;
        })}
      </main>
    </div>
  );
};

export default PhonesSection;
