import React from 'react';

const MissionSection = () => {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 space-y-8 scale-in">
        <div className="text-center space-y-4">
          <p className="text-purple-400 text-sm font-semibold uppercase fade-in">
            Our Mission
          </p>
          <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-white">
            Where AI, automation, and precision engineering shape future-ready software.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;