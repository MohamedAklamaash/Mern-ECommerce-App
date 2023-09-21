import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/CartSlice";
import { useLocation } from "react-router-dom";
const SearchProductsComponent = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  const [res, setres] = useState([]);
  const handleProducts = async () => {
    const url = `http://localhost:5001/api/products/products?keyword=${keyword}`;
    try {
      const searchFunc = await axios.get(url);
      const res = await searchFunc.data;
      let { products } = res;
      products = Object.keys(products).map((key) => products[key]);
      setres(products);
    } catch (error) {
      window.location.reload();
    }
  };
  useEffect(() => {
    handleProducts();
  }, []);
  const handleCart = (product) => {
    dispatch(add(product));
  };

  if (res.length === 0) {
    return (
      <div>
        <h1>The product that you are searching for is not available.</h1>
      </div>
    );
  }

  return (
    <div className="p-3 grid md:grid-cols-3 items-center justify-center grid-cols-1 ">
      {res.map((r) => {
        return (
          <div key={r._id} className="">
            <main className="">
              <div className="float-left h-[40vmin] w-[30%]  ">
                <img
                  src={r.images[0].url}
                  alt={r.productName}
                  width={200}
                  height={200}
                  className="flex items-center justify-center"
                />
              </div>
              <div className="h-[40vmin]">
                <h1 className="text-xl font-mono">{r.productName}</h1>
                Price:<p className="text-lg font-mono">₹{r.price}</p>
                Category<p className="text-lg font-mono">{r.category}</p>
                <button
                  type="button"
                  onClick={() => handleCart(r)}
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Add to Cart 🛒
                </button>
              </div>
            </main>
          </div>
        );
      })}
    </div>
  );
};

export default SearchProductsComponent;
