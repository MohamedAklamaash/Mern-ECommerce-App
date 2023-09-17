import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/CartSlice";

const SearchProductsComponent = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);

  const searchVal = Cookies.get("searchValue");
  const [res, setres] = useState([]);
  console.log("searchVal:", searchVal);
  const handleProducts = async () => {
    console.log("search value:", searchVal);
    const url = `http://localhost:5001/api/products/products?keyword=${searchVal}`;
    console.log(url);
    try {
      const searchFunc = await axios.get(url);
      const res = await searchFunc.data;
      let { products } = res;
      products = Object.keys(products).map((key) => products[key]);
      setres(products);
      console.log(products);
    } catch (error) {
      console.log("err is searching for the query:", error);
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
    <div>
      {res.map((r) => {
        console.log(r.productName);
        return (
          <div key={r._id} className="">
            <main className="p-3 grid md:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              <div className="float-left h-[40vmin] w-[30%]  ">
                <img
                  src={r.images[0].url}
                  alt={r.productName}
                  width={400}
                  height={400}
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
