import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addCart, removeCart } from '../app/cart-slice';

export default function Service({ Service }) {
  // const dispatch = useDispatch()
  // const handleAddCart=()=>{
  //   dispatch(addCart(Service))
  // }
  
  // const handleRemoveCart=()=>{
  //   dispatch(removeCart(Service.id))
  // }

  // const{cart}=useSelector(state=>state)


  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md flex flex-col h-full">
      <div className="">
        <img src={Service.image} alt={Service.title} className="w-full h-40 object-contain" />
        <h3 className="text-lg font-semibold mt-2">{Service.title}</h3>
        <p className="text-gray-600">${Service.price}</p>
      </div>

      {/* Button positioned at the bottom */}
      {/* <div className="mt-auto">
        <button className="bg-red-950 text-white border-2 rounded-lg font-semibold p-4 mb-1 w-full" onClick={
          // cart.some(item=>item.id===Service.id)?handleRemoveCart:handleAddCart
        }
        >
         {
          // cart.some(item=>item.id===Service.id)?'remove from cart' : 'add to cart'
        }
        </button>
      </div> */}
    </div>
  );
}
