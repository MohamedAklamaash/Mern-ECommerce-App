import React, { useEffect } from "react";
import "./pages.css";
import mouseIcon from "../assets/icons8-mouse-64.png";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/reducers/ProductSlice";
// import { add, remove } from "../store/reducers/CartSlice";
import FiltersComponent from "./FiltersComponent";
const Home = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);
  // const itemsFunction = async () => {
  //   let res = await axios.get("http://localhost:5001/api/products/products")
  //   const jsonData = await res.data;
  //   console.log("Response:", res);
  //   setdata(jsonData.products);
  // };

  const product = {
    name: "Blue T-Shirt",
    images: [
      {
        url: "https://media.istockphoto.com/id/186864796/photo/young-man-three-quarter-portrait.jpg?s=2048x2048&w=is&k=20&c=B8Gzir5R_Mw6TqZc-2busuFzrjJrxbyG-t6pUtemRds=",
      },
    ],
    price: 10,
    _id: "aklamaash",
  };

  // let outputArray = [];

  // function removewithfilter(arr) {
  //   let outputArray = arr.filter(function (v, i, self) {
  //     // It returns the index of the first
  //     // instance of each value
  //     return i == self.indexOf(v);
  //   });

  //   return outputArray;
  // }

  // useEffect(()=>{
  //   dispatch(setProducts(fetchProducts()))
  // },[]);
  // if (items === null) {
  //   return <div>Loading...</div>;
  // }
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // });
  return (
    <div>
      {console.log("Item:", data)}
      <div className="flex flex-col text-center items-center justify-center text-white bg-gradient-to-b from-blue-700 to-slate-400 h-[100vmin] m-[5vmax] text-4xl banner  ">
        <p>Welcome to E-commerce</p>
        <h1>Find Amazing products below</h1>
        <i className="flex ">
          <img src={mouseIcon} alt="icon" />{" "}
          <p>Scroll to find amazing products</p>
        </i>
      </div>
      <div className="flex items-center justify-center mt-3">
        <h1 className=" ml-3 border border-x-0 w-[27%] text-center px-3 py-5 border-b-4 my-4 border-t-0 border-black text-4xl font-bold   ">
          Featured Products
        </h1>
      </div>

      <div className="grid md:grid-cols-4 px-4 py-2 mx-5">
        <FiltersComponent className="m:[5rem]" />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </div>
  );
};

export default Home;