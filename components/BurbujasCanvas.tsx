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
                radius: Math.random() * 25 + 2,
                dx: Math.random() * 5 - 1,
                dy: Math.random() * 5 - 1,
                color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
            });
        }

        // Función de animación
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            circles.forEach(circle => {
                // Dibujar el círculo
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = circle.color;
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

