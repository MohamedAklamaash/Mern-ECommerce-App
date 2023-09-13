import React from 'react';
import ReactStars from "react-rating-stars-component";
import {Link} from "react-router-dom";
const Product = ({product}) => {
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600?20:25,
    value:2.5,
    isHalf:true,
  }
  return (
    <Link to={product._id}>
      <div className="flex flex-col max-sm:items-center ">
        <img src={product.images[0].url} width={230} height={130} />
        <h1 className='text-lg font-mono '>{product.name}</h1>
        <div>
          <ReactStars {...options} />
          <span className='text-lg font-mono'>(256 reviews)</span>
        </div>
        <h3 className='text-xl text-orange-400'>${product.price}</h3>
      </div>
    </Link>
  );
}

export default Product