'use client'

import happy from './../scripts/animation_text.js'
import { useEffect } from 'react'


export default function Animate() {

    useEffect(() => {
        happy()
        window.addEventListener('resize', happy);
        return () => {

        }
    }, [])


    return (
        <div >
            <canvas id="miCanvas" className='container max-w-7xl  h-auto mx-auto'></canvas>
        </div>
    )
}