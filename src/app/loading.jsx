"use client";

import { motion } from "framer-motion";
import { BiCompass } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-9999 flex min-h-screen w-full flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        
        {/* Outer Rotating Ring - Tailwind animation */}
        <div className="h-24 w-24 animate-spin rounded-full border-[6px] border-slate-100 border-t-indigo-600"></div>

        {/* Inner Pulsing Compass Icon */}
        <motion.div 
          className="absolute text-indigo-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <BiCompass className="h-10 w-10" />
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.p 
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-8 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase"
      >
        Exploring Rides...
      </motion.p>
    </div>
  );
};

export default Loading;