"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaUserPlus } from "react-icons/fa";

const CallToAction = () => {
  return (
    <section className="bg-slate-50 py-16 lg:py-20 relative overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main CTA Card */}
        <div className="relative bg-white rounded-xl overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col lg:flex-row items-stretch">
          
          {/* Abstract Background Glow inside Card */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <div className="absolute -bottom-32 -right-32 w-125 h-125 bg-teal-50 rounded-full blur-[120px] opacity-70"></div>
          </div>

          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-20 relative z-20 text-center lg:text-left flex flex-col justify-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 self-center lg:self-start"
            >
              Start Your Journey Today
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-[1.1] mb-6 tracking-tight"
            >
              Ready to hit <br className="hidden md:block" /> the <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-teal-400">road?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-lg mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0"
            >
              Join thousands of satisfied customers who rent premium cars at the best prices. Your dream ride is just a few clicks away.
            </motion.p>

            {/* Action Buttons  */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto"
            >
              {/* Primary Button */}
              <Link 
                href="/explore-cars" 
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 w-full sm:w-auto rounded-lg bg-linear-to-r from-indigo-600 to-teal-400 text-white font-bold text-sm tracking-wide shadow-md hover:opacity-95 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Book a Ride</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              {/* Secondary Button */}
              <Link
                href="/register" 
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 w-full sm:w-auto rounded-lg border border-slate-200 bg-white text-slate-700 font-bold text-sm tracking-wide transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5"
              >
                <FaUserPlus size={13} className="text-slate-400 group-hover:text-indigo-600 transition-colors duration-300" /> 
                <span>Sign Up</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Premium Car Image */}
          <div className="w-full lg:w-1/2 relative min-h-87.5lg:min-h-full z-10 overflow-hidden group">
            {/* Smooth Mask Layer */}
            <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-white via-white/20 to-transparent z-10 pointer-events-none"></div>
            
            <Image 
              src="https://images.unsplash.com/photo-1627454820516-dc767bcb4d3e?q=80&w=1200&auto=format&fit=crop" 
              alt="Premium Bugatti" 
              fill
              className="object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;