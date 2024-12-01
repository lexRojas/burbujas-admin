'use client'

import React, { useEffect, useRef } from 'react';

interface Circle {
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
    color: string;
}

export default function BurbujasCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referencia al canvas
    const circleCount = 20;
    const circles: Circle[] = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Ajustar el tamaño del canvas al tamaño de la ventana
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Manejar el redimensionamiento de la ventana
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Crear los círculos
        for (let i = 0; i < circleCount; i++) {
            circles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 50 + 2,
                dx: Math.random() * 2 - 1,
                dy: Math.random() * 2 - 1,
                // color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
                color: `radial-gradient(circle at 70% 30%,#ffffff7e,#d1eaef93,#a1d6df8c,#6cc2cf7a,#16acc083,#00b0cf85,#01519b7c,#0178998c,#00499c81)`
            });
        }

        // Función de animación
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            circles.forEach(circle => {
                // Dibujar el círculo




                const gradient = ctx.createRadialGradient(
                    circle.x + (circle.radius * 0.25), circle.y - (circle.radius * 0.25), 0,  // Centro del gradiente
                    circle.x + (circle.radius * 0.25), circle.y - (circle.radius * 0.25), circle.radius // Radio del gradiente
                );

                // Añadir colores al gradiente
                gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)"); // Centro
                gradient.addColorStop(0.3, "rgba(209, 234, 239, 0.7)");
                gradient.addColorStop(1, "rgba(22, 172, 192, 0.5)"); // Borde


                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Mover el círculo
                circle.x += circle.dx;
                circle.y += circle.dy;

                // Rebotar en los bordes
                if (circle.x < 0 || circle.x > canvas.width) circle.dx *= -1;
                if (circle.y < 0 || circle.y > canvas.height) circle.dy *= -1;
            });

            requestAnimationFrame(animate);
        };

        // Iniciar la animación
        animate();

        // Limpiar el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [circles]);

    return <canvas className="fixed w-full h-full top-0 left-0 -z-0" ref={canvasRef} />;
};

