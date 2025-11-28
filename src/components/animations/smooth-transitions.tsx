"use client";

import React, { useEffect, type FC, type ReactNode } from 'react';

// A component that injects all animation-related CSS styles into the document head.
// This approach is used to provide global styles from a single component file without
// modifying tailwind.config.js or globals.css directly, adhering to the prompt's constraints.
export const AnimationStyles: FC = () => {
  return (
    <style>
      {`
        /* 
         * =========================================
         * ZYXEN Animation & Transition Utilities
         * =========================================
         */

        /* KEYFRAMES */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(147, 51, 234, 0.1), 0 0 5px rgba(168, 85, 247, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.4), 0 0 10px rgba(168, 85, 247, 0.3);
          }
        }

        /* TRANSITION UTILITIES */
        .smooth-transition {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
        .smooth-transition-slow {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 500ms;
        }

        /* HOVER UTILITIES */
        .hover-scale {
          transition: transform 300ms ease-in-out;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }

        /* STATIC ANIMATION UTILITIES */
        .glow-pulse {
          animation: glowPulse 4s infinite ease-in-out;
        }
        
        /* SCROLL-TRIGGERED ANIMATIONS - Initial States */
        /* These elements start as invisible and are revealed on scroll by the hook */
        .fade-in,
        .fade-in-up,
        .fade-in-up-delay-1,
        .fade-in-up-delay-2,
        .fade-in-up-delay-3,
        .scroll-trigger-slide-left,
        .scroll-trigger-slide-right,
        .scale-in {
          opacity: 0;
        }

        /* SCROLL-TRIGGERED ANIMATIONS - Active States */
        /* The 'scroll-triggered' class is added by the useScrollAnimations hook */
        .scroll-triggered.fade-in {
          animation: fadeIn 0.8s forwards ease-out;
        }
        .scroll-triggered.fade-in-up,
        .scroll-triggered.fade-in-up-delay-1,
        .scroll-triggered.fade-in-up-delay-2,
        .scroll-triggered.fade-in-up-delay-3 {
          animation: fadeInUp 0.8s forwards ease-out;
        }
        .scroll-triggered.scale-in {
          animation: scaleIn 0.8s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .scroll-triggered.scroll-trigger-slide-left {
          animation: slideInLeft 1s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .scroll-triggered.scroll-trigger-slide-right {
          animation: slideInRight 1s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Delays for staggered animations */
        .scroll-triggered.fade-in-up-delay-1 { animation-delay: 100ms; }
        .scroll-triggered.fade-in-up-delay-2 { animation-delay: 200ms; }
        .scroll-triggered.fade-in-up-delay-3 { animation-delay: 300ms; }

        /* ACCESSIBILITY: PREFERS REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .smooth-transition,
          .smooth-transition-slow,
          .hover-scale {
            transition: none;
          }

          .hover-scale:hover {
            transform: none;
          }

          .glow-pulse {
            animation: none;
          }
          
          /* For scroll-triggered animations, bypass JS and make them visible immediately */
          .fade-in,
          .fade-in-up,
          .fade-in-up-delay-1,
          .fade-in-up-delay-2,
          .fade-in-up-delay-3,
          .scroll-trigger-slide-left,
          .scroll-trigger-slide-right,
          .scale-in {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}
    </style>
  );
};

// A hook that uses IntersectionObserver to apply a 'scroll-triggered' class
// to elements as they enter the viewport, triggering the CSS animations.
export const useScrollAnimations = () => {
    useEffect(() => {
        // Do not run observer logic if the user prefers reduced motion.
        // The CSS media query will handle showing the elements immediately.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-triggered');
                        observer.unobserve(entry.target); // Observe each element only once
                    }
                });
            },
            {
                rootMargin: '0px',
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        // Select all elements that have a scroll-triggered animation class
        const targets = document.querySelectorAll(`
          .fade-in, .fade-in-up, .scale-in,
          .fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-up-delay-3,
          .scroll-trigger-slide-left, .scroll-trigger-slide-right,
          .scroll-trigger-item
        `);

        targets.forEach((target) => observer.observe(target));

        // Cleanup observer on component unmount
        return () => {
            targets.forEach((target) => {
              // Check if the observer still exists to avoid errors on fast navigation
              if (observer) {
                observer.unobserve(target);
              }
            });
        };
    }, []);
};

// A provider component that encapsulates the animation logic.
// Wrap your app or layout with this component to enable all animations.
const SmoothTransitionsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useScrollAnimations();

  return (
    <>
      <AnimationStyles />
      {children}
    </>
  );
};

export default SmoothTransitionsProvider;