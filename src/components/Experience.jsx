import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, Code } from 'lucide-react';
import { FaReact, FaLaravel, FaNodeJs } from 'react-icons/fa';
import { SiGo, SiMysql, SiFirebase } from 'react-icons/si';
import experienceDataInit from '../data/experience.json';
import { useData } from '../hooks/useData';

const iconMap = {
  Briefcase,
  Building
};

const getTechBadge = (tech, i) => {
  let Icon = Code;
  const name = tech.toLowerCase();
  if (name.includes('react')) Icon = FaReact;
  else if (name.includes('laravel')) Icon = FaLaravel;
  else if (name.includes('node')) Icon = FaNodeJs;
  else if (name.includes('go')) Icon = SiGo;
  else if (name.includes('mysql')) Icon = SiMysql;
  else if (name.includes('firebase')) Icon = SiFirebase;
  
  return (
    <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-indigo-300 flex items-center gap-1.5 shadow-sm hover:bg-slate-700 transition-colors cursor-default group/badge">
      <Icon size={14} className="text-indigo-400 group-hover/badge:text-cyan-300 transition-colors drop-shadow-md" />
      {tech}
    </span>
  );
};

const Experience = () => {
  const experienceData = useData('experience', experienceDataInit);
  const experiences = experienceData.map(exp => ({
    ...exp,
    icon: iconMap[exp.icon] || Briefcase
  }));

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-bold mb-3">Career</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">Professional <span className="text-gradient">Experience</span></h3>
          <div className="w-20 h-1 bg-indigo-500 rounded-full"></div>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto relative before:absolute before:inset-0 before:ml-[28px] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-500 before:to-transparent">
          {experiences.map((exp, index) => {
             const IconComponent = exp.icon;
             return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group"
              >
                {/* Timeline Node */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#030712] bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)] absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 group-hover:scale-110 group-hover:bg-cyan-500 transition-all duration-300">
                  <IconComponent size={24} className="text-white" />
                </div>
                
                {/* Timeline Card */}
                <div 
                  className="w-[calc(100%-80px)] md:w-[calc(50%-40px)] ml-auto md:ml-0 glass-panel glass-panel-hover rounded-2xl p-8 lg:p-10 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)] transition-all duration-300 border border-slate-800 hover:border-slate-600"
                >
                  {/* Background illustration icon */}
                  <IconComponent size={150} className="absolute -bottom-10 -right-10 text-white/[0.03] group-hover:text-white/[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />

                  <div className="flex flex-col mb-8 relative z-10">
                    <h4 className="text-2xl font-bold text-white mb-2">{exp.role}</h4>
                    <p className="text-lg text-indigo-300 font-medium">{exp.company}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-slate-400 text-sm font-medium">
                      <span className="bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/50">{exp.period}</span>
                      <span className="bg-slate-800/50 px-3 py-1.5 rounded-md border border-slate-700/50">{exp.location}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 relative z-10">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-300/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0 opacity-80 group-hover:bg-cyan-400 transition-colors"></span>
                        <span className="leading-relaxed font-light">{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-slate-700/50 relative z-10 w-full">
                    <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Technologies Engineered With:</p>
                    <div className="flex flex-wrap gap-2">
                       {exp.techStack.map((tech, i) => getTechBadge(tech, i))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
