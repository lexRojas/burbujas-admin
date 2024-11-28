'use client'

import { HR } from "flowbite-react";
import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";

import menu_compras from '@/../public/images/menu_compras.png'
import menu_promocion from '@/../public/images/menu_promocion.png'
import menu_usuarios from '@/../public/images/menu_usuarios.png'
import menu_buy from '@/../public/images/menu_buy.png'


import './menu.css'


const roboto = Roboto_Condensed({
  style: 'normal',
  subsets: ['latin'],
  weight: '500'

})



export default function Home() {
  const navegate = useRouter()

  return (


    <div className="flex flex-col max-w-md m-auto bg-white bg-opacity-60 sm:w-full rounded-md border-solid border-2 border-green-700 ">

      <div className="m-2 block ">
        <p className={`${roboto.className} p-1  text-xl text-center  text-blue-700 `}>OPCIONES DEL SISTEMA</p>
      </div>
      <HR className="m-1 bg-black" />
      <div className="flex flex-row flex-wrap p-2 py-5 gap-9 justify-evenly">
        <div className="item-container">
          <Image onClick={() => navegate.push("/admin/registro")} className="menu-item " src={menu_usuarios} alt="usuarios" />
          <span>Usuarios</span>
        </div>
        <div className="item-container">
          <Image onClick={() => navegate.push("/admin/ventas")} className="menu-item" src={menu_compras} alt="compras" />
          <span>Compras</span>
        </div>
        <div className="item-container">
          <Image className="menu-item" src={menu_promocion} alt="promociones" />
          <span>Promociones</span>
        </div>
        <div className="item-container">
          <Image onClick={() => navegate.push("/admin/canje")} className="menu-item" src={menu_buy} alt="canje" />
          <span>Canje Puntos</span>
        </div>

      </div>



    </div>



  );
}
