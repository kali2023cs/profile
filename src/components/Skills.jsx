import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaPhp, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiLaravel, SiGo, SiMysql, SiMongodb, SiExpress, SiJquery } from 'react-icons/si';
import skillsDataInit from '../data/skills.json';
import { useData } from '../hooks/useData';

const iconMap = {
  FaReact: <FaReact size={48} />,
  SiLaravel: <SiLaravel size={48} />,
  FaNodeJs: <FaNodeJs size={48} />,
  SiGo: <SiGo size={48} />,
  SiMysql: <SiMysql size={48} />,
  SiMongodb: <SiMongodb size={48} />,
  FaJava: <FaJava size={48} />,
  SiExpress: <SiExpress size={48} />,
  FaPhp: <FaPhp size={48} />,
  FaJavaJs: <FaJava size={48} className="rotate-90 hidden" />,
  FaHtml5: <FaHtml5 size={48} />,
  SiJquery: <SiJquery size={48} />
};

const Skills = () => {
  const skillsData = useData('skills', skillsDataInit);
  const skills = skillsData.map(skill => ({
    ...skill,
    icon: iconMap[skill.icon],
    fallbackIcon: skill.fallbackIcon ? <span className="font-black text-4xl font-serif text-yellow-400 group-hover:text-yellow-300">{skill.fallbackIcon}</span> : null
  }));

  return (
    <section id="skills" className="py-24 relative z-10 opacity-95">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-bold mb-3">Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">Technical <span className="text-gradient">Expertise</span></h3>
          <div className="w-20 h-1 bg-indigo-500 rounded-full"></div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              variants={{ hidden: { opacity: 0, scale: 0.8, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}
              className="h-full"
            >
              <div
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center justify-center gap-5 group cursor-pointer h-full border border-slate-700/50 hover:border-indigo-500/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)] transition-all duration-300"
              >
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
                  className={`text-slate-500 ${skill.color} transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`}
                >
                  {skill.fallbackIcon ? skill.fallbackIcon : skill.icon}
                </motion.div>
                <h3 className="font-bold text-slate-300 tracking-wide text-sm drop-shadow-md">{skill.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
