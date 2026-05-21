"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  RiMapPinLine, 
  RiCalendarCheckLine, 
  RiCarLine, 
  RiArrowLeftLine 
} from "react-icons/ri";
import Loading from "../loading";
import Image from "next/image";
import Link from "next/link";

const MyBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // User session parsing to get email for fetching user-specific bookings
  const session = authClient.useSession?.() || {};
  const userEmail = session?.data?.user?.email;

  useEffect(() => {
    
    if (!userEmail) return;

    const fetchBookings = async () => {
      try {
        const tokenResponse = await authClient.token();
        const token = tokenResponse?.data?.token || tokenResponse?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/booking?email=${userEmail}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  // 1. Loading State
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // 2. Empty State 
  if (bookings.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-slate-50/50">
        <div className="bg-white p-8 rounded-full mb-6 shadow-xl shadow-slate-200/50 border border-slate-100">
          <RiCarLine className="text-6xl text-indigo-300" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-3 text-center tracking-tight">
          No Bookings Yet
        </h2>
        <p className="text-slate-500 text-center max-w-md mb-8 leading-relaxed">
          Your garage is empty! You haven&apos;t booked any cars yet. Browse our premium fleet and find your perfect ride today.
        </p>
        <Link 
          href="/explore-cars" 
          className="bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300"
        >
          Explore Available Cars
        </Link>
      </div>
    );
  }

  // 3. Main UI with Bookings List
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 min-h-screen bg-slate-50/30">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
            My <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-500">Bookings</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl leading-relaxed">
            Manage your active reservations and review your booking history. Make sure to arrive at the pickup location on time.
          </p>
        </div>
        
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
        >
          <RiArrowLeftLine className="text-lg" /> Back to Home
        </Link>
      </div>

      {/* Booking Cards Grid/List */}
      <div className="grid grid-cols-1 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 border border-slate-100 overflow-hidden transition-all duration-300 group"
          >
            {/* Left Side: Image Box */}
            <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
              <Image
                src={booking.image || "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=600&auto=format&fit=crop"}
                alt={booking.carName}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent"></div>
              
              {/* Badges on Image */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-black px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
                {booking.category || "Sedan"}
              </div>
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
                Confirmed
              </div>
            </div>

            {/* Right Side: Content Box */}
            <div className="p-6 md:p-8 flex flex-col grow">
              
              {/* Header: Title & Location */}
              <div className="flex justify-between items-start mb-2 gap-4">
                <h3 className="text-2xl font-black text-slate-800">
                  {booking.carName}
                </h3>
                <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
                  <RiMapPinLine className="text-indigo-500 text-sm" /> 
                  {booking.location || "Dhaka"}
                </span>
              </div>

              {/* Description / Note (Fixed Height to prevent card resizing) */}
              <p className="text-slate-500 text-[15px] mb-5 line-clamp-2 min-h-11 leading-relaxed">
                {booking.specialNote || "You have successfully booked this vehicle. Your ride is ready for your upcoming trip."}
              </p>

              {/* Features/Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-indigo-100/50">
                  {booking.driverNeeded ? "Driver Included" : "Self-Drive"}
                </span>
              </div>

              {/* Footer: Price, Date & Action Buttons */}
              <div className="mt-auto flex flex-col sm:flex-row justify-between items-center gap-5 pt-5 border-t border-slate-100/80">
                
                {/* Price & Date */}
                <div className="flex flex-col w-full sm:w-auto">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    Booking Summary
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-indigo-600">
                      ${booking.totalPrice}
                    </span>
                    <span className="text-[13px] text-slate-500 flex items-center gap-2 font-semibold border-l border-slate-200 pl-4">
                      <RiCalendarCheckLine className="text-lg text-slate-400" />
                      {booking.bookingTime || "No Date Found"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons (UI Only) */}
                <div className="flex gap-3 w-full sm:w-auto">
                  
                  <Link href={`/explore-cars/${booking.carId}`} className="flex-1 sm:flex-none px-6 py-2.5 bg-indigo-700 text-white hover:bg-indigo-600 transition-colors font-bold rounded-xl text-sm shadow-md">
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingPage;