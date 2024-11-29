import React, { useState, useRef, useEffect } from "react";
import "./animacionburbuja.css"; // Asegúrate de incluir este archivo


interface Props {
    puntos: number;
}



const BubbleAnimation = (props: Props) => {

    const [number, setNumber] = useState(0)

    const bubbleElement = useRef<HTMLDivElement | null>(null)





    useEffect(() => {
        const { puntos } = props;
        const incremento = puntos / 150;
        let totalPuntos = 0;
        let count = 0;

        const interval = setInterval(() => {
            if (count <= 150) { // Número máximo que se incrementa

                setNumber(count)


                if (count == 150) {
                    totalPuntos = puntos
                } else {
                    totalPuntos = totalPuntos + incremento
                }

                setNumber(Math.floor(totalPuntos))

                // Ajustar el tamaño de la burbuja según el valor del contador
                const size = 50 + count; // Ajusta el multiplicador para cambiar la escala



                if (bubbleElement) {

                    bubbleElement.current!.style.width = size + 'px';
                    bubbleElement.current!.style.height = size + 'px';
                    bubbleElement.current!.style.fontSize = (10 + count * 0.35) + 'px'; // Ajusta el tamaño del texto

                    count++;
                }
            } else {
                clearInterval(interval);
            }
        }, 10); // Velocidad de incremento
        return () => {
            clearInterval(interval)
        }
    }, [props])

    return (
        <div className="bubble-animation-container py-3">
            <div ref={bubbleElement} className="bubble-animation ">
                <span className="number">{number}</span>
            </div>
        </div>
    );
};

export default BubbleAnimation;
