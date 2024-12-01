import type { Metadata } from "next";
import "../globals.css";

import Image from "next/image";
import burbujas from "../../../public/burbujas-logo.webp"


import "../Text.css"



import { Oswald, Roboto_Condensed } from 'next/font/google';
import BurbujasCanvas from "../../../components/BurbujasCanvas";
import Footer from "../../../components/Footer";

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

        <BurbujasCanvas />
        <div className="container mx-auto relative z-10">
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
          <main className="container  mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 row-start-3 items-center ">

            {children}

          </main>
          <footer className="row-start-4 container mx-auto px-4 sm:px-6 lg:px-8  flex fex-row  pt-6 gap-6 flex-wrap items-center justify-center">
            <Footer />
          </footer >
        </div>
      </body>
    </html>
  );
}
