import React, { useState,useRef } from "react";
import logo from "../assets/NavLogo.jpeg";
import { useNavigate } from "react-router-dom";
import searchBtn from "../assets/search-alt-2-svgrepo-com.svg";
import userLogo from "../assets/user-single-solid-svgrepo-com.svg";
import shoppingCart from "../assets/shopping-cart-svgrepo-com.svg";
import hamBurgerLogo from "../assets/three-horizontal-lines-icon.svg";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
const Navbar = () => {
  //would be better if we use useQuery();
  const loadCounter = useRef(0);
  const cartItems = useSelector((state)=>state.cart);
  const [search, setsearch] = useState("");
  const navigate = useNavigate();

  const HandleSearch = (event) => {
    setsearch(event.target.value);
    Cookies.set("searchValue",search);
  };

  return (
    <div className=" pt-3 px-4 font-serif ">
      <header className="flex justify-between items-center">
        <div className="w-[60px]">
          <img
            src={logo}
            alt="Logo"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
        </div>
        <div className="flex text-lg gap-3 max-sm:hidden">
          <a className=" hover:text-violet-400 cursor-pointer" href="/">
            Home
          </a>
          <h4
            className=" hover:text-violet-400 cursor-pointer"
            onClick={() => navigate("/aboutUs")}
          >
            About
          </h4>
          <h4
            className=" hover:text-violet-400 cursor-pointer"
            onClick={() => navigate("/productsComponent")}
          >
            Product
          </h4>
          <h4
            className=" hover:text-violet-400 cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact
          </h4>
        </div>
        <div className="flex gap-4 max-sm:hidden">
          <input
            type="text"
            className="w-[10rem] h-4 rounded-full border border-slate-700  px-2 py-4"
            placeholder="Search for Products"
            onChange={HandleSearch}
          />
          <img
            src={searchBtn}
            alt="search"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              loadCounter.current += 1;
              if (loadCounter.current % 2 === 0) {
                loadCounter.current = 0;
                window.location.reload();
              }
              navigate(`/search?keyword=${search}`);
            }}
          />
          <button className="flex flex-row-reverse  ">
            {cartItems.length}
            <img
              src={shoppingCart}
              alt="search"
              className="w-6 h-6 cursor-pointer "
              onClick={() => navigate("/cart")}
            />
          </button>
          <img
            src={userLogo}
            alt="search"
            className="w-6 h-6 cursor-pointer"
            onClick={() => navigate("/login")}
          />
        </div>
        <div className="max-sm:inline-block hidden ">
          <img src={hamBurgerLogo} alt="hamBurgerLogo" width={25} height={25} />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
