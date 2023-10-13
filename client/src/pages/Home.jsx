import React, { useEffect, useState } from "react";
import "./pages.css";
import mouseIcon from "../assets/icons8-mouse-64.png";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../store/CartSlice";
import { setProducts, statuses } from "../store/ProductSlice";
import { fetchProducts } from "../store/ProductSlice";
import FiltersComponent from "./FiltersComponent";
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/Carousel2.webp";
import pic3 from "../assets/images/Carousel3.jpeg";

const Home = () => {
  const dispatch = useDispatch();
  const slides = [pic1, pic2, pic3];
  const [backgroundImage, setbackgroundImage] = useState(slides[0]);
  const { data, status } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // console.log(data)

  // const itemsFunction = async () => {
  //   let res = await axios.get("http://localhost:5001/api/products/products")
  //   const jsonData = await res.data;
  //   console.log("Response:", res);
  //   setdata(jsonData.products);
  // };
  useEffect(() => {
    let currIndex = 0;
    const backgroundImageChange = ()=>{
      currIndex = (currIndex+1)%slides.length;
      setbackgroundImage(slides[currIndex]);
    }
    const interval = setTimeout(() => {
      backgroundImageChange();
    }, 5000);
    return(()=>{
      clearInterval(interval);
    })
  });
  if (status === statuses.LOADING) {
    return (
      <div className="flex items-center justify-center h-[100vmin]">
        <h1 className="text-4xl text-black">Loading....</h1>
      </div>
    );
  }

  // const product = {
  //   name: "Blue T-shirt",
  //   images: [
  //     {
  //       url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3y5WLA-9_heSoUD6cPFhI8qnwbZ7_jC64A&usqp=CAU",
  //     },
  //   ],
  //   price: 100,
  //   _id: "6505f2bf5b5fa97b95d5dcc8",
  // };

  // let outputArray = [];

  // function removewithfilter(arr) {
  //   let outputArray = arr.filter(function (v, i, self) {
  //     // It returns the index of the first
  //     // instance of each value
  //     return i == self.indexOf(v);
  //   });

  //   return outputArray;
  // }

  // if (items === null) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div className="bg-fixed bg-cover bg-center" style={{backgroundImage:`url(${backgroundImage})`,transition:"1s",objectFit:"cover"}}>
        <div className="h-[600px] flex items-center justify-end" >
          <h1 className="text-white text-[75px] font-semibold mb-[200px] mr-10 ">
            Begin Your Shopping Now 😍
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-4 px-4 py-2 mx-5 ">
        {data?.products?.map((product) => {
          return <Product product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
