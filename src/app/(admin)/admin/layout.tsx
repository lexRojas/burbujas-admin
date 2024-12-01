import type { Metadata } from "next";
import "../../globals.css";

import Image from "next/image";
import burbujas from "../../../../public/burbujas-logo.webp"


import "../../Text.css"

import { Oswald, Roboto_Condensed } from 'next/font/google';
import Footer from "../../../../components/Footer";

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
  title: "ADMIN - Mundo Burbujas",
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
        <div className="container mx-auto">

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

                <div className=" flex textcontainer " >
                  <p className={` ${oswald.className} py-2 pb-3 textmove text-xl `}  >¡Los momentos alegres comienzan aquí!</p>
                </div>
              </div>
            </div>

            <div className="p-2 bg-blue-500  rounded-lg  w-full  md:w-3/4   text-center  ">
              <p className={`${roboto_condensed.className} text-lg`} > PAGINA DE ADMINISTRACION DE BURBUJAS PROMO</p>
            </div>


          </header>
          <main className="container mx-auto px-4  lg:px-8 row-start-3 items-center ">

            {children}

          </main>
          <footer className="row-start-4 container mx-auto px-4 sm:px-6 lg:px-8  flex fex-row  pt-6 gap-6 flex-wrap items-center justify-center">
            <Footer />

          </footer >
        </div>
      </body >
    </html >
  );
}
