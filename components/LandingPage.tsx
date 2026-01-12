
import React from 'react';
import { STYLES } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 bg-indigo-600/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Powered by Gemini 2.5 & 3.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Generate <span className="gradient-text">Viral Thumbnails</span> in Seconds
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop spending hours in Photoshop. Enter your video title and let ThumbGenie AI design a high-CTR thumbnail tailored for your audience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-slate-950 text-lg font-bold rounded-full hover:bg-slate-200 hover:scale-105 transition-all shadow-2xl shadow-white/10"
            >
              Start Generating for Free
            </button>
            <button className="px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-full border border-slate-800 hover:bg-slate-800 transition-all">
              View Sample Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Style Showcase */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Presets for Every Niche</h2>
            <p className="text-slate-400">Choose from styles optimized for maximum click-through rates.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STYLES.map((style, idx) => (
              <div 
                key={style.id} 
                className="group relative rounded-2xl overflow-hidden glass-morphism border-slate-800 border hover:border-indigo-500/50 transition-all hover:-translate-y-2 duration-300"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={style.previewImage} alt={style.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{style.name}</h3>
                  <p className="text-sm text-slate-400">{style.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/30 space-y-6">
              <h3 className="text-2xl font-bold">Free Plan</h3>
              <div className="text-4xl font-extrabold">$0<span className="text-lg text-slate-500 font-normal">/month</span></div>
              <ul className="space-y-4">
                {['3 Thumbnails daily', 'Standard styles', 'Community support', 'Watermark included'].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-slate-400">
                    <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <button onClick={onGetStarted} className="w-full py-3 rounded-xl border border-slate-700 font-bold hover:bg-slate-800 transition-all">Get Started</button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl border-2 border-indigo-500 bg-indigo-500/5 space-y-6 relative overflow-hidden shadow-2xl shadow-indigo-500/10">
              <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-500 text-[10px] font-bold uppercase rounded-full tracking-widest">Popular</div>
              <h3 className="text-2xl font-bold">Pro Plan</h3>
              <div className="text-4xl font-extrabold">$19<span className="text-lg text-slate-500 font-normal">/month</span></div>
              <ul className="space-y-4">
                {['Unlimited Thumbnails', 'Premium Styles & 1K Res', 'Priority Generation', 'No Watermarks', 'Custom API Key Support'].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-slate-200">
                    <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <button onClick={onGetStarted} className="w-full py-3 rounded-xl bg-indigo-600 font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">Go Pro Now</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
