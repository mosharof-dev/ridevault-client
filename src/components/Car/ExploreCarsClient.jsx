"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  HiOutlineSearch, 
  HiOutlineViewGrid, 
  HiOutlineViewList,
  HiOutlineFilter
} from "react-icons/hi";

import ExploreCar from "@/components/Car/ExploreCar";

const ExploreCarsClient = ({ initialCars }) => {
  // Use the server-fetched data as the initial state
  const [cars, setCars] = useState(initialCars || []);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [viewType, setViewType] = useState("grid"); 

  const isFirstRender = useRef(true);

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  // Only fetch cars when search or category filters change after initial render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchCars = async () => {
      setLoading(true);
      try {
        let url = `${SERVER_URL}/car`;
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category && category !== "All") params.append("category", category);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setCars(data);
        }
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCars();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, SERVER_URL]);

  const getSortedCars = () => {
    const sorted = [...cars];
    if (sortBy === "price_asc") {
      return sorted.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    }
    if (sortBy === "price_desc") {
      return sorted.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    }
    return sorted;
  };

  const sortedCars = getSortedCars();
  const categories = ["All", "Sedan", "SUV", "Hatchback", "Luxury"];

  const getCategoryColor = (catName) => {
    const name = catName?.toLowerCase() || "";
    if (name === "sedan") return "bg-blue-600";
    if (name === "suv") return "bg-purple-600";
    if (name === "luxury") return "bg-amber-500 text-slate-900";
    if (name === "hatchback") return "bg-pink-500";
    return "bg-indigo-600"; 
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-sans">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-indigo-600 to-teal-500 py-16 px-4 md:py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Explore Our Premium Fleet
          </h1>
          <p className="text-indigo-100 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Find the perfect ride for your next journey. Filter by category, price, or location, and book instantly.
          </p>
        </div>
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Filters & Controls Bar */}
        <div className="p-4 sm:p-5 md:p-6 mb-8 border border-slate-100 shadow-xl shadow-slate-200/30 rounded-2xl bg-white w-full max-w-full overflow-hidden">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between w-full">
            
            {/* Search Component Block */}
            <div className="w-full lg:max-w-sm relative flex items-center shrink-0">
              <div className="absolute left-4 text-slate-400 pointer-events-none">
                <HiOutlineSearch className="text-xl" />
              </div>
              <input
                type="text"
                placeholder="Search by car model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all focus:bg-white focus:border-indigo-600 focus:outline-none text-slate-700 font-medium text-sm"
              />
            </div>

            {/* Category Grid */}
            <div className="w-full lg:flex-1 lg:max-w-xl">
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 w-full justify-start lg:justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer shrink-0
                      ${category === cat 
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Sorting & Grid Layout Switcher */}
            <div className="w-full lg:w-auto flex items-center justify-between gap-3 pt-3 lg:pt-0 border-t border-slate-100 lg:border-t-0 shrink-0">
              <div className="relative flex-1 lg:flex-initial lg:w-44">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-12 appearance-none rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 focus:bg-white focus:border-indigo-600 outline-none transition-all px-4 text-sm font-medium text-slate-700 cursor-pointer shadow-sm pr-10"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/40 shrink-0">
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewType === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <HiOutlineViewGrid className="text-xl" />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewType === "list" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <HiOutlineViewList className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cars Display Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-semibold animate-pulse">Loading amazing cars...</p>
          </div>
        ) : sortedCars.length === 0 ? (
          <div className="text-center py-20 border border-slate-100 shadow-sm rounded-2xl bg-white">
            <div className="max-w-md mx-auto px-4">
              <div className="text-6xl text-slate-300 mb-4 flex justify-center">
                <HiOutlineFilter />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No Vehicles Found</h3>
              <p className="text-slate-500 text-sm mb-6">
                We couldn&apos;t find any cars matching your search. Try resetting the filters or typing a different query.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSortBy("default");
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6 py-3 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div 
            className={`
              ${viewType === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8" 
                : "flex flex-col gap-6"
              }
            `}
          >
            {sortedCars.map((car) => (
              <ExploreCar key={car._id} car={car} viewType={viewType} getCategoryColor={getCategoryColor} />    
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExploreCarsClient;
