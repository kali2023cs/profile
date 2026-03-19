import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import educationDataInit from '../data/education.json';
import { useData } from '../hooks/useData';

const Education = () => {
  const educationData = useData('education', educationDataInit);

  return (
    <section id="education" className="py-24 relative z-10 opacity-95">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col mx-auto text-center items-center"
        >
          <h2 className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-bold mb-3">Academic Background</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">Education</h3>
          <div className="w-20 h-1 bg-indigo-500 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {educationData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <div 
                className="glass-panel glass-panel-hover rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(99,102,241,0.15)] hover:border-slate-500 transition-all duration-300 h-full border border-slate-700/50"
              >
                <GraduationCap size={150} className="absolute -bottom-10 -right-10 text-white/[0.03] group-hover:text-indigo-500/[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white tracking-tight">{item.degree}</h4>
                    <p className="text-indigo-400 font-medium">{item.institution}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 bg-slate-800/50 w-fit px-3 py-1.5 rounded-md border border-slate-700/50 relative z-10">
                  <Calendar size={14} className="text-indigo-400" />
                  <span className="font-medium tracking-wide">{item.period}</span>
                </div>
                
                <p className="text-slate-300 leading-relaxed font-light relative z-10">{item.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
