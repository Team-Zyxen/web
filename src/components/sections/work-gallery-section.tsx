"use client";

import React, { useEffect, useRef, useState } from "react";

// Define the project type
interface Project {
  id: number;
  title: string;
  width: string;
  preview: string;
  thumbnail: string;
}

const WorkGallerySection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  // State for the mobile "Modal" view
  const [activeMobileProject, setActiveMobileProject] = useState<Project | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    // Detect if the device has a touch screen
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || (navigator as any).maxTouchPoints > 0);
    setIsTouch(Boolean(touch));
  }, []);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (activeMobileProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeMobileProject]);

  const projects: Project[] = [
    { id: 1, title: "Project Alpha", width: "w-[400px]", preview: "/previews/aura.mp4", thumbnail: "/previews/aurat.png" },
    { id: 2, title: "Project Beta",  width: "w-[320px]", preview: "/previews/aroma.mp4", thumbnail: "/previews/aromat.png" },
    { id: 3, title: "Project Gamma", width: "w-[380px]", preview: "/previews/argus.mp4", thumbnail: "/previews/argust.png" },
    { id: 4, title: "Project Delta", width: "w-[350px]", preview: "/previews/lumina.mp4", thumbnail: "/previews/luminat.png" },
    { id: 5, title: "Project Epsilon", width: "w-[420px]", preview: "/previews/spaceflux.mp4", thumbnail: "/previews/spacefluxt.png" },
  ];

  // Duplicate for seamless loop
  const duplicatedProjects = [...projects, ...projects];

  // --- DESKTOP LOGIC ---
  const playVideo = (key: string) => {
    const vid = videoRefs.current[key];
    if (!vid) return;
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    try {
      vid.currentTime = 0;
      const p = vid.play();
      if (p && typeof p.then === "function") p.catch(() => {});
      setPlayingKey(key);
    } catch (e) {
      // ignore play errors
    }
  };

  const stopVideo = (key: string) => {
    const vid = videoRefs.current[key];
    if (!vid) return;
    try {
      vid.pause();
      vid.currentTime = 0;
    } catch (e) {}
    setPlayingKey((c) => (c === key ? null : c));
  };

  // --- MOBILE HANDLER ---
  const handleCardClick = (e: React.MouseEvent | React.KeyboardEvent, project: Project, key: string) => {
    if (isTouch) {
      e.preventDefault();
      // On mobile, open the modal instead of playing in-line
      setActiveMobileProject(project);
    }
  };

  const closeMobileOverlay = () => {
    setActiveMobileProject(null);
  };

  return (
    <section className="py-20 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Crafted by Zyxen</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore our portfolio of innovative solutions and transformative projects</p>
          
          {/* --- MOBILE ONLY INSTRUCTION TEXT --- */}
          {isTouch && (
            <p className="text-sm text-purple-400 font-medium animate-pulse mt-2">
              (Tap on a thumbnail to see demo)
            </p>
          )}
        </div>
      </div>

      {/* Full-width scrolling strip */}
      <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden work-gallery-mask" style={{ marginTop: 0 }}>
        <div className="px-6 md:px-10">
          <div
            className="work-gallery-scroll"
            aria-hidden={false}
          >
            {duplicatedProjects.map((project, index) => {
              const key = `${project.id}-${index}`;
              const isPlaying = playingKey === key;

              return (
                <div
                  key={key}
                  className={`work-gallery-card ${project.width} h-80 flex-shrink-0 rounded-lg relative overflow-hidden bg-slate-800`}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => {
                    // Only hover-play if NOT on touch device
                    if (!isTouch) {
                      setHoveredId(key);
                      playVideo(key);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isTouch) {
                      setHoveredId(null);
                      stopVideo(key);
                    }
                  }}
                  onClick={(e) => handleCardClick(e, project, key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCardClick(e, project, key);
                    }
                  }}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-300 ease-out transform ${isPlaying ? "scale-105 md:scale-110 z-20" : "scale-100 z-0"}`}
                    style={{ transformOrigin: "center center", willChange: "transform, opacity" }}
                  >
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} thumbnail`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-200"></div>

                    {/* Desktop Video */}
                    <video
                      ref={(el) => (videoRefs.current[key] = el)}
                      src={project.preview}
                      poster={project.thumbnail}
                      className={`work-gallery-video absolute inset-0 w-full h-full transition-opacity duration-200 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- MOBILE FULLSCREEN OVERLAY --- */}
      {isTouch && activeMobileProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeMobileOverlay}
        >
            <div className="relative w-full max-w-4xl px-4">
                <div className="absolute -top-12 right-4 text-white/50 text-sm">
                   Tap anywhere to close
                </div>
                
                <video
                  src={activeMobileProject.preview}
                  className="w-full max-h-[80vh] rounded-lg shadow-2xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls 
                  onClick={(e) => e.stopPropagation()} 
                />
                
                <h3 className="text-center text-white mt-4 text-xl font-bold">
                    {activeMobileProject.title}
                </h3>
            </div>
        </div>
      )}

    </section>
  );
};

export default WorkGallerySection;
