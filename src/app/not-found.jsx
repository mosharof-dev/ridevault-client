"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className=" py-20 w-full flex items-center justify-center bg-slate-50 p-6 font-sans">
      
      <div className="max-w-xl w-full text-center">
        {/* Animated Error Code */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[120px] md:text-[160px] my-4 font-black text-indigo-100 select-none leading-none"
        >
          404
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 -mt-5 mb-4">
            Oops! Page not found
          </h1>
          <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all duration-300 shadow-lg shadow-indigo-200"
            >
              <FaHome size={16} /> Back to Home
            </Link>
            
            <Link 
              href="/explore-cars" 
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold transition-all duration-300"
            >
              <FaSearch size={16} /> Explore Cars
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Background Subtle Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
    </div>
  );
}