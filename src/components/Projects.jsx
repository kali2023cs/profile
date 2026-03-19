import React from 'react';
import { motion } from 'framer-motion';
import { Box, Plane, MessageSquare, Building2, Server, ShieldCheck, Code } from 'lucide-react';
import { FaReact, FaLaravel, FaNodeJs } from 'react-icons/fa';
import { SiGo, SiMysql, SiFirebase } from 'react-icons/si';
import projectsDataInit from '../data/projects.json';
import { useData } from '../hooks/useData';

const iconMap = {
  Box,
  Plane,
  MessageSquare,
  Building2,
  Server,
  ShieldCheck
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

const Projects = () => {
  const projectsData = useData('projects', projectsDataInit);
  const projects = projectsData.map(project => ({
    ...project,
    icon: iconMap[project.icon] || Code
  }));

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-bold mb-3">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">Key <span className="text-gradient">Systems</span></h3>
          <div className="w-20 h-1 bg-indigo-500 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <div 
                  className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group relative h-full hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(99,102,241,0.2)] transition-all duration-300 border border-slate-800"
                >
                  {/* Visual Illustration Header */}
                  <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center border-b border-slate-800/60`}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                    
                    {/* Huge decorative abstract icon acting as an illustration */}
                    <IconComponent size={140} className="text-white/10 absolute -right-6 -bottom-6 transform group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-700" />
                    
                    {/* Floating Icon Illustration */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 glass-panel p-5 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] border-white/20 group-hover:border-indigo-400/50 transition-colors duration-500"
                    >
                      <IconComponent size={48} className="text-white drop-shadow-xl group-hover:text-cyan-300 transition-colors" />
                    </motion.div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow relative z-20 bg-slate-900/40">
                    <h3 className="text-xl font-bold text-slate-100 mb-3 tracking-tight">{project.title}</h3>
                    <p className="text-slate-400 mb-8 flex-grow font-light leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => getTechBadge(tech, i))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
