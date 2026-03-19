import React from 'react';
import { ChevronRight, Mail } from 'lucide-react';
import HeroIllustration from './HeroIllustration';
import heroDataInit from '../data/hero.json';
import { useData } from '../hooks/useData';

const Hero = () => {
  const heroData = useData('hero', heroDataInit);

  return (
    <section id="about" className="min-h-screen flex items-center pt-24 pb-12 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel mb-8 border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-[0.2em]">{heroData.name}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-white">
              {heroData.heading1} <br className="hidden md:block"/>
              <span className="text-gradient-accent">
                {heroData.heading2}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-light">
              {heroData.description_start}<strong className="text-slate-200 font-medium">{heroData.description_highlight}</strong>{heroData.description_end}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <a href={heroData.buttons.primary.link} className="group px-8 py-4 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
                {heroData.buttons.primary.text}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={heroData.buttons.secondary.link} className="px-8 py-4 rounded-xl glass-panel glass-panel-hover text-slate-300 font-medium flex items-center gap-3">
                <Mail size={18} className="text-indigo-400" />
                {heroData.buttons.secondary.text}
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
