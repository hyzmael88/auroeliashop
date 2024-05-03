import React from 'react'
import { urlForImage } from '../../../../sanity/lib/image'

function Producto({producto, addToCart}) {
  return (
    <div
    className="w-full lg:w-[229px] shadow-popular rounded-[30px] cursor-pointer"
  >
    <img
                  src={urlForImage(producto?.imagenes[0]?.asset._ref)}
                  alt={producto.nombre}
                  className="w-full h-[173px] lg:h-[263px] object-cover rounded-t-[30px]"
                />
                <div className="h-[100px]  flex flex-col  justify-center px-[22px]">
                  <span className="font-inter font-bold text-[12px] lg:text-[16px]">
                    {producto.nombre}
                  </span>
                  <div className="flex justify-between items-center ">
                    <span className="font-inter font-bold text-[12px] lg:text-[16px]">
                      ${producto.precio}.00
                    </span>

                    <img
                      src="/assets/icons/carrito.svg"
                      alt="carrito de compras"
                      className="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] cursor-pointer hover:scale-125 transition-all duration-300"
                      onClick={() => addToCart(producto, 1)}
                    />
                  </div>
                </div>
              </div>
  )
}

export default Producto