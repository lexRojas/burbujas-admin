'use client'

import animation_text from './../scripts/animation_text.js'
import { useEffect } from 'react'


export default function Animate() {

    useEffect(() => {
        animation_text()
        window.addEventListener('resize', animation_text);
        return () => {

        }
    }, [])


    return (
        <div >
            <canvas id="miCanvas" className='container max-w-7xl  h-auto mx-auto'></canvas>
        </div>
    )
}