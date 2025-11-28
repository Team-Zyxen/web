"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/sections/header';
import HeroSection from '@/components/sections/hero-section';
import MissionSection from '@/components/sections/mission-section';
import FeaturesSection from '@/components/sections/features-section';
import BenefitsSection from '@/components/sections/benefits-section';
import WorkGallerySection from '@/components/sections/work-gallery-section';
import CtaSection from '@/components/sections/cta-section';
import Footer from '@/components/sections/footer';
import SmoothTransitionsProvider from '@/components/animations/smooth-transitions';
import LoadingAnimation from '@/components/loading-animation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if loading animation should be shown
    const showLoading = sessionStorage.getItem('showLoading');
    const skipLoading = sessionStorage.getItem('skipLoading');
    const hasVisited = sessionStorage.getItem('hasVisitedZyxen');
    
    // Show loading animation if:
    // 1. User clicked ZYXEN logo (showLoading flag)
    // 2. First visit and not skipping
    if (showLoading === 'true') {
      setIsLoading(true);
      setShowContent(false);
      // Clear the flag
      sessionStorage.removeItem('showLoading');
      sessionStorage.setItem('hasVisitedZyxen', 'true');
    } else if (!hasVisited && skipLoading !== 'true') {
      setIsLoading(true);
      setShowContent(false);
      sessionStorage.setItem('hasVisitedZyxen', 'true');
    } else {
      // Skip animation
      setIsLoading(false);
      setShowContent(true);
    }
    
    // Clear skipLoading flag if present
    if (skipLoading === 'true') {
      sessionStorage.removeItem('skipLoading');
    }
  }, []);

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <>
      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <SmoothTransitionsProvider>
        <div 
          className="min-h-screen bg-black text-white antialiased"
          style={{
            opacity: showContent ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <Header />
          <main>
            <HeroSection />
            <MissionSection />
            <section className="max-w-7xl mx-auto px-6 py-20">
              <FeaturesSection />
            </section>
            <BenefitsSection />
            <div id="crafted">
              <WorkGallerySection />
            </div>
            <CtaSection />
          </main>
          <Footer />
        </div>
      </SmoothTransitionsProvider>
    </>
  );
}