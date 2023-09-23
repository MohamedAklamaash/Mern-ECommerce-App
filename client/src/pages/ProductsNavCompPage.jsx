import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneCompPic from "../assets/images/PhonesComponent.jpeg";
const ProductsNavCompPage = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-hidden ">
      <main className="md:flex ">
        <div>
          <a href="/phoneSection">
            <img
              width={550}
              height={550}
              src={PhoneCompPic}
              alt="PhoneLogo"
            />
          </a>
        </div>
        <div>
          <a href="/laptopSection">
            <img
              width={500}
              height={500}
              src="https://imgv3.fotor.com/images/blog-cover-image/make-photo-collages-on-laptop.webp"
              alt="Laptop pic"
            />
          </a>
        </div>
        <div>
          <a href="/dressSection">
            <img
              width={277}
              height={260}
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80"
              alt="Dress Pic"
            />
          </a>
        </div>
      </main>
    </div>
  );
};

export default ProductsNavCompPage;
