import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { client } from "../lib/client";
import { urlForImage } from "../../sanity/lib/image";

function Product() {
  const router = useRouter();
  const { productSlug } = router.query;

  const { cart, addToCart, removeFromCart } = useContext(AppContext);

  const [counter, setCounter] = useState(1);

  const [products, setProductos] = useState([]);
  console.log(products);

  const [complementos, setComplementos] = useState([]);

  useEffect(() => {
    // Realiza la consulta a la API de Sanity para obtener los productos
    client
      .fetch('*[_type == "producto"]')
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Realiza la consulta a la API de Sanity para obtener los productos
    client
      .fetch('*[_type == "complemento"]')
      .then((data) => setComplementos(data))
      .catch((error) => console.error(error));
  }, []);

  // Buscar el producto por el productSlug en el arreglo Products
  const product = products.find(
    (product) => product.slug.current === productSlug
  );
  const similarProducts = products.filter(
    (product) => product.category === product.category
  );
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(product);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {product && (
        <div className="w-full h-full flex flex-col justify-between  max-w-[1440px] min-w-sm mx-auto">
          <div className="w-full flex flex-row justify-center gap-[54px]  ">
            <div className="w-full flex flex-col items-end  gap-[44px]">
              <img
                src={urlForImage(product?.imagenes[0]?.asset._ref)}
                alt={product.nombre}
                className="w-[427px] h-[486px] object-cover rounded-[30px]"
              />
              {
                product?.imagenes[1] && product?.imagenes[2] &&
                <div className="w-[406px] flex justify-between items-center ">
                <img
                  src={urlForImage(product?.imagenes[1]?.asset._ref)}
                  alt={product.nombre}
                  className="w-[188px] h-[194px] object-cover rounded-[30px]"
                  />
                <img
                  src={urlForImage(product?.imagenes[2]?.asset._ref)}
                  alt={product.nombre}
                  className="w-[188px] h-[194px] object-cover rounded-[30px]"
                  />
              </div>
                }
            </div>
            <div className="w-full flex flex-col">
              <span className="font-inter text-[42px] font-bold ">
                {product.nombre}{" "}
              </span>
              <span className="font-inter text-[36px] ">
                ${product.precio}.00
              </span>
              <div className="flex flex-row items-center gap-[23px]">
                <button className="w-[40px] h-[40px] rounded-[11px] border-[2px] border-[#E39C9D] text-[#E39C9D] text-[24px] flex flex-col items-center justify-center ">
                  -
                </button>
                <span className="font-inter text-[32px] ">{counter}</span>
                <button className="w-[40px] h-[40px] rounded-[11px] border-[2px] border-[#E39C9D] text-[#E39C9D] text-[24px] flex flex-col items-center justify-center">
                  +
                </button>
              </div>
              <p className="text-[16px] font-medium w-[481px]">
                {product.descripcion}
              </p>
              <div className="w-[481px] flex flex-row items-center">
                <h3 className="text-[36px] mt-[36px] w-full">Complementos</h3>
                <div>
                  <div className="  flex flex-row items-center justify-end gap-[21px] mt-[56px]">
                    <div className="rounded-full bg-[#d8d8d8] w-[64px] h-[64px] flex items-center justify-center">
                      <img
                        src="/assets/icons/izq.svg"
                        alt="arrow"
                        className="w-[25px] h-[40px]"
                      />
                    </div>
                    <div className="rounded-full bg-black w-[64px] h-[64px] flex items-center justify-center">
                      <img
                        src="/assets/icons/der.svg"
                        alt="arrow"
                        className="w-[25px] h-[40px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[481px] flex flex-row justify-between items-center mt-[27px]">
                {complementos.map((complemento, index) => (
                  <div
                    key={complemento._id}
                    className="w-full h-full flex flex-col items-center cursor-pointer"
                  >
                    <img
                      className="w-[142px] h-[120px] rounded-[6px] object-cover"
                      src={urlForImage(complemento?.imagen?.asset._ref)}
                    />
                    <span className="font-inter text-[16px]">
                      {complemento.nombre}
                    </span>
                    <span className="font-inter text-[16px]">
                      ${complemento.precio}.00
                    </span>

                    <div className="w-[40px] h-[40px] rounded-[11px] border-[2px] border-[#E39C9D]  mt-[29px] " />
                  </div>
                ))}
              </div>

              <div className="w-[481px] flex flex-row justify-between items-center mt-[58px]  ">
                <div className="font-inter text-[24px] font-bold w-[258px] h-[60px] rounded-[6px] bg-[#E39C9D] flex items-center justify-center cursor-pointer"
                onClick={()=> addToCart(product,1)}>
                  Agregar a carrito
                </div>
                <div className="font-inter text-[24px] font-bold w-[204px] h-[60px] rounded-[6px] bg-black text-white flex items-center justify-center gap-[19px]">
                  <img
                    src="/assets/icons/ar.svg"
                    className="w-[21px] h-[37px]"
                  />
                  Ver en AR
                </div>
              </div>
              <div className="h-[1px] w-[481px] bg-[#E39C9D] mt-[37px]" />
              {/* Materiales */}
              <div className="w-[481px] flex flex-col justify-between items-center mt-[11px]">
                <div className="w-full flex flex-row  items-center justify-between gap-[19px]">
                  <div className="flex flex-row items-center gap-[19px]">
                    <img
                      src="/assets/icons/materiales.svg"
                      alt="material"
                      className="w-[40px] h-[40px]"
                    />
                    <span className="font-inter text-[20px] ">Materiales</span>
                  </div>
                  <img
                    src="/assets/icons/up.svg"
                    alt="arrow"
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-[16px] font-medium leading-[23px] mt-[8px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div className="h-[1px] w-[481px] bg-[#E39C9D] mt-[13px]" />
              <div className="w-[481px] flex flex-col justify-between items-center mt-[11px]">
                <div className="w-full flex flex-row  items-center justify-between gap-[19px]">
                  <div className="flex flex-row items-center gap-[19px]">
                    <img
                      src="/assets/icons/envios.svg"
                      alt="material"
                      className="w-[40px] h-[40px]"
                    />
                    <span className="font-inter text-[20px] ">
                      Envíos y devoluciones
                    </span>
                  </div>
                  <img
                    src="/assets/icons/up.svg"
                    alt="arrow"
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-[16px] font-medium leading-[23px] mt-[8px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div className="h-[1px] w-[481px] bg-[#E39C9D] mt-[13px]" />
              <div className="w-[481px] flex flex-col justify-between items-center mt-[11px]">
                <div className="w-full flex flex-row  items-center justify-between gap-[19px]">
                  <div className="flex flex-row items-center gap-[19px]">
                    <img
                      src="/assets/icons/cuidados.svg"
                      alt="material"
                      className="w-[40px] h-[40px]"
                    />
                    <span className="font-inter text-[20px] ">
                      Envíos y devoluciones
                    </span>
                  </div>
                  <img
                    src="/assets/icons/up.svg"
                    alt="arrow"
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-[16px] font-medium leading-[23px] mt-[8px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center text-center mt-[97px] ">
            <span className="text-[#E39C9D] font-inter font-bold text-[32px]">
              Recomendaciones
            </span>
            <h2 className="text-[83px]">También podría gustarte</h2>
            <div className="flex gap-[22px] mt-[29px]">
              {products.slice(0, 4).map((producto) => (
                <div
                  key={producto._id}
                  className="w-[229px] shadow-popular rounded-[30px] cursor-pointer"
                >
                  <img
                    src={urlForImage(producto?.imagenes[0]?.asset._ref)}
                    alt={producto.nombre}
                    className="w-full h-[263px] object-cover rounded-t-[30px]"
                  />
                  <div className="h-[100px]  flex flex-col  justify-center px-[22px]">
                    <span className="font-inter font-bold text-[16px] text-start">
                      {producto.nombre}
                    </span>
                    <div className="flex justify-between items-center ">
                      <span className="font-inter font-bold text-[16px]">
                        ${producto.precio}.00
                      </span>

                      <img
                        src="/assets/icons/carrito.svg"
                        alt="carrito de compras"
                        className="w-[30px] h-[30px] cursor-pointer hover:scale-125 transition-all duration-300"
                        onClick={() => addToCart(producto, 1)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[950px] flex justify-end items-center gap-[15px]">
                <span className="text-[20px] font-medium mt-[43px] mb-[42px] hover:scale-110 transition-all duration-300 cursor-pointer">
                    Ver Tienda
                </span>
                <img src="/assets/icons/arrow.svg" alt="arrow" className="w-[40px] h-[40px]"/>
                </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;