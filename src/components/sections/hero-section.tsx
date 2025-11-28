"use client";
import Link from "next/link";

import { useRef, useEffect } from "react";

const HeroSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];

        interface Star {
            x: number;
            y: number;
            z: number;
            size: number;
            speed: number;
        }

        const setCanvasSize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        const init = () => {
            stars = [];
            const numberOfStars = 800; // Sharp, clear white dots

            for (let i = 0; i < numberOfStars; i++) {
                stars.push({
                    x: (Math.random() - 0.5) * canvas.width * 2,
                    y: (Math.random() - 0.5) * canvas.height * 2,
                    z: Math.random() * canvas.width,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 3 + 2,
                });
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            
            // Pure black background
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            for (let i = stars.length - 1; i >= 0; i--) {
                const star = stars[i];
                
                // Move star toward viewer (coming out of screen)
                star.z -= star.speed;
                
                // Reset star if it goes past viewer
                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * canvas.width * 2;
                    star.y = (Math.random() - 0.5) * canvas.height * 2;
                    star.z = canvas.width;
                }
                
                // Calculate 3D projection
                const k = 128 / star.z;
                const px = star.x * k + centerX;
                const py = star.y * k + centerY;
                
                // Only draw stars within viewport
                if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
                    // Calculate size and opacity based on depth
                    const size = (1 - star.z / canvas.width) * star.size * 2;
                    const opacity = (1 - star.z / canvas.width) * 0.8 + 0.2;
                    
                    // Draw sharp, clear white dot
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(px, py, Math.max(size, 0.5), 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Add motion trail for stars coming toward viewer
                    if (star.z < canvas.width * 0.3) {
                        const trailLength = (1 - star.z / (canvas.width * 0.3)) * 20;
                        const prevK = 128 / (star.z + star.speed);
                        const prevPx = star.x * prevK + centerX;
                        const prevPy = star.y * prevK + centerY;
                        
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                        ctx.lineWidth = size * 0.5;
                        ctx.beginPath();
                        ctx.moveTo(prevPx, prevPy);
                        ctx.lineTo(px, py);
                        ctx.stroke();
                    }
                }
            }
        };
        
        const handleResize = () => {
            setCanvasSize();
            init();
        };

        setCanvasSize();
        init();
        animate();
        
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            <div className="relative z-10 px-6 py-20 text-center md:py-32">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-white fade-in md:text-6xl">
                        Engineering intelligence into effortless experiences.
                    </h1>
                    <p className="text-lg text-gray-400 fade-in-up">
                        AI-Driven, Intelligent Software for Modern Challenges
                    </p>
                    <div className="flex justify-center gap-4 pt-6 fade-in-up-delay-1">
                        <Link href="/contact">
                        <button className="px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out bg-purple-600 rounded-md hover:scale-105 hover:bg-purple-700">
                            Get Started
                        </button>
                        </Link>
                        <Link href="/about">
                        <button className="px-8 py-3 font-semibold transition-all duration-300 ease-in-out border rounded-md border-purple-500 text-purple-400 hover:scale-105 hover:text-purple-300 hover:bg-purple-500/10">
                            Learn More
                        </button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;