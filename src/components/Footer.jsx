import React from 'react';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import navLinksInit from '../data/navLinks.json';
import footerDataInit from '../data/footer.json';
import { useData } from '../hooks/useData';

const Footer = () => {
  const navLinks = useData('navLinks', navLinksInit);
  const footerData = useData('footer', footerDataInit);

  return (
    <footer id="contact" className="pt-24 pb-12 border-t border-slate-800/60 relative overflow-hidden mt-12 z-10 bg-slate-950/50">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <a href="#" className="inline-flex items-center gap-3 group mb-6 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl group-hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                {footerData.logoInitials}
              </div>
              <span className="font-bold text-2xl tracking-tight text-white mr-2">{footerData.name}</span>
              
              {/* Lottie Illustrator Animation representing Mail/Contact */}
              <Player
                autoplay
                loop
                src="https://assets10.lottiefiles.com/packages/lf20_u25cckyh.json" 
                style={{ height: '60px', width: '60px' }}
                className="opacity-90 drop-shadow-md -mt-2"
              />
            </a>
            <p className="text-slate-400 max-w-md mb-8 leading-relaxed font-light">
              {footerData.description}
            </p>
            <div className="flex gap-4">
              <a href={footerData.socials[0].link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all border border-slate-700/50">
                <Linkedin size={18} />
              </a>
              <a href={footerData.socials[1].link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all border border-slate-700/50">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Contact Details</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-indigo-400 shrink-0 border border-slate-700/50">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Email</span>
                  <a href={`mailto:${footerData.contact.email}`} className="text-slate-300 hover:text-indigo-400 transition-colors">{footerData.contact.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-indigo-400 shrink-0 border border-slate-700/50">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Location</span>
                  <span className="text-slate-300">{footerData.contact.location}</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}><a href={link.href} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 transition-opacity"></div>{link.name}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {footerData.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
