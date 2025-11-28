"use client";

import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  size: number;
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars (800 stars for dense starfield)
    const starCount = 800;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxDepth = 2000;

    starsRef.current = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * maxDepth,
      px: 0,
      py: 0,
      size: Math.random() * 2 + 0.5,
    }));

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Pure black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const speed = 3; // Speed of stars coming toward viewer

      starsRef.current.forEach((star) => {
        // Move star toward viewer (decrease z)
        star.z -= speed;

        // Reset star when it goes past viewer
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        // 3D to 2D projection
        const scale = 1000 / star.z;
        const x2d = star.x * scale + centerX;
        const y2d = star.y * scale + centerY;

        // Calculate star size based on depth (closer = bigger)
        const size = (1 - star.z / maxDepth) * star.size * 3;

        // Only draw if within canvas bounds
        if (x2d >= 0 && x2d <= canvas.width && y2d >= 0 && y2d <= canvas.height) {
          // Draw motion trail from previous position
          if (star.px !== 0 && star.py !== 0) {
            const trailOpacity = (1 - star.z / maxDepth) * 0.5;
            ctx.strokeStyle = `rgba(255, 255, 255, ${trailOpacity})`;
            ctx.lineWidth = size * 0.5;
            ctx.beginPath();
            ctx.moveTo(star.px, star.py);
            ctx.lineTo(x2d, y2d);
            ctx.stroke();
          }

          // Draw sharp white star
          const opacity = 0.8 + (1 - star.z / maxDepth) * 0.2;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, Math.max(size, 0.5), 0, Math.PI * 2);
          ctx.fill();
        }

        // Store current position for next frame trail
        star.px = x2d;
        star.py = y2d;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleCanvas;