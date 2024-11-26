'use client'

import Image from "next/image";
import { Carousel, Flowbite, CustomFlowbiteTheme } from 'flowbite-react';


interface Image {
    id: number;
    src: string;
    link: string;
}

interface Props {
    images: Image[];
}


export default function MyCarousel({ images }: Props) {


    const customTheme: CustomFlowbiteTheme = {
        carousel: {
            "root": {
                "base": "relative h-full w-full",
                "leftControl": "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
                "rightControl": "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
            },
            "indicators": {
                "active": {
                    "off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
                    "on": "bg-white dark:bg-gray-800"
                },
                "base": "h-5 w-5 rounded-full",
                "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
            },
            "item": {
                "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
                "wrapper": {
                    "off": "w-full flex-shrink-0 transform cursor-default snap-center",
                    "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
                }
            },
            "control": {
                "base": "inline-flex font-extrabold text-xl h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
                "icon": "h-25 w-25  text-red-500 dark:text-gray-800 "
            },
            "scrollContainer": {
                "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
                "snap": "snap-x"
            }
        }
    }



    return (
        <Flowbite theme={{ theme: customTheme }}>
            <Carousel>
                {images.map((item, idx) => (
                    <div key={idx} className="relative">
                        <Image key={item.id} src={item.src} alt={item.link} width={500} height={500} priority />
                    </div>
                ))}
            </Carousel>
        </Flowbite>
    )
}