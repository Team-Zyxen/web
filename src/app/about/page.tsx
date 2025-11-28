"use client";

import { useEffect, useRef } from 'react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import SmoothTransitionsProvider from '@/components/animations/smooth-transitions';

export default function AboutPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-triggered');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Observe all scroll-trigger elements
    const elements = document.querySelectorAll('.scroll-trigger-item');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <SmoothTransitionsProvider>
      <div className="min-h-screen bg-black text-white antialiased">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
            <div className="text-center space-y-6 scroll-trigger-item">
              <div className="inline-block fade-in">
                <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
                  About Us
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white fade-in-up">
                Helping Businesses Grow
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto fade-in-up-delay-1">
                Zyxen helps businesses streamline operations and grow faster.
              </p>
            </div>
          </section>

          {/* Who We Are Section */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center space-y-4 mb-12 scroll-trigger-item">
              <div className="inline-block fade-in">
                <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
                  Who We Are
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white fade-in-up">
                We Are
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item scroll-trigger-slide-left space-y-4">
                <h3 className="text-xl font-bold text-white">Innovation-Driven Approach</h3>
                <p className="text-gray-400">
                  We build forward-thinking digital solutions powered by creativity and modern engineering.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item scale-in space-y-4">
                <h3 className="text-xl font-bold text-white">Expert Engineering Team</h3>
                <p className="text-gray-400">
                  Our skilled engineers craft scalable, reliable, and high-performance software systems.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item scroll-trigger-slide-right space-y-4">
                <h3 className="text-xl font-bold text-white">User-Focused Mindset</h3>
                <p className="text-gray-400">
                  We design intuitive, user-centered products that deliver seamless digital experiences.
                </p>
              </div>
            </div>
          </section>

          {/* What We Stand For Section */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center space-y-4 mb-12 scroll-trigger-item">
              <div className="inline-block fade-in">
                <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
                  Our Values
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white fade-in-up">
                What We Stand For
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item fade-in-up-delay-1 space-y-4">
                <h3 className="text-xl font-bold text-white">Transparency & Trust</h3>
                <p className="text-gray-400">
                  We operate with honest communication and transparent processes in every project.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item fade-in-up-delay-2 space-y-4">
                <h3 className="text-xl font-bold text-white">Quality Without Shortcuts</h3>
                <p className="text-gray-400">
                  We deliver long-lasting, high-quality technology built with precision and care.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item fade-in-up-delay-3 space-y-4">
                <h3 className="text-xl font-bold text-white">Purpose-Driven Engineering</h3>
                <p className="text-gray-400">
                  We create meaningful software solutions that solve real business challenges.
                </p>
              </div>
            </div>
          </section>

          {/* Why Us Section */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center space-y-4 mb-12 scroll-trigger-item">
              <div className="inline-block fade-in">
                <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
                  Why Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white fade-in-up">
                What makes us stand out in the industry
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item scroll-trigger-slide-left space-y-4">
                <h3 className="text-xl font-bold text-white">Scalable, Future-Ready Systems</h3>
                <p className="text-gray-400">
                  We develop scalable, future-proof systems engineered for long-term business growth.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item scale-in space-y-4">
                <h3 className="text-xl font-bold text-white">End-to-End Problem Solving</h3>
                <p className="text-gray-400">
                  We handle the full product lifecycle, delivering complete and dependable solutions.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 smooth-transition-slow hover:border-purple-500 hover:bg-slate-800/40 hover-scale scroll-trigger-item scroll-trigger-slide-right space-y-4">
                <h3 className="text-xl font-bold text-white">Seamless Communication & Delivery</h3>
                <p className="text-gray-400">
                  We ensure smooth collaboration with clear communication and predictable delivery.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto border border-slate-700 rounded-xl p-12 text-center space-y-6 fade-in-up hover-scale glow-pulse smooth-transition-slow scroll-trigger-item">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Let Intelligent Software Do the Work So Your Business Grows Faster
              </h2>
              <p className="text-gray-400">
                Start your transformation today with smart, automated systems built for scale
              </p>
              <div className="pt-4">
                <a
                  href="/contact"
                  className="inline-block bg-purple-600 text-white font-semibold px-8 py-3 rounded hover:bg-purple-700 smooth-transition hover-scale"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </SmoothTransitionsProvider>
  );
}
