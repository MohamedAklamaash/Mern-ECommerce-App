import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchPhoneProducts } from '../store/PhoneSlice';
import Product from './Product';
import { statuses } from '../store/ProductSlice';
const PhonesSection = () => {
  const {data,status} = useSelector((state) => state.phone);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchPhoneProducts());
  },[])
  console.log("Status:",status);
  if(status === statuses.LOADING)
  {
    return(
        <div>
            <h1>
                Loading...
            </h1>
        </div>
    )
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

export default PhonesSection;