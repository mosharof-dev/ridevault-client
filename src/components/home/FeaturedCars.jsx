"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiMapPinLine,
  RiStarFill,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Loading from "@/app/loading";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/featuredCars`);
        if (res.ok) {
          const data = await res.json();
          setCars(data);
        }
      } catch (error) {
        console.error("Failed to fetch featured cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCars();
  }, [SERVER_URL]);

  const getCategoryColor = (catName) => {
    const name = catName?.toLowerCase() || "";
    if (name === "sedan") return "bg-blue-600";
    if (name === "suv") return "bg-purple-600";
    if (name === "luxury") return "bg-amber-500 text-slate-900";
    if (name === "hatchback") return "bg-pink-500";
    return "bg-indigo-600";
  };

  if (loading) {
    return (
      <>
    <Loading />
      </>
    );
  }

  if (cars.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/*  Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight mb-2 md:mb-3">
              Available <span className=" text-indigo-600">Cars</span>
            </h2>

            <p className="text-slate-500 text-sm sm:text-base lg:text-lg font-medium max-w-2xl">
              Explore our extensive collection of premium vehicles, perfectly
              maintained and ready for your next journey.
            </p>
          </div>
          <Link href="/explore-cars" className="self-start sm:self-auto">
            <button className="group flex items-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all cursor-pointer">
              Explore Full Fleet
              <RiArrowRightSLine className="ml-1 text-lg transform group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* 🛞 Swiper Slider Component */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: "#feat-prev",
              nextEl: "#feat-next",
            }}
            spaceBetween={24}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-6!"
          >
            {cars.map((car) => (
              <SwiperSlide key={car._id} className="h-auto py-2">
                <div className="group flex flex-col h-full border border-slate-100 hover:border-indigo-200 bg-white hover:shadow-2xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden">
                  {/* Car Image Area */}
                  <div className="relative h-56 w-full overflow-hidden shrink-0">
                    <Image
                      src={
                        car.image ||
                        "https://images.unsplash.com/photo-1541443131876-44b03de101b5?q=80&w=600"
                      }
                      alt={car.carModel}
                      fill
                      sizes="(max-w-7xl) 25vw, 100vw"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Category Chip */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`${getCategoryColor(car.category)} text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md px-3 py-1.5 rounded-full`}
                      >
                        {car.category || "Car"}
                      </span>
                    </div>

                    {/* Availability Status Badge */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <span
                        className={`text-white font-bold text-[10px] uppercase tracking-wider shadow-md px-3 py-1.5 rounded-full ${car.availability ? "bg-emerald-500" : "bg-red-500"}`}
                      >
                        {car.availability ? "Available" : "Booked"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content Area */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Model Title & Location Wrapper */}
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight line-clamp-1">
                        {car.carModel}
                      </h3>
                      <div className="flex items-center text-slate-500 text-xs font-semibold whitespace-nowrap bg-slate-100 px-2.5 py-1 rounded-lg">
                        <RiMapPinLine className="mr-1 text-sm text-indigo-500" />
                        {car.location || "Dhaka"}
                      </div>
                    </div>

                    {/* Structured Description */}
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {car.description}
                    </p>

                    {/* Features Badges Element Grid */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {car.features &&
                        car.features.slice(0, 2).map((feat, i) => (
                          <span
                            key={i}
                            className="bg-indigo-50/50 text-indigo-600 border border-indigo-100/50 text-[11px] font-bold px-2.5 py-1 rounded-lg"
                          >
                            {feat}
                          </span>
                        ))}
                      {car.features && car.features.length > 2 && (
                        <span className="bg-slate-50 text-slate-500 border border-slate-200/40 text-[11px] font-bold px-2 py-1 rounded-lg">
                          +{car.features.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Card Price & Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Daily Rate
                        </p>
                        <p className="text-2xl font-black text-indigo-600">
                          ${car.dailyRentalPrice}
                          <span className="text-slate-500 text-sm font-semibold">
                            /day
                          </span>
                        </p>
                      </div>

                      <Link href={`/explore-cars/${car._id}`}>
                        <button className="bg-linear-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-extrabold rounded-xl px-5 py-2.5 shadow-md shadow-indigo-100 active:scale-[0.98] transition-all whitespace-nowrap text-sm cursor-pointer">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Modern Navigation & Controller Architecture */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
            {/* Left Progress Bar */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-slate-800 font-black text-sm min-w-8.75">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(cars.length).padStart(2, "0")}
              </span>
              <div className="h-1 flex-1 sm:w-48 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${((activeIndex + 1) / cars.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Right Side Navigation Arrows (Fixed Classes) */}
            <div className="flex gap-2 self-end sm:self-auto">
              <button
                id="feat-prev"
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50/30 active:scale-95 transition-all cursor-pointer"
              >
                <RiArrowLeftLine className="text-lg" />
              </button>
              <button
                id="feat-next"
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50/30 active:scale-95 transition-all cursor-pointer"
              >
                <RiArrowRightLine className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
