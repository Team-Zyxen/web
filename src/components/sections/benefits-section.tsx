import React from 'react';

const BenefitsSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 space-y-4 text-center">
        <p className="animate-fade-in text-sm font-semibold uppercase text-purple-400">
          Impact
        </p>
        <h2 className="animate-fade-in-up text-4xl font-bold text-white">
          Powerful Benefits That Drive Real Impact
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div
          className="animate-fade-in-up space-y-4 rounded-lg border border-slate-800 bg-slate-900/50 p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:border-purple-500 hover:bg-slate-800/40"
          style={{ animationDelay: '100ms' }}
        >
          <h3 className="text-xl font-bold text-white">Increased Productivity</h3>
          <p className="text-gray-400">
            Automate repetitive tasks and free your team to focus on high-impact
            strategic work that drives growth.
          </p>
        </div>
        <div
          className="animate-fade-in-up space-y-4 rounded-lg border border-slate-800 bg-slate-900/50 p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:border-purple-500 hover:bg-slate-800/40"
          style={{ animationDelay: '200ms' }}
        >
          <h3 className="text-xl font-bold text-white">
            Improved Customer Experience
          </h3>
          <p className="text-gray-400">
            Deliver faster, smarter responses to customer needs with AI-powered
            intelligence and personalization.
          </p>
        </div>
        <div
          className="animate-fade-in-up space-y-4 rounded-lg border border-slate-800 bg-slate-900/50 p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:border-purple-500 hover:bg-slate-800/40"
          style={{ animationDelay: '300ms' }}
        >
          <h3 className="text-xl font-bold text-white">Cost Efficiency</h3>
          <p className="text-gray-400">
            Reduce operational overhead and optimize resource utilization with
            intelligent automation and smart scaling.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;