import React,{useEffect} from 'react';
import { fetchLaptopsfromdb } from '../store/LaptopSlice';
import { useDispatch,useSelector } from 'react-redux';
import Product from './Product';
import { statuses } from '../store/ProductSlice';
const LaptopsSection = () => {
  const {data,status} = useSelector((state)=>state.laptop);
  const dispatch = useDispatch();
  console.log("data in laptops section:",data);
  useEffect(()=>{
    dispatch(fetchLaptopsfromdb()); 
  },[]);
    if (status === statuses.LOADING) {
      return (
        <div className='h-[100vmin] text-4xl w-[100%]'>
          <h1>Loading...</h1>
        </div>
      );
    }
  return (
    <div>
      <main className="grid md:grid-cols-4 grid-cols-2">
      {
        data.products.map((product)=>{
          return(
            <Product product={product}/>
          )
        })
      }
      </main>
    </div>
  );
}

export default LaptopsSection