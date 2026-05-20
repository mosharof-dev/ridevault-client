import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaRegIdCard, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaCar, 
  FaGasPump, 
  FaShieldAlt, 
  FaExclamationTriangle,
  FaTools,
  FaHeadset
} from 'react-icons/fa';

// Isolated Data Fetcher Engine
async function getCarDetails(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car/${id}`, {
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Server component fetch error pipeline:", error);
    return null;
  }
}

export default async function CarsDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const car = await getCarDetails(id);

  if (!car) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-white px-4">
        <FaExclamationTriangle className="w-16 h-16 text-rose-500 animate-bounce" />
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Car Details Not Found</h2>
        <p className="text-slate-500 text-center max-w-sm text-sm">
          The listing data link is broken or verified entry asset has been safely archived by admin.
        </p>
      </div>
    );
  }

  return (
    <section className=" bg-white pb-24">
      
      {/* 1. Full-Width Premium Fluid Media Hero Showcase */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        <div className="flex items-center justify-between bg-slate-50/60 backdrop-blur-sm border border-slate-100 p-3 my-3 rounded-2xl sm:rounded-xl gap-4">
        
        {/* Left Action: Back to Landing Frame */}
        <Link
          href="/" 
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all hover:-translate-x-0.5 active:translate-x-0 whitespace-nowrap"
        >
          <svg 
            className="w-4 h-4 text-indigo-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Go Home</span>
        </Link>

        {/* Right Action: Back to Catalog Grid */}
        <Link 
          href="/explore-cars" 
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all hover:translate-x-0.5 active:translate-x-0 whitespace-nowrap"
        >
          <span>Explore Cars</span>
          <svg 
            className="w-4 h-4 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

      </div>
        <div className="relative h-80 sm:h-112.5 lg:h-130 w-full rounded-xl overflow-hidden shadow-xl shadow-slate-100/70 border border-slate-100">
          <Image
            src={car.image} 
            alt={car.carModel} 
            fill
            
            className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-transparent" />
          
          <span className="absolute top-6 left-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full font-bold text-xs tracking-widest uppercase shadow-md">
            {car.category}
          </span>
        </div>
      </section>

      {/* 2. Brand Identity Two-Column Structured Grid System */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: section Information Pipeline (2/3 Grid Area) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Core Vehicle Header Meta Data Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50/70 px-2.5 py-1 rounded-md">
                <FaMapMarkerAlt className="text-sm" /> {car.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-slate-600">
                <FaRegIdCard className="text-sm" /> Seats: {car.seatCapacity}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {car.carModel}
            </h1>
          </div>

          {/* Real-Time Status Technical Specifications Inline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-slate-100/80 bg-slate-50/40 rounded-2xl p-5 text-left flex flex-col justify-between">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Availability</span>
              <span className={`inline-block mt-2 text-xs font-extrabold px-3 py-1 rounded-full w-max ${
                car.availability ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
              }`}>
                {car.availability ? "Active Available" : "Reserved Out"}
              </span>
            </div>
            
            <div className="border border-slate-100/80 bg-slate-50/40 rounded-2xl p-5 text-left">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Metrics Usage</span>
              <span className="block mt-2 text-base font-black text-slate-800">{car.bookingCount} Times Booked</span>
            </div>

            <div className="border border-slate-100/80 bg-slate-50/40 rounded-2xl p-5 text-left">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Engine Power</span>
              <span className="block mt-2 text-sm font-bold text-slate-700">Octane / Eco Drive</span>
            </div>
          </div>

          {/* Semantic Typography Overview Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Vehicle Fleet Overview</h3>
            <p className="text-slate-600 leading-relaxed text-base font-normal">
              {car.description}
            </p>
          </div>

          {/* Dynamic Features Matrix Layout */}
          <div className="pt-10 border-t border-slate-100 space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Included Premium Equipment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {car.features?.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-slate-50/50 border border-slate-100/60 p-3.5 rounded-xl text-slate-700 font-semibold text-sm"
                >
                  <FaCheckCircle className="text-blue-600 text-base shrink-0" />
                  <span>{feature} Premium Ecosystem</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter-Friendly Features Matrix Grid Banner */}
          <div className="bg-slate-900 rounded-[24px] p-8 text-white grid grid-cols-1 sm:grid-cols-3 gap-8 relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="space-y-2 z-10">
              <FaShieldAlt className="text-2xl text-blue-400 mb-2" />
              <h4 className="font-bold text-base tracking-tight">Transparent Valuation</h4>
              <p className="text-slate-400 text-xs leading-normal">Zero hidden processing handling fees or tracking surcharge policies guaranteed.</p>
            </div>
            <div className="space-y-2 z-10">
              <FaGasPump className="text-2xl text-blue-400 mb-2" />
              <h4 className="font-bold text-base tracking-tight">Full-to-Full Fuel</h4>
              <p className="text-slate-400 text-xs leading-normal">Pick up with a full tank and return it full. No extra fuel handling charges service.</p>
            </div>
            <div className="space-y-2 z-10">
              <FaTools className="text-2xl text-blue-400 mb-2" />
              <h4 className="font-bold text-base tracking-tight">Roadside Rescue 24/7</h4>
              <p className="text-slate-400 text-xs leading-normal">Our customer care dispatcher centers are ready on deck anywhere across the country.</p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive High-Tier Sticky Booking Container Widget (1/3 Grid Area) */}
        <aside className="lg:sticky lg:top-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-100/80 space-y-6">
          
          {/* Starting Rate Element */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Starting from</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-black text-slate-900">${car.dailyRentalPrice}</span>
              <span className="text-slate-500 font-medium text-sm">/ day</span>
            </div>
          </div>

          {/* Departure Configuration Component */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <FaCalendarAlt className="text-blue-600" /> Select Departure Date <span className="text-rose-500">*</span>
            </label>
            <input 
              type="date"
              defaultValue="2026-05-20"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all cursor-pointer"
            />
          </div>

          {/* Call-to-Action Submit Handler Trigger Segment */}
          <div>
            <button 
              disabled={!car.availability}
              className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base tracking-wide transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
                car.availability 
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 hover:bg-blue-700 text-white shadow-blue-600/10" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200"
              }`}
            >
              <span>{car.availability ? "Book This Ride Now →" : "Vehicle Currently Reserved"}</span>
            </button>
          </div>

          {/* Direct Trust Features Checkpoints */}
          <div className="pt-5 border-t border-slate-100 space-y-3">
            {[
              { text: "Free cancellation up to 24h pickup", icon: <FaCheckCircle className="text-emerald-500" /> },
              { text: "Real-time GPS tracking active", icon: <FaCar className="text-emerald-500" /> },
              { text: "Fully sanitized & safety checked", icon: <FaShieldAlt className="text-emerald-500" /> },
              { text: "24/7 emergency roadside support", icon: <FaHeadset className="text-emerald-500" /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-slate-500">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>

        </aside>

      </div>
    </section>
  );
}