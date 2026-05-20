"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import Loading from "../loading";

export default function MyCarsPage() {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getCars = async () => {
      try {
        const tokenResponse = await authClient.token();
        const actualToken = tokenResponse?.data?.token || tokenResponse?.token;

        const res = await fetch("http://localhost:5000/my-cars", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${actualToken}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setMyCars(data);
        } else {
          console.error("Backend server error status:", res.status);
        }
      } catch (err) {
        console.error("Fetch client fail:", err);
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, []);

  if (loading)
    return (
     <>
     <Loading/>
     </>
    );

 const getCategoryColor = (catName) => {
    const name = catName?.toLowerCase() || "";
    if (name === "sedan") return "bg-blue-600";
    if (name === "suv") return "bg-purple-600";
    if (name === "luxury") return "bg-amber-500 text-slate-900";
    if (name === "hatchback") return "bg-pink-500";
    return "bg-indigo-600"; 
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Added Cars
          <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {myCars.length} {myCars.length === 1 ? "Car" : "Cars"}
          </span>
        </h1>
      </div>

      {/* Conditional Rendering: Empty State vs Horizontal List */}
      {myCars.length === 0 ? (
        <div className="text-center py-12 border rounded-xl bg-gray-50">
          <p className="text-gray-500 text-lg">
            You haven&apos;t added any cars yet!
          </p>
        </div>
      ) : (
        // Flex column layout to list cards vertically one by one
        <div className="flex flex-col gap-6">
          {myCars.map((car) => (
            <div
              key={car._id}
              className="flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white p-2 md:p-0"
            >
              {/* Left Side: Image Layout with badging */}
              <div className="relative w-full md:w-80 h-48 md:h-auto min-h-47.5 bg-gray-100 shrink-0 rounded-xl md:rounded-none overflow-hidden">
                <Image
                  src={
                    car.image ||
                    "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=687"
                  }
                  alt={car.carModel}
                  fill
                  className="w-full h-full object-cover"
                />
                {/* Category Badge (Top Left) */}
                <span
            className={`${getCategoryColor} text-white font-extrabold text-xs shadow-md px-3 py-1.5 rounded-full`}
          >
            {car.category}
          </span>
                {/* Availability Badge (Top Right) */}
                <span
                  className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
                    car.availability === true ||
                    car.availability === "Available"
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {car.availability === true || car.availability === "Available"
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>

              {/* Right Side: Content & Details Section */}
              <div className="p-5 md:p-6 flex flex-col grow justify-between">
                <div>
                  {/* Title & Location Row */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                      {car.carModel}
                    </h3>
                    <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50/70 px-2.5 py-1 rounded-md">
                      <FaMapMarkerAlt className="text-sm" /> {car.location}
                    </span>
                  </div>

                  {/* Text Description - Matches image_f3e7f5 screenshot text flow */}
                  <p className="text-gray-500 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-4 leading-relaxed">
                    {car.description}
                  </p>

                  {/* Dynamic Features/Badges Row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features && Array.isArray(car.features) ? (
                      car.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2.5 py-1 rounded-md"
                        >
                          {feature}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2.5 py-1 rounded-md">
                          GPS
                        </span>
                        <span className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2.5 py-1 rounded-md">
                          Bluetooth
                        </span>
                        <span className="text-xs bg-gray-50 text-gray-600 font-medium px-2.5 py-1 rounded-md">
                          +{car.seatCapacity || 5} seats
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Pricing & Details Navigation Button */}
                <div className="flex items-center justify-between border-t pt-4 mt-2">
                  <div>
                    <span className="text-gray-400 text-xs uppercase font-bold tracking-wider block">
                      Daily Rate
                    </span>
                    <p className="text-2xl font-extrabold text-indigo-700">
                      ${car.dailyRentalPrice}
                      <span className="text-sm font-normal text-gray-500">
                        /day
                      </span>
                    </p>
                  </div>

                  {/* View Details button redirecting to detail route */}
                  <Link href={`/my-added-cars/${car._id}`}>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-sm md:text-base py-2.5 px-6 rounded-xl transition-all shadow-sm hover:shadow duration-200">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
