import { AppContext } from '@/context/AppContext';
import React, { use, useContext, useEffect, useState } from 'react'
import { urlForImage } from "../../../sanity/lib/image";


function Productos({item}) {

    const { cart, updateCartItem, removeFromCart } = useContext(AppContext);
    const [counter, setCounter] = useState(1);
    useEffect(() => {
        if(item){
            setCounter(item.qty)
        }
    },[])
    
    useEffect(() => {
        updateCartItem(item.product._id, counter);
    }, [counter]);


  return (
    <div className='w-[94px] h-[107px]'>

    <div  className="w-full h-full flex flex-row   gap-[31px]">
  <img src={urlForImage(item?.product.imagenes[0]?.asset._ref)}  className="w-full h-full lg:w-[78px] lg:h-[90px] object-cover" alt="imagen producto" />
  </div>

    <div className="flex flex-col  justify-center">
      <span className="font-inter font-bold text-[11px] lg:text-[16px] ">
        {item.product.nombre}
      </span>
      <p className="text-[10px] font-medium w-full">
        {item.product.descripcion.slice(0, 40)}
      </p>
      <div className="flex flex-row items-center justify-center gap-[23px]">
      <button className="w-[25px] h-[25px] rounded-[7px] border-[2px] border-[#E39C9D] text-[#E39C9D] text-[15px] flex flex-col items-center justify-center "
      onClick={() => {
          if (counter - 1 > 0) {
            setCounter(counter - 1);
          }
        }}
      >
        -
      </button>
      <span className="font-inter text-[20px] ">{counter}</span>
      <button className="w-[25px] h-[25px] rounded-[7px] border-[2px] border-[#E39C9D] text-[#E39C9D] text-[15px] flex flex-col items-center justify-center"
      onClick={()=>setCounter(counter+1)}>
        +
      </button>
    </div>
    </div>
    <div className="hidden lg:flex flex-row items-center justify-center gap-[23px]">
      <button className="w-[25px] h-[25px] rounded-[7px] border-[2px] border-[#E39C9D] text-[#E39C9D] text-[15px] flex flex-col items-center justify-center "
      onClick={() => {
          if (counter - 1 > 0) {
            setCounter(counter - 1);
          }
        }}
      >
        -
      </button>
      <span className="font-inter text-[20px] ">{counter}</span>
      <button className="w-[25px] h-[25px] rounded-[7px] border-[2px] border-[#E39C9D] text-[#E39C9D] text-[15px] flex flex-col items-center justify-center"
      onClick={()=>setCounter(counter+1)}>
        +
      </button>
    </div>
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img
        src="/assets/icons/trash.svg"
        alt="eliminar"
        className="cursor-pointer w-[16px] h-[19px]"
        onClick={() => removeFromCart(item.product._id)}
      />
    </div>
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-inter font-bold text-[16px] ">
        ${item.product.precio}.00
      </span>
    </div>
  </div>
  )
}

export default Productos