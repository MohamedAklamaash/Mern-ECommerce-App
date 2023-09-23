import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { statuses } from "../store/ProductSlice";
import Product from "./Product";

const DressesHandlelerComponent = () => {
  const [dataarr, setdataarr] = useState([]);
  const [status, setstatus] = useState(statuses.LOADING);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const fetchProducts = async () => {
    console.log("Category:",category);
    try {
      const products = await axios.get(
        `http://localhost:5001/api/products/products?category=${category}`
      );
      const res = products.data;
      setdataarr(res.products);
      console.log("Data:", res.products);
      setstatus(statuses.IDLE);
    } catch (error) {
      console.log("Error in Dresses Handler Component");
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

export default DressesHandlelerComponent;
