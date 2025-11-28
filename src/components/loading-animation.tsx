"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [animationStage, setAnimationStage] = useState<
    "initial" | "moving" | "zooming" | "complete"
  >("initial");

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setAnimationStage("moving");
    }, 1000);

    const moveTimer = setTimeout(() => {
      setAnimationStage("zooming");
    }, 2500);

    const zoomTimer = setTimeout(() => {
      setAnimationStage("complete");
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(moveTimer);
      clearTimeout(zoomTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000"
      style={{
        opacity: animationStage === "complete" ? 0 : 1,
        pointerEvents: animationStage === "complete" ? "none" : "auto",
      }}
    >
      {/* Logo Container */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${
            animationStage === "zooming" ? 1.4 : 1
          })`,
          opacity: animationStage === "zooming" ? 0 : 1,
          transition: "all 1.2s ease",
          width: "360px",
          height: "360px",
        }}
      >
        {/* Aura Ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: "340px",
            height: "340px",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${
              animationStage === "moving" || animationStage === "zooming"
                ? 0.73
                : 0.6
            })`,
            background:
              "radial-gradient(circle, rgba(160,160,160,0.25) 0%, rgba(110,110,110,0.18) 40%, rgba(60,60,60,0.06) 70%, rgba(0,0,0,0) 100%)",
            opacity:
              animationStage === "moving" || animationStage === "zooming"
                ? 0.75
                : 0,
            transition: "all 1.2s ease",
            transitionDelay: animationStage === "moving" ? "2.1s" : "0s",
          }}
        />

        {/* Aura Fade */}
        <div
          className="absolute rounded-full"
          style={{
            width: "360px",
            height: "360px",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${
              animationStage === "zooming"
                ? 1.6
                : animationStage === "moving"
                ? 1
                : 0.7
            })`,
            background:
              "radial-gradient(circle, rgba(160,160,160,0.25) 0%, rgba(110,110,110,0.18) 40%, rgba(60,60,60,0.06) 70%, rgba(0,0,0,0) 100%)",
            backdropFilter: "blur(3px)",
            opacity:
              animationStage === "zooming"
                ? 0
                : animationStage === "moving"
                ? 1
                : 0,
            transition: "all 1.4s ease",
            transitionDelay: animationStage === "moving" ? "2.2s" : "0s",
          }}
        />

        {/* Top Half */}
        <div
          className="absolute"
          style={{
            width: "260px",
            left: "50%",
            top: "50%",
            transform: `translate(${
              animationStage === "initial"
                ? "calc(-50% - 300px)"
                : "-50%"
            }, calc(-50% - 45px)) scale(0.7)`,
            opacity: animationStage === "initial" ? 0 : 1,
            transition: "all 2s ease",
            zIndex: 10,
          }}
        >
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/top-half-of-the-logo-cropped-1764164219904.png"
            alt="Top Half"
            width={260}
            height={130}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Bottom Half */}
        <div
          className="absolute"
          style={{
            width: "260px",
            left: "50%",
            top: "50%",
            transform: `translate(${
              animationStage === "initial"
                ? "calc(-50% + 300px)"
                : "-50%"
            }, calc(-50% + 45px)) scale(0.7)`,
            opacity: animationStage === "initial" ? 0 : 1,
            transition: "all 2s ease",
            zIndex: 5,
          }}
        >
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/cropped-bottom-half-of-the-logo-1764164219831.png"
            alt="Bottom Half"
            width={260}
            height={130}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
