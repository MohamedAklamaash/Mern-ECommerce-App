import React,{useState} from "react";
import logo from "../assets/NavLogo.jpeg";
import { useNavigate } from "react-router-dom";
import search from "../assets/search-alt-2-svgrepo-com.svg";
import userLogo from "../assets/user-single-solid-svgrepo-com.svg";
import shoppingCart from "../assets/shopping-cart-svgrepo-com.svg";
import hamBurgerLogo from "../assets/three-horizontal-lines-icon.svg";
const Navbar = () => {
  const [state, setstate] = useState(0);
  const navigate = useNavigate();
  return (
    <div className=" ">
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
          <h4
            className=" hover:text-violet-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </h4>
          <h4
            className=" hover:text-violet-400 cursor-pointer"
            onClick={() => navigate("/aboutUs")}
          >
            About
          </h4>
          <h4
            className=" hover:text-violet-400 cursor-pointer"
            onClick={() => navigate("/products")}
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
          />
          <img src={search} alt="search" className="w-6 h-6 cursor-pointer " />
          <img
            src={shoppingCart}
            alt="search"
            className="w-6 h-6 cursor-pointer "
          />
          <img src={userLogo} alt="search" className="w-6 h-6 cursor-pointer" onClick={()=>navigate("/login")} />
        </div>
        <div className="max-sm:inline-block hidden ">
          <img src={hamBurgerLogo} alt="hamBurgerLogo" width={25} height={25} />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
