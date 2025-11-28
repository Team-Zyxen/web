"use client";

import React, { useEffect, useRef, useState } from "react";

const WorkGallerySection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // modal holds project id as string (e.g. "3")
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const check = () => {
      const touch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || (navigator as any).maxTouchPoints > 0);
      setIsTouch(Boolean(touch));
      setIsMobile(typeof window !== "undefined" ? window.innerWidth < 768 : false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const projects = [
    { id: 1, title: "Project Alpha", width: "w-[400px]", preview: "/previews/aura.mp4", thumbnail: "/previews/aurat.png" },
    { id: 2, title: "Project Beta",  width: "w-[320px]", preview: "/previews/aroma.mp4", thumbnail: "/previews/aromat.png" },
    { id: 3, title: "Project Gamma", width: "w-[380px]", preview: "/previews/argus.mp4", thumbnail: "/previews/argust.png" },
    { id: 4, title: "Project Delta", width: "w-[350px]", preview: "/previews/lumina.mp4", thumbnail: "/previews/luminat.png" },
    { id: 5, title: "Project Epsilon", width: "w-[420px]", preview: "/previews/spaceflux.mp4", thumbnail: "/previews/spacefluxt.png" },
  ];

  // duplicate for seamless loop
  const duplicatedProjects = [...projects, ...projects];

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
    } catch (e) {}
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

  const toggleVideo = (key: string) => {
    const vid = videoRefs.current[key];
    if (!vid) return;
    if (!vid.paused && !vid.ended) stopVideo(key);
    else playVideo(key);
  };

  // open mobile modal for a project id (string)
  const openModalForProject = (projectId: string) => {
    // pause any inline playing video
    if (playingKey) stopVideo(playingKey);
    setModalProjectId(projectId);
  };

  const closeModal = () => {
    // stop modal player
    try {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
        modalVideoRef.current.currentTime = 0;
      }
    } catch (e) {}
    setModalProjectId(null);
  };

  // when modal opens, play modal video (unmuted) and listen for Escape
  useEffect(() => {
    if (!modalProjectId) return;
    const el = modalVideoRef.current;
    if (el) {
      el.muted = false; // allow audio after user tap
      el.loop = true;
      el.playsInline = true;
      el.currentTime = 0;
      el.play().catch(() => {});
    }
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalProjectId]);

  const getProjectById = (idStr: string | null) => {
    if (!idStr) return null;
    const id = Number(idStr);
    return projects.find((p) => p.id === id) || null;
  };

  // pause the CSS animation when modal open by setting inline style
  const isModalOpen = Boolean(modalProjectId);

  return (
    <section className="py-20 bg-black text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Crafted by Zyxen</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore our portfolio of innovative solutions and transformative projects</p>
        </div>
      </div>

      {/* Full-width scrolling strip */}
      <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden work-gallery-mask">
        <div className="px-6 md:px-10">
          <div
            className="work-gallery-scroll"
            // pause animation when modal open to avoid visual movement while modal shows
            style={{ animationPlayState: isModalOpen ? "paused" : undefined }}
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
                  onClick={(e) => {
                    // Mobile behavior: if touch AND mobile width -> open modal in center
                    if (isTouch && isMobile) {
                      e.preventDefault();
                      // use project.id (not index) to open modal
                      openModalForProject(String(project.id));
                      return;
                    }
                    // Desktop/touch-not-mobile: preserve toggle behavior for inline play
                    if (isTouch) {
                      e.preventDefault();
                      toggleVideo(key);
                      return;
                    }
                    // Desktop mouse click: do nothing special (hover handles play)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (isTouch && isMobile) openModalForProject(String(project.id));
                      else toggleVideo(key);
                    }
                    if (e.key === "Escape") {
                      stopVideo(key);
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

      {/* Mobile Modal: only show on touch devices + small screens */}
      {isTouch && isMobile && modalProjectId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => closeModal()}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg mx-auto rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent background click when interacting with modal content
          >
            <video
              ref={modalVideoRef}
              src={getProjectById(modalProjectId)?.preview}
              poster={getProjectById(modalProjectId)?.thumbnail}
              className="w-full h-[60vh] md:h-[70vh] bg-black rounded"
              controls
              playsInline
            />
            <div className="flex items-center justify-between px-3 py-2 bg-gray-900">
              <div className="text-sm text-gray-200">{getProjectById(modalProjectId)?.title}</div>
              <button
                onClick={() => closeModal()}
                className="text-sm text-gray-100 px-3 py-1 bg-purple-600 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkGallerySection;
