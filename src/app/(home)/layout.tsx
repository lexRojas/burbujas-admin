import type { Metadata } from "next";
import "../globals.css";

import Image from "next/image";
import burbujas from "../../../public/burbujas-logo.webp"

import whatsap from "../../../public/whatsapp.png"
import instagram from "../../../public/instagram.png"
import facebook from ".././../../public/facebook.png"
import "../Text.css"
import { DarkThemeToggle } from "flowbite-react";


import { Oswald, Roboto_Condensed } from 'next/font/google';

const oswald = Oswald(
  {
    weight: '500',
    subsets: ['latin'],
    style: 'normal',

  }
)

const roboto_condensed = Roboto_Condensed({
  weight: '500',
  subsets: ['latin'],
  style: 'normal'

})


export const metadata: Metadata = {
  title: "Mundo Burbujas",
  description: "Página promocional...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" antialiased" >
        {/* <div className="container mx-auto bubbles-container">
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
        </div> */}

        <header className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-rows-[auto_auto_1fr_20px] items-center justify-items-center ">
          <div className=" row-start-1 container flex flex-col justify-center  ">
            <div className="inline-block mx-auto">
              <Image
                src={burbujas}
                alt="Burrbujas"
                // style={{ width: 'clamp(100px,600px,600px)' }}
                width={500}
                className="flex logo-luminoso"
                priority
              >
              </Image>

              <div className=" flex textcontainer" >
                <p className={` ${oswald.className}  textmove`}  >¡Los momentos alegres comienzan aquí!</p>
              </div>
            </div>
          </div>
          <div className="bar flex row-start-2 container mx-auto px-4 sm:px-6 lg:px-8 justify-center align-top ">
            <ul className={` ${roboto_condensed.className} flex flex-row  space-x-2  md:space-x-5  md:text-xl `}>
              <li className="flex">JUGUETERIA</li>
              <li>ELECTRÓNICOS</li>
              <li>LIBRERÍA</li>
            </ul>


          </div>
        </header>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 row-start-3 items-center ">

          {children}

        </main>
        <footer className="row-start-4 container mx-auto px-4 sm:px-6 lg:px-8  flex fex-row  pt-6 gap-6 flex-wrap items-center justify-center">
          <div className="flex flex-shrink items-center gap-3">

            <Image className="img-luminosa" alt="Whatsap" src={whatsap} style={{ width: 'clamp(10px,25px,25px)' }} ></Image>
            <span className={`${roboto_condensed.className} text-gray-500 hover:text-blue-800`} style={{ fontSize: 'clamp(0.5rem, 2vw, 2rem)' }}> Whatsapp </span>
          </div>

          <div className="flex items-center gap-3">
            <Image className="img-luminosa" alt="Whatsap" src={facebook} style={{ width: 'clamp(10px,25px,25px)' }} ></Image>
            <span className={`${roboto_condensed.className} text-gray-500 hover:text-blue-800`} style={{ fontSize: 'clamp(0.5rem, 2vw, 2rem)' }}> Facebook </span>
          </div>
          <div className="flex items-center gap-3">
            <Image className="img-luminosa" alt="Whatsapp" src={instagram} style={{ width: 'clamp(10px,25px,25px)' }} ></Image>
            <span className={`${roboto_condensed.className} text-gray-500 hover:text-blue-800`} style={{ fontSize: 'clamp(0.5rem, 2vw, 2rem)' }} > Instagram </span>
          </div>
          <DarkThemeToggle />

        </footer >
      </body>
    </html>
  );
}
