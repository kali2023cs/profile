import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none h-[500px] flex justify-center items-center group">
      {/* Background ambient glow behind character */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[100px] -z-10 w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-[125%] h-[125%] flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
      >
        <Player
          autoplay
          loop
          src="https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json" 
          style={{ height: '100%', width: '100%' }}
        />
      </motion.div>
      

    </div>
  );
};

export default HeroIllustration;
