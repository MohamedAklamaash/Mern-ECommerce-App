import React from "react";

const DressesSection = () => {
  return (
    <div className="h-screen flex flex-[1] text-4xl items-center justify-center gap-7 font-serif">
      <a href="https://aklamaash-e-commerce.vercel.app/apparels?category=Women'sDresses" className=" ">
        Women's dresses
      </a>
      <a href="https://aklamaash-e-commerce.vercel.app/apparels?category=Men'sClothing">
        Men's Clothing
      </a>
      <a href="https://aklamaash-e-commerce.vercel.app/apparels?category=MenAccessories">
        Men's Accessories
      </a>
    </div>
  );
};

export default DressesSection;
