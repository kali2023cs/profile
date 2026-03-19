import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import navLinksInit from '../data/navLinks.json';
import navbarDataInit from '../data/navbar.json';
import { useData } from '../hooks/useData';

const Navbar = () => {
  const navLinks = useData('navLinks', navLinksInit);
  const navbarData = useData('navbar', navbarDataInit);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}>
      {/* Background layer for scroll state */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/60 shadow-lg' : 'opacity-0'}`}></div>
      
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative z-10">
        <a href="#" className="flex items-center gap-3 group">
           <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl group-hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.5)]">
             {navbarData.logoInitials}
           </div>
           <span className="font-bold text-xl tracking-tight text-white">{navbarData.brandName}</span>
        </a>
        
        <div className="hidden lg:flex gap-8 items-center bg-slate-900/50 backdrop-blur-md px-8 py-3 rounded-full border border-slate-700/50 shadow-inner">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{link.name}</a>
          ))}
        </div>

        <div className="hidden lg:flex items-center">
          <a href={navbarData.ctaButton.link} className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-medium hover:bg-slate-700 border border-slate-700 transition-all hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            {navbarData.ctaButton.text}
          </a>
        </div>

        <button className="lg:hidden text-slate-300 relative z-10" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full glass-panel flex flex-col items-center py-6 gap-6 border-b border-slate-700/50">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white font-medium">{link.name}</a>
          ))}
          <a href={navbarData.ctaButton.link} onClick={() => setIsOpen(false)} className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-medium">{navbarData.ctaButton.text}</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
