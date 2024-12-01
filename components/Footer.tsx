import Image from "next/image"


import whatsap from "@/../public/whatsapp.webp"
import instagram from "@/../public/instagram.webp"
import facebook from '@/../public/facebook.webp'

import { Roboto_Condensed } from 'next/font/google';
import Link from "next/link";

const roboto_condensed = Roboto_Condensed({
    weight: '500',
    subsets: ['latin'],
    style: 'normal'

})
export default function Footer() {

    return (
        <>
            <Link href="https://chat.whatsapp.com/GMgzrj4qqxt5HqGhopgIcX">
                <div className="flex flex-shrink items-center gap-3">
                    <Image className="img-luminosa" alt="Whatsap" src={whatsap} style={{ width: 'clamp(10px,25px,25px)' }} ></Image>
                    <span className={`${roboto_condensed.className} text-gray-500 hover:text-blue-800`} style={{ fontSize: 'clamp(0.5rem, 2vw, 2rem)' }}> Whatsapp </span>
                </div>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61567060264769">
                <div className="flex items-center gap-3">
                    <Image className="img-luminosa" alt="Whatsap" src={facebook} style={{ width: 'clamp(10px,25px,25px)' }} ></Image>
                    <span className={`${roboto_condensed.className} text-gray-500 hover:text-blue-800`} style={{ fontSize: 'clamp(0.5rem, 2vw, 2rem)' }}> Facebook </span>
                </div>
            </Link>
            <Link href="https://www.instagram.com/burbujas.cariari/?igsh=ZnBhYzhobjc4OXFx">
                <div className="flex items-center gap-3">
                    <Image className="img-luminosa" alt="Whatsapp" src={instagram} style={{ width: 'clamp(10px,25px,25px)' }} ></Image>
                    <span className={`${roboto_condensed.className} text-gray-500 hover:text-blue-800`} style={{ fontSize: 'clamp(0.5rem, 2vw, 2rem)' }} > Instagram </span>
                </div>
            </Link>
        </>

    )
}