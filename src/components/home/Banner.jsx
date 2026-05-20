"use client";
import Link from "next/link";
import Image from "next/image"; // IMPORTED next/image
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { FaStar, FaArrowRight, FaCheckCircle } from "react-icons/fa";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Banner = () => {
  const sliderCars = [
    "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop", // BMW style
    "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww", // Sports Car
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Luxury Sedan
  ];

  return (
    <div className="bg-[#FAFAFF] w-full pt-16 pb-24 lg:pt-20 lg:pb-20 overflow-hidden relative font-sans">
      
      {/* Abstract Background Elements for Premium Feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-linear-to-b from-indigo-100/60 to-teal-50/20 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-linear-to-t from-indigo-50/50 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Increased gap between columns for breathing room */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 xl:gap-20 items-center">
          
          {/* Left Side: Content (Dynamic Typography) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            
            {/* Sleek Pill Badge (Offer Type) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm mb-8 hover:bg-indigo-100 transition-colors cursor-pointer">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-xs">
              
                <FaStar size={10} /> 
              </span>
              <span className="text-sm font-bold text-indigo-900 pr-2">Get 15% Off Your First Ride</span>
            </div>

            {/* Massive Heading (Dynamic Scale) */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-extrabold text-[#05062D] leading-[1.05] tracking-tight mb-6">
              Rent Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-teal-500">
                Dream Car.
              </span>
            </h1>
            
            {/* Description (Increased Contrast) */}
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Experience the thrill of driving premium vehicles. Flexible bookings, transparent pricing, and instant confirmations for your next journey.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
              <Link 
                href="/explore-cars" 
                className="group flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-full text-white font-bold text-base bg-linear-to-r from-indigo-600 to-teal-500 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Book a Ride
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/explore-cars" 
                className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-full text-slate-700 font-bold text-base bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-300 hover:shadow-sm"
              >
                Explore Cars
              </Link>
            </div>

            {/* Social Proof / Avatars with next/image */}
            <div className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-200/60 w-full justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {/* next/image implementation for avatars */}
                <Image width={40} height={40} className="rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/150?img=32" alt="User" />
                <Image width={40} height={40} className="rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/150?img=12" alt="User" />
                <Image width={40} height={40} className="rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/150?img=5" alt="User" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">+2k</div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex text-yellow-400 text-sm"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
                <span className="text-sm font-medium text-slate-600">from 2,000+ reviews</span>
              </div>
            </div>

          </div>

          {/* Right Side: Visuals (Takes 7 columns) */}
          <div className="lg:col-span-7 relative w-full mt-10 lg:mt-0 z-10 flex justify-end">
            
            {/* Swiper Slider Wrapper with next/image handling */}
            <div className="relative w-full lg:max-w-162.5 ml-auto rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5 bg-white p-3 z-10">
              <Swiper
                spaceBetween={0}
                effect={"fade"}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Autoplay, EffectFade, Pagination]}
                className="w-full aspect-4/3 md:aspect-16/10 rounded-2xl"
              >
                {sliderCars.map((image, index) => (
                
                  <SwiperSlide key={index} className="w-full h-full relative group">
                    
                    <Image
                      src={image}
                      fill
                      alt={`Car Model ${index + 1}`}
                      className="object-cover transform transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw" // Responsive image sizes
                      priority={index === 0} 
                    />
                    
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Floating Glass Card 1 (Top Left) */}
            <div className="absolute -left-4 lg:-left-12 top-10 z-20 bg-white/70 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-xl flex items-center gap-3 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-center w-10 h-10 bg-teal-100 text-teal-600 rounded-full">
                <FaCheckCircle className="text-xl" />
              </div>
              <div className="pr-2">
                <p className="text-sm font-bold text-slate-800">Fully Insured</p>
                <p className="text-xs font-medium text-slate-500">Zero hidden fees</p>
              </div>
              
            </div>

            {/* Floating Glass Card 2 (Bottom Right) */}
            <div className="absolute -right-4 lg:-right-8 bottom-12 z-20 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl hover:translate-y-1 transition-transform duration-300">
              <p className="text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Starting at</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">$45</span>
                <span className="text-sm font-medium text-slate-400">/day</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Modern Pagination Style */}
      <style jsx global>{`
        .swiper-pagination {
          padding-bottom: 1.5rem;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.6);
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff;
          width: 32px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Banner;