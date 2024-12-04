'use client'
import Link from "next/link";
import MyCarousel from "../../../components/MyCarousel";
// import Animate from "../../../components/Animation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import ScrollTrigger from "gsap/dist/ScrollTrigger";



export default function Home() {

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger)


  const btn1 = useRef<HTMLDivElement | null>(null)
  const btn2 = useRef<HTMLDivElement | null>(null)
  const btn3 = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {


    const timeline = gsap.timeline();
    // Animación para btn1
    timeline.from(btn1.current, {
      duration: 1,
      scale: 0.5,
      ease: "bounce.out",
    });

    // Animación para btn2
    timeline.from(btn2.current, {
      duration: 0.8,
      scale: 0.5,
      ease: "bounce",
    }, 0.2); // "<" sincroniza con la animación anterior

    // Animación para btn3
    timeline.from(btn3.current, {
      duration: 1.1,
      scale: 0.5,
      ease: "bounce",
    }, 0.2); // Sincroniza con la animación anterior




  })



  const imageLinks = [
    { id: 0, src: "/stock/image1.webp", link: 'https://example.com/1' },
    { id: 1, src: "/stock/image2.webp", link: 'https://example.com/1' },
    { id: 2, src: "/stock/image3.webp", link: 'https://example.com/1' },
    { id: 3, src: "/stock/image4.webp", link: 'https://example.com/1' },
  ];

  return (
    <>

      <div className="container relative  max-w-7xl mx-auto px-3">
        <div className="container relative  max-w-md mx-auto px-3">
          <MyCarousel images={imageLinks} />
        </div>
        {/* <Animate></Animate> */}
      </div>
      <div className="flex flex-col gap-3  md:flex-row ">
        <div ref={btn1} className="flex items-center 
                          justify-center  
                          p-5
                          main-button-1 ">

          <Link href="/signup">
            <p className="font-extrabold text-xl">Inscribirse </p>
          </Link>


        </div>
        <div ref={btn2} className="flex items-center 
                          justify-center  
                          p-5
                          main-button-2 ">
          <Link href="/puntos">
            <p className="font-extrabold   text-xl">Ver Puntos </p>
          </Link>
        </div>
        <div ref={btn3} className="flex items-center 
                          justify-center  
                          p-5
                          main-button-3 ">
          <Link href={"/reglamento"}>
            <p className="font-extrabold   text-xl">Reglamento </p>
          </Link>
        </div>

      </div>

    </>
  );
}
