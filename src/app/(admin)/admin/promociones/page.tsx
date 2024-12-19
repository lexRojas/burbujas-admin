'use client'

import { HR } from "flowbite-react";
import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";

import menu_bonos from '@/../public/images/bonos.webp'
import menu_pendig from '@/../public/images/pending.webp'

import './promociones.css'


const roboto = Roboto_Condensed({
  style: 'normal',
  subsets: ['latin'],
  weight: '500'

})



export default function Home() {
  const navegate = useRouter()

  return (


    <div className="flex flex-col max-w-md m-auto bg-blue-400 bg-opacity-60 sm:w-full rounded-md border-solid border-2 border-green-700 ">

      <div className="m-2 block ">
        <p className={`${roboto.className} p-1  text-xl text-center  text-blue-700 `}>MENU DE PROMOCIONES</p>
      </div>
      <HR className="m-1 bg-black" />
      <div className="flex flex-row flex-wrap p-2 py-5 gap-9 justify-evenly">
        <div className="item-container">
          <Image onClick={() => navegate.push("/admin/promociones/bonos")} className="menu-item " src={menu_bonos} alt="usuarios" />
          <span>Bonos</span>
        </div>
        <div className="item-container">
          <Image className="menu-item" src={menu_pendig} alt="promociones" />
          <span>.....</span>
        </div>
        <div className="item-container">
          <Image className="menu-item" src={menu_pendig} alt="promociones" />
          <span>.....</span>
        </div>
        <div className="item-container">
          <Image className="menu-item" src={menu_pendig} alt="promociones" />
          <span>......</span>
        </div>

      </div>



    </div>



  );
}
