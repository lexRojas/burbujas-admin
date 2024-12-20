'use client'

import AnimationText from './../scripts/animationtext'
import { useEffect } from 'react'


export default function Animate() {

    useEffect(() => {
        AnimationText()
        window.addEventListener('resize', AnimationText);
        return () => {

        }
    }, [])


    return (
        <div >
            <canvas id="miCanvas" className='container max-w-7xl  h-auto mx-auto'></canvas>
        </div>
    )
}