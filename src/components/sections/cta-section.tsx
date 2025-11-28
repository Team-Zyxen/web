import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <div className="border border-slate-700 rounded-xl p-8 md:p-12 text-center space-y-6 fade-in-up hover-scale glow-pulse">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Let Intelligent Software Do the Work So Your Business Grows Faster
        </h2>
        <p className="text-gray-400">
          Start your transformation today with smart, automated systems built for scale
        </p>
        <Link href="/contact" className="inline-block mt-6">
          <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold smooth-transition hover-scale">
            Get in Touch
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;