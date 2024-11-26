

import Link from "next/link";
import MyCarousel from "../../../components/MyCarousel";

export default function Home() {

  const imageLinks = [
    { id: 0, src: "/stock/image1.webp", link: 'https://example.com/1' },
    { id: 1, src: "/stock/image2.webp", link: 'https://example.com/1' },
    { id: 2, src: "/stock/image3.webp", link: 'https://example.com/1' },
    { id: 3, src: "/stock/image4.webp", link: 'https://example.com/1' },
  ];

  return (
    <>

      <div className="container relative flex max-w-96 mx-auto px-3">
        <MyCarousel images={imageLinks} />
      </div>
      <div className="flex flex-col gap-3 md:flex-row ">
        <div className="flex items-center 
                          justify-center  
                          p-5
                          main-button-1 ">

          <Link href="/signup">
            <p className="font-extrabold text-xl">Inscribirse </p>
          </Link>


        </div>
        <div className="flex items-center 
                          justify-center  
                          p-5
                          main-button-2 ">
          <Link href="/puntos">
            <p className="font-extrabold   text-xl">Ver Puntos </p>
          </Link>
        </div>
        <div className="flex items-center 
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
